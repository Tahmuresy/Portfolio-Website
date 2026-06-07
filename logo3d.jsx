/* logo3d.jsx — the painted TG logo on the wallpaper "comes alive".

   On desktop load the wallpaper WITH the painted logo is shown. After a few
   seconds shell.jsx fades the WITHOUT-logo wallpaper in (erasing the painted
   mark) and fades this transparent WebGL canvas in at the SAME instant — so the
   painted logo appears to simply turn into a live, draggable 3D model sitting in
   the exact same spot. From then on the logo stays live forever; the desktop
   (icons, taskbar, windows) stays fully usable because the canvas is
   pointer-events:none until the cursor is actually over a logo piece.

   Exposes  window.Logo3D = { Playground, CALIBRATE }.
   Props: src, active (true once the swap has fired), onReady().

   No bundler: Three.js r128 UMD is loaded in index.html (window.THREE). All the
   imperative WebGL lives in ONE useEffect + useRef + requestAnimationFrame and
   tears itself down fully on unmount. */

const { useState: ulS, useRef: ulR, useEffect: ulE, useCallback: ulCB } = React;

/* ════════════════════════════════════════════════════════════════════════
   CALIBRATION — flip to true to line the 3D model up over the painted logo.
   When true: the WITH-logo wallpaper stays visible (painted logo showing) AND
   the 3D model is drawn over it at 50% opacity, render loop always on, so you
   can nudge the constants below until they register pixel-for-pixel. Then set
   it back to false.  (shell.jsx reads this to suppress the auto-swap.)
   ════════════════════════════════════════════════════════════════════════ */
const CALIBRATE = false;

/* ── TUNABLES ─────────────────────────────────────────────────────────────
   The camera is LOCKED (no orbit / no zoom). Nudge these so the live model sits
   exactly over the painted logo in with-logo.png at the swap moment.
   Positions are world units; the model is auto-centred at the origin and
   normalised so its WIDTH (X) = MODEL.fitWidth before MODEL.scale is applied. */
const L3D = {
  // --- camera (locked) ---
  CAM_POS:    [-1.6, 1.7, 17.5],   // where the eye sits
  CAM_TARGET: [ 0.0, 0.2,  0.0],   // what it looks at
  FOV:        26,                  // perspective field of view (deg)

  // --- model placement ---
  MODEL_FIT_W: 10,                 // model is normalised so its width = this
  MODEL_SCALE: 0.75,               // then multiplied by this
  MODEL_POS:  [0, 0.72, 0],        // world offset after centring
  MODEL_ROT:  [0, 0, 0],           // extra rotation (deg) X,Y,Z if up-axis is off

  // --- piece welding (used only when the model is ONE node of many meshes;
  //     a properly authored model with separate nodes uses its nodes directly).
  //     Primitives that share vertices (same continuous surface) weld into one
  //     draggable piece; raise to merge more, lower to split more. ---
  WELD_TOL:   0.0006,              // weld tolerance as a fraction of model diagonal

  // --- interaction feel ---
  LIFT:       1.06,                // scale-up of a piece while grabbed
  LIFT_Z:     0.35,                // small toward-camera lift while grabbed (units)
  HOVER_EMIS: 0.10,                // emissive lift on hover
  GRAB_EMIS:  0.20,                // emissive lift while held
};

/* Piet Mondrian palette — red, blue, yellow, white, black. Assigned at RANDOM
   per piece. ONLY used to colour pieces when the model carries no
   materials/textures of its own (this lightweight model has none). A model that
   ships baked texture maps keeps them untouched. */
const L3D_PALETTE = [
  0xFFFFFF,  // white
  0xFFE300,  // yellow
  0xFF0000,  // red
  0x0000FF,  // blue
  0x000000,  // black
];

function Playground({ src = "assets/models/logo3.glb", active = false, onReady }) {
  const stageRef = ulR(null);
  const resetRef = ulR(null);    // imperative reset, wired inside the effect
  const loopRef = ulR(null);     // { start, stop } wired inside the effect
  const [status, setStatus] = ulS("loading");  // "loading" | "ready" | "fallback"

  /* ── the whole Three.js world: built + destroyed once per mount ── */
  ulE(() => {
    const THREE = window.THREE;
    const host = stageRef.current;
    if (!THREE || !host) { setStatus("fallback"); return; }

    const reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const W = () => host.clientWidth || window.innerWidth;
    const H = () => host.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(L3D.FOV, W() / H(), 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W(), H());
    renderer.setClearColor(0x000000, 0);          // transparent — desktop shows through
    renderer.outputEncoding = THREE.sRGBEncoding; // textures & colours read true
    const canvas = renderer.domElement;
    canvas.style.pointerEvents = "none";          // clicks fall through by default
    host.appendChild(canvas);

    /* neutral, even lighting so any printed/baked patterns read true and the
       solid colours don't blow out. No ground shadow (it would paint the wall). */
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d8d8, 0.92));
    const key  = new THREE.DirectionalLight(0xffffff, 0.62); key.position.set(4, 9, 8);   scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.34); fill.position.set(-6, 3, 7);  scene.add(fill);
    const rim  = new THREE.DirectionalLight(0xffffff, 0.20); rim.position.set(0, 4, -8);   scene.add(rim);

    /* ── state ── */
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const camDir = new THREE.Vector3();
    const dragPlane = new THREE.Plane();
    const v = new THREE.Vector3();
    let root = null;          // the loaded model, centred at origin
    let pieces = [];          // pickable piece Groups (one per visual element)
    let pickMeshes = [];      // flat list of meshes for raycasting
    let hovered = null;
    let dragging = null;
    let running = false;      // render loop / hit-testing only after swap
    const grabOff = new THREE.Vector3();
    let alive = true;

    /* ── locked camera (recomputed only on resize for aspect) ── */
    const placeCamera = () => {
      camera.aspect = W() / H();
      camera.fov = L3D.FOV;
      camera.position.set(L3D.CAM_POS[0], L3D.CAM_POS[1], L3D.CAM_POS[2]);
      camera.lookAt(L3D.CAM_TARGET[0], L3D.CAM_TARGET[1], L3D.CAM_TARGET[2]);
      camera.updateProjectionMatrix();
      camera.getWorldDirection(camDir);
    };

    /* ── picking ── */
    const toNdc = (e) => {
      const r = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    const pickPiece = () => {
      if (!pickMeshes.length) return null;
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(pickMeshes, false);
      if (!hits.length) return null;
      let o = hits[0].object;
      while (o && o.userData.piece === undefined) o = o.parent;
      return o ? o.userData.piece : null;
    };
    const setEmissive = (p, amt) => {
      p.traverse((o) => {
        if (o.isMesh && o.userData.emiss) {
          const ms = Array.isArray(o.material) ? o.material : [o.material];
          ms.forEach((m, i) => { if (m.emissive) m.emissive.copy(o.userData.emiss[i]).addScalar(amt); });
        }
      });
    };
    const centroidWorld = (p) => {
      v.copy(p.userData.base).add(p.userData.c);   // centroid in root-local
      return root.localToWorld(v.clone());
    };
    const setHover = (p) => {
      if (p === hovered) return;
      if (hovered && hovered !== dragging) hovered.userData.eTgt = 0;
      hovered = p;
      if (hovered && hovered !== dragging) hovered.userData.eTgt = L3D.HOVER_EMIS;
      canvas.style.cursor = hovered ? "grab" : "default";
    };

    /* ── drag: a plane parallel to the camera at the piece's depth, so the
       piece tracks under the cursor like a desktop icon ── */
    const startGrab = (p) => {
      const c = centroidWorld(p);
      dragPlane.setFromNormalAndCoplanarPoint(camDir, c);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.ray.intersectPlane(dragPlane, new THREE.Vector3());
      grabOff.copy(hit ? c.clone().sub(hit) : new THREE.Vector3());
      p.userData.sTgt = reduce ? 1 : L3D.LIFT;
      p.userData.zTgt = reduce ? 0 : L3D.LIFT_Z;
      p.userData.eTgt = L3D.GRAB_EMIS;
    };
    const doDrag = () => {
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.ray.intersectPlane(dragPlane, new THREE.Vector3());
      if (!hit) return;
      const cLocal = root.worldToLocal(hit.add(grabOff));   // desired centroid → root-local
      dragging.userData.base.x = cLocal.x - dragging.userData.c.x;
      dragging.userData.base.y = cLocal.y - dragging.userData.c.y;
      dragging.userData.base.z = cLocal.z - dragging.userData.c.z;
    };

    /* ── pointer wiring: window move always fires even when canvas is pe:none,
       so we can flip the canvas to pe:auto only while the cursor is over a piece
       (clicks otherwise pass straight through to icons / taskbar / windows) ── */
    const onMove = (e) => {
      if (!running) return;
      toNdc(e);
      if (dragging) { doDrag(); return; }
      const p = pickPiece();
      setHover(p);
      canvas.style.pointerEvents = p ? "auto" : "none";
    };
    const onCanvasDown = (e) => {
      if (!running) return;
      toNdc(e);
      const p = pickPiece();
      if (!p) return;
      e.stopPropagation();
      dragging = p;
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
      canvas.style.pointerEvents = "auto";
      canvas.style.cursor = "grabbing";
      startGrab(p);
    };
    const onUp = (e) => {
      if (!dragging) return;
      const p = dragging;
      p.userData.sTgt = 1;
      p.userData.zTgt = 0;                                  // soft drop
      p.userData.eTgt = (hovered === p) ? L3D.HOVER_EMIS : 0;
      try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
      dragging = null;
      canvas.style.pointerEvents = hovered ? "auto" : "none";
      canvas.style.cursor = hovered ? "grab" : "default";
    };
    canvas.addEventListener("pointerdown", onCanvasDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    /* ── collect leaf meshes ── */
    const collectMeshes = (o) => {
      const out = [];
      o.traverse((n) => { if (n.isMesh && n.geometry) out.push(n); });
      return out;
    };

    /* ── build the pickable pieces ──
       Rule (matches the brief): clicking one shape moves ONLY that shape, and
       nothing is merged by colour. Preference order:
       1. If the model groups meshes under several distinct parent nodes (a
          properly authored model — each letter/arrow its own node), use each
          parent node as a piece, so multi-mesh elements stay together.
       2. Otherwise (this model: ONE node holding many primitives) weld meshes
          into pieces by spatial proximity — letters that sit apart become
          separate pieces; primitives that touch stay together. */
    const buildPieces = (meshes) => {
      // group by parent
      const byParent = new Map();
      meshes.forEach((m) => {
        const k = m.parent ? m.parent.uuid : "_";
        if (!byParent.has(k)) byParent.set(k, []);
        byParent.get(k).push(m);
      });
      let groups;
      if (byParent.size > 1) {
        groups = [...byParent.values()];                  // authored nodes → pieces
        console.log(`[logo3d] node-based pieces: ${groups.length}`);
      } else {
        groups = weldBySharedVertices(meshes);            // single node → weld connected surfaces
        console.log(`[logo3d] connectivity pieces: ${groups.length} (from ${meshes.length} meshes)`);
      }
      return groups;
    };

    /* Weld primitives that belong to the SAME continuous surface: they share
       exact vertices along their seams. Distinct letters/shapes that merely
       interpenetrate in space do NOT share vertices, so they stay separate —
       this is what gives one pickable piece per visual element instead of one
       blob (bounding-box overlap) or colour clusters. */
    const weldBySharedVertices = (meshes) => {
      const n = meshes.length;
      // quantise world-space vertex positions; meshes sharing any key are linked
      const whole = new THREE.Box3();
      meshes.forEach((m) => whole.expandByObject(m));
      const diag = whole.getSize(new THREE.Vector3()).length() || 1;
      const q = (diag * L3D.WELD_TOL);                    // weld tolerance
      const inv = 1 / q;
      const key = (x, y, z) =>
        Math.round(x * inv) + "," + Math.round(y * inv) + "," + Math.round(z * inv);

      const parent = Array.from({ length: n }, (_, i) => i);
      const find = (a) => { while (parent[a] !== a) { parent[a] = parent[parent[a]]; a = parent[a]; } return a; };
      const union = (a, b) => { const ra = find(a), rb = find(b); if (ra !== rb) parent[ra] = rb; };

      const seen = new Map();   // vertex key → first mesh index that owns it
      const vec = new THREE.Vector3();
      for (let i = 0; i < n; i++) {
        const m = meshes[i];
        m.updateMatrixWorld(true);
        const pos = m.geometry.attributes.position;
        if (!pos) continue;
        for (let vi = 0; vi < pos.count; vi++) {
          vec.fromBufferAttribute(pos, vi).applyMatrix4(m.matrixWorld);
          const kk = key(vec.x, vec.y, vec.z);
          const owner = seen.get(kk);
          if (owner === undefined) seen.set(kk, i);
          else union(owner, i);
        }
      }
      const map = new Map();
      for (let i = 0; i < n; i++) {
        const r = find(i);
        if (!map.has(r)) map.set(r, []);
        map.get(r).push(meshes[i]);
      }
      return [...map.values()];
    };

    /* ── frame the model, weld pieces, remember rest pose ── */
    const frame = () => {
      // extra rotation if the up-axis needs nudging
      root.rotation.set(
        THREE.MathUtils.degToRad(L3D.MODEL_ROT[0]),
        THREE.MathUtils.degToRad(L3D.MODEL_ROT[1]),
        THREE.MathUtils.degToRad(L3D.MODEL_ROT[2])
      );
      root.updateMatrixWorld(true);

      // 1. normalise so the model is MODEL_FIT_W wide, then apply MODEL_SCALE
      let box = new THREE.Box3().setFromObject(root);
      const size = box.getSize(new THREE.Vector3());
      const s = (L3D.MODEL_FIT_W / (size.x || 1)) * L3D.MODEL_SCALE;
      root.scale.multiplyScalar(s);
      root.updateMatrixWorld(true);

      // 2. centre at origin, then apply MODEL_POS
      box = new THREE.Box3().setFromObject(root);
      const ctr = box.getCenter(new THREE.Vector3());
      root.position.sub(ctr);
      root.position.add(new THREE.Vector3(L3D.MODEL_POS[0], L3D.MODEL_POS[1], L3D.MODEL_POS[2]));
      root.updateMatrixWorld(true);

      // 3. weld meshes into pieces, reparent each piece into its own Group under root
      const meshes = collectMeshes(root);
      const groups = buildPieces(meshes);
      pieces = [];
      pickMeshes = [];
      groups.forEach((meshList) => {
        const g = new THREE.Group();
        root.add(g);
        g.updateMatrixWorld(true);
        meshList.forEach((m) => { g.attach(m); pickMeshes.push(m); });   // attach keeps world transform
        pieces.push(g);
      });

      // 4. per-piece bookkeeping: centroid offset (for scale-about-centre + drag depth)
      pieces.forEach((p) => {
        p.updateMatrixWorld(true);
        const pb = new THREE.Box3().setFromObject(p);
        const pc = pb.getCenter(new THREE.Vector3());
        root.worldToLocal(pc);                            // centroid in root-local
        const u = p.userData;
        u.piece = p;
        u.home = p.position.clone();
        u.base = p.position.clone();
        u.c = pc.sub(p.position);                         // origin → centroid (root-local)
        u.sCur = 1; u.sTgt = 1; u.zCur = 0; u.zTgt = 0; u.eCur = 0; u.eTgt = 0;
        p.traverse((o) => { o.userData.piece = p; });
      });

      placeCamera();
    };

    /* ── materials: preserve baked texture maps; clone so highlighting one
       piece never touches another; colour solid pieces from the palette only
       when the model carries no maps of its own ── */
    const prepMaterials = () => {
      // does ANY mesh carry a texture map?  (textured model → preserve)
      let textured = false;
      root.traverse((o) => {
        if (o.isMesh && o.material) {
          const ms = Array.isArray(o.material) ? o.material : [o.material];
          ms.forEach((m) => { if (m && (m.map || m.emissiveMap)) textured = true; });
        }
      });

      let pieceIx = 0;
      pieces.forEach((p) => {
        // random Mondrian colour per piece
        const col = L3D_PALETTE[(Math.random() * L3D_PALETTE.length) | 0];
        pieceIx++;
        p.traverse((o) => {
          if (!o.isMesh || !o.material) return;
          const ms = Array.isArray(o.material) ? o.material : [o.material];
          const cloned = ms.map((m) => {
            let nm;
            if (textured) {
              nm = m.clone();                              // keep maps & params
              // make sure colour maps decode in sRGB so patterns aren't washed out
              ["map", "emissiveMap"].forEach((k) => { if (nm[k]) nm[k].encoding = THREE.sRGBEncoding; });
            } else {
              nm = new THREE.MeshStandardMaterial({
                color: col, roughness: 0.46, metalness: 0.0,
              });
            }
            if (!nm.emissive) nm.emissive = new THREE.Color(0x000000);
            return nm;
          });
          o.material = Array.isArray(o.material) ? cloned : cloned[0];
          o.userData.emiss = cloned.map((m) => m.emissive.clone());   // rest emissive per material
        });
      });
      return textured;
    };

    /* ── reset (HUD chip) — animate every piece home; nothing auto-reverts ── */
    resetRef.current = () => {
      dragging = null;
      pieces.forEach((p) => {
        p.userData.base.copy(p.userData.home);
        p.userData.sTgt = 1;
        p.userData.zTgt = 0;
        p.userData.eTgt = 0;
      });
      setHover(null);
      canvas.style.pointerEvents = "none";
      canvas.style.cursor = "default";
    };

    /* ── load ── */
    new THREE.GLTFLoader().load(
      src,
      (gltf) => {
        if (!alive) return;
        root = gltf.scene;
        // log the raw scene graph so the granularity is visible
        try {
          let meshCount = 0, nodeCount = 0;
          gltf.scene.traverse((o) => { nodeCount++; if (o.isMesh) meshCount++; });
          console.log(`[logo3d] loaded "${src}" — ${nodeCount} nodes, ${meshCount} meshes`);
        } catch (e) {}
        scene.add(root);
        frame();
        const textured = prepMaterials();
        console.log(`[logo3d] textured model: ${textured} (false → palette colours applied)`);
        setStatus("ready");
        onReady && onReady();
        // calibration draws immediately, regardless of swap state
        if (CALIBRATE) { host.classList.add("is-calib"); loopRef.current && loopRef.current.start(); }
      },
      undefined,
      (err) => { if (alive) { console.warn("[logo3d] load failed", err); buildFallback(); } }
    );

    /* ── fallback blocks if the model can't load at all ── */
    function buildFallback() {
      root = new THREE.Group();
      L3D_PALETTE.slice(0, 6).forEach((col, i) => {
        const w = 0.9 + (i % 3) * 0.5, ht = 1.1 + (i % 2) * 0.7, d = 0.6;
        const m = new THREE.Mesh(
          new THREE.BoxGeometry(w, ht, d),
          new THREE.MeshStandardMaterial({ color: col, roughness: 0.5, metalness: 0.04 })
        );
        m.position.set((i - 2.5) * 1.6, 0, 0);
        root.add(m);
      });
      scene.add(root);
      frame();
      prepMaterials();
      setStatus("fallback");
      onReady && onReady();
      if (CALIBRATE) { host.classList.add("is-calib"); loopRef.current && loopRef.current.start(); }
    }

    /* ── resize ── */
    const onResize = () => { renderer.setSize(W(), H()); placeCamera(); };
    const ro = new ResizeObserver(onResize);
    ro.observe(host);

    /* ── render loop — only runs while live (post-swap) or calibrating;
       paused when the tab is hidden to save battery ── */
    let raf = 0;
    const k = reduce ? 1 : 0.22;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      pieces.forEach((p) => {
        const u = p.userData;
        u.sCur += (u.sTgt - u.sCur) * k;
        u.zCur += (u.zTgt - u.zCur) * k;
        u.eCur += (u.eTgt - u.eCur) * k;
        p.scale.setScalar(u.sCur);
        // scale about centroid + a small toward-camera lift while grabbed
        p.position.copy(u.base).addScaledVector(u.c, 1 - u.sCur);
        p.position.addScaledVector(camDir, -u.zCur);
        setEmissive(p, u.eCur);
      });
      renderer.render(scene, camera);
    };
    const startLoop = () => { if (!raf) { running = true; tick(); } };
    const stopLoop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } running = false; };
    loopRef.current = { start: startLoop, stop: stopLoop };

    const onVis = () => {
      if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
      else if (running && !raf) tick();
    };
    document.addEventListener("visibilitychange", onVis);

    // draw one static frame so the canvas isn't blank during the fade-in
    placeCamera();
    renderer.render(scene, camera);

    /* ── full teardown (no WebGL leak across mount cycles) ── */
    return () => {
      alive = false;
      stopLoop();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onCanvasDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
            for (const key2 in m) { if (m[key2] && m[key2].isTexture) m[key2].dispose(); }
            m.dispose();
          });
        }
      });
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      resetRef.current = null;
      loopRef.current = null;
    };
  }, [src]);

  /* start / stop the loop + fade as the swap fires (CALIBRATE handles its own) */
  ulE(() => {
    if (CALIBRATE) return;
    const host = stageRef.current;
    if (active) {
      if (host) host.classList.add("is-live");
      loopRef.current && loopRef.current.start();
    } else {
      if (host) host.classList.remove("is-live");
      loopRef.current && loopRef.current.stop();
    }
  }, [active, status]);

  const onReset = ulCB(() => { resetRef.current && resetRef.current(); }, []);
  const chipVisible = CALIBRATE || (active && status !== "loading");

  return (
    <div className={"logo3d" + (CALIBRATE ? " logo3d--calib" : "")} aria-hidden="true">
      <div className="logo3d__gl" ref={stageRef}></div>

      <div className={"logo3d__chip" + (chipVisible ? " is-shown" : "")}>
        <span className="logo3d__hint">drag the pieces</span>
        <span className="logo3d__dot"></span>
        <button className="logo3d__reset" onClick={onReset}>Reset</button>
        {status === "fallback" && <span className="logo3d__hint logo3d__hint--dim"> · placeholder</span>}
        {CALIBRATE && <span className="logo3d__hint logo3d__hint--dim"> · CALIBRATING</span>}
      </div>
    </div>
  );
}

window.Logo3D = { Playground, CALIBRATE };
