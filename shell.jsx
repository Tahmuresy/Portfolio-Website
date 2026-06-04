/* shell.jsx — window manager, desktop icons, taskbar, start menu.
   Exposes window.Shell = { Desktop }. */
const { useState: uS, useRef: uR, useEffect: uE, useCallback: uCB } = React;

/* ---- window registry ---------------------------------------------- */
const REG = {
  mycomputer: { title: "My Computer", icon: "MyComputer", comp: "MyComputer", w: 560, h: 430 },
  robotic: { title: "Robotic_Fabrication.exe", icon: "Exe", comp: "Terminal", w: 560, h: 410 },
  rdmodular: { title: "RD_Modular_System.dll", icon: "Dll", comp: "RDModular", w: 740, h: 540 },
  housing: { title: "Ayman_Housing_Project.jpg — Windows Picture and Fax Viewer", icon: "Jpg", comp: "PictureViewer", w: 580, h: 470 },
  patent: { title: "Jointless_Timber_Patent.pdf — Adobe Reader", icon: "Pdf", comp: "Acrobat", w: 760, h: 560 },
  recycle: { title: "Recycle Bin", icon: "Recycle", comp: "Recycle", w: 480, h: 360 },
  diagrid: { title: "Diagrid_Optimization", icon: "Diagrid", comp: "Diagrid", w: 720, h: 540 },
  pickplace: { title: "Layer-by-Layer Pick and Place Collaboration Between Human and Robot Using Optimization", icon: "Folder", comp: "PickPlace", w: 820, h: 600 },
  golfpavilion: { title: "Innovative Reclamation and Design: A Lightweight Structure from Reclaimed Golf Clubs", icon: "Folder", comp: "GolfPavilion", w: 880, h: 630 },
  resume: { title: "My Résumé — WordPad", icon: "Notepad", comp: "Resume", w: 620, h: 540 },
  contact: { title: "Contact", icon: "Mail", comp: "Contact", w: 460, h: 400 },
  projects: { title: "My Projects", icon: "Folder", comp: "Projects", w: 580, h: 410 },
  newfolder: { title: "New Folder", icon: "Folder", comp: "NewFolder", w: 540, h: 380 }
};
const ICON = (name) => window.Icons[name] ? window.Icons[name]() : null;

/* ---- desktop items: scattered (non-grid), draggable, persisted ----
   kind:"win" opens a window (REG[key]); kind:"app" throws a decoy splash/error;
   kind:"link" opens an external URL in a new tab. */
const DESK_ITEMS = [
{ key: "mycomputer", kind: "win", label: "My Computer", img: "assets/img/ic-mycomputer.png", x: 44, y: 30 },
{ key: "robotic", kind: "win", label: "Robotic_Fabrication.exe", x: 150, y: 152, preview: "assets/img/brick-laying.jpg", caption: "Robotic Fabrication", year: "2023" },
{ key: "patent", kind: "win", label: "Jointless_Timber_Patent.pdf", x: 46, y: 290, preview: "assets/img/dome.jpg", caption: "Jointless Timber Patent", year: "2024" },
{ key: "diagrid", kind: "win", label: "Diagrid_Optimization", x: 292, y: 34, preview: "assets/img/clustering.jpg", caption: "Diagrid Optimization", year: "2025" },
{ key: "pickplace", kind: "win", label: "Robotic Pick & Place", x: 290, y: 182, preview: "assets/img/pp-hero.jpg", caption: "Robotic Pick & Place", year: "2023" },
{ key: "golfpavilion", kind: "win", label: "Golf Club Pavilion", x: 292, y: 332, preview: "assets/img/golf/golf-hero.jpg", caption: "Golf Club Pavilion", year: "2024" },
{ key: "rhino", kind: "app", label: "Rhinoceros 5", img: "assets/img/app-rhino.png", x: 542, y: 58 },
{ key: "illustrator", kind: "app", label: "Adobe Illustrator CS6", img: "assets/img/app-illustrator.png", x: 668, y: 40 },
{ key: "photoshop", kind: "app", label: "Photoshop CS4", img: "assets/img/app-photoshop.png", x: 792, y: 30 },
{ key: "lumion", kind: "app", label: "Lumion 6", img: "assets/img/app-lumion.png", x: 918, y: 40 },
{ key: "sketchup", kind: "app", label: "SketchUp Pro 2015", img: "assets/img/app-sketchup.png", x: 542, y: 196 },
{ key: "max3ds", kind: "app", label: "3ds Max 2014", img: "assets/img/app-3dsmax.png", x: 668, y: 196 },
{ key: "keyshot", kind: "app", label: "KeyShot 6", img: "assets/img/app-keyshot.jpg", x: 918, y: 196 },
{ key: "newfolder", kind: "win", label: "New Folder", x: 1012, y: 96 },
{ key: "autocad", kind: "app", label: "AutoCAD 2012", img: "assets/img/app-autocad.png", x: 1150, y: 250 },
{ key: "revit", kind: "app", label: "Revit 2017", img: "assets/img/app-revit.png", x: 1146, y: 402 },
// games — nostalgic decoy launchers
{ key: "dota2", kind: "app", label: "Dota 2", img: "assets/img/ic-dota2.png", brand: true, x: 690, y: 600 },
{ key: "steam", kind: "app", label: "Steam", img: "assets/img/ic-steam-new.webp", brand: true, x: 772, y: 600 },
{ key: "cs16", kind: "app", label: "Counter-Strike 1.6", img: "assets/img/ic-cs-new.png", brand: true, x: 854, y: 600 },
// social links
{ key: "spotify", kind: "link", label: "Spotify", img: "assets/img/ic-spotify.jpg", brand: true, url: "https://open.spotify.com/user/31ggydruftgxouqt7d2nobfpxohq?si=50cd9e9caad84aaf", x: 250, y: 600 },
{ key: "instagram", kind: "link", label: "Instagram", img: "assets/img/ic-instagram.jpg", brand: true, url: "https://www.instagram.com/tahmuresy/", x: 332, y: 600 },
{ key: "youtube", kind: "link", label: "YouTube", img: "assets/img/ic-youtube.svg", brand: true, url: "https://www.youtube.com/@tahmuresgh5377", x: 414, y: 600 },
{ key: "facebook", kind: "link", label: "Facebook", img: "assets/img/ic-facebook.png", brand: true, url: "https://www.facebook.com/tahmures.gh", x: 496, y: 600 },
{ key: "linkedin", kind: "link", label: "LinkedIn", img: "assets/img/ic-linkedin.svg", brand: true, url: "https://www.linkedin.com/", x: 578, y: 600 },
{ key: "recycle", kind: "win", label: "Recycle Bin", img: "assets/img/ic-recycle.png", x: -1, y: -1 }];


let Z = 10;

function useWindows() {
  const [wins, setWins] = uS([]);
  const open = uCB((id) => {
    setWins((prev) => {
      const ex = prev.find((w) => w.id === id);
      if (ex) return prev.map((w) => w.id === id ? { ...w, min: false, z: ++Z } : w);
      const r = REG[id];if (!r) return prev;
      const n = prev.length;
      const x = Math.min(120 + n * 26, window.innerWidth - r.w - 30);
      const y = Math.min(40 + n * 24, Math.max(20, window.innerHeight - r.h - 60));
      return [...prev, { id, x: Math.max(8, x), y: Math.max(6, y), w: r.w, h: r.h, z: ++Z, min: false, max: false }];
    });
  }, []);
  const close = uCB((id) => setWins((p) => p.filter((w) => w.id !== id)), []);
  const focus = uCB((id) => setWins((p) => p.map((w) => w.id === id ? { ...w, z: ++Z } : w)), []);
  const setMin = uCB((id, v) => setWins((p) => p.map((w) => w.id === id ? { ...w, min: v, z: v ? w.z : ++Z } : w)), []);
  const toggleMax = uCB((id) => setWins((p) => p.map((w) => {
    if (w.id !== id) return w;
    if (w.max) return { ...w, max: false, ...(w.prev || {}), z: ++Z };
    return { ...w, max: true, prev: { x: w.x, y: w.y, w: w.w, h: w.h }, z: ++Z };
  })), []);
  const move = uCB((id, x, y) => setWins((p) => p.map((w) => w.id === id ? { ...w, x, y } : w)), []);
  const size = uCB((id, wd, ht) => setWins((p) => p.map((w) => w.id === id ? { ...w, w: wd, h: ht } : w)), []);
  const topZ = wins.reduce((m, w) => Math.max(m, w.z), 0);
  return { wins, open, close, focus, setMin, toggleMax, move, size, topZ };
}

/* ---- Window component --------------------------------------------- */
function Win({ w, api, accent, radius }) {
  const r = REG[w.id];
  const ref = uR(null);
  const drag = uR(null);
  const Comp = window.Apps[r.comp];
  const active = w.z === api.topZ && !w.min;

  // Drag mutates the DOM directly during the gesture and commits to React
  // state only on release — so we don't reconcile every window each frame.
  const onTitleDown = (e) => {
    if (w.max) return;
    if (e.target.closest(".tbtn")) return;
    api.focus(w.id);
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - rect.left, dy = e.clientY - rect.top;
    el.classList.add("is-dragging");
    let lastX = w.x, lastY = w.y, raf = 0, px = 0, py = 0;
    const apply = () => { raf = 0; el.style.left = lastX + "px"; el.style.top = lastY + "px"; };
    const mv = (ev) => {
      lastX = Math.min(Math.max(-r.w + 90, ev.clientX - dx), window.innerWidth - 60);
      lastY = Math.min(Math.max(0, ev.clientY - dy), window.innerHeight - 60);
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const up = () => {
      if (raf) cancelAnimationFrame(raf);
      el.classList.remove("is-dragging");
      api.move(w.id, lastX, lastY);
      window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
  };
  const onResizeDown = (e) => {
    e.stopPropagation(); api.focus(w.id);
    const el = ref.current;
    const sx = e.clientX, sy = e.clientY, sw = w.w, sh = w.h;
    let lw = w.w, lh = w.h, raf = 0;
    const apply = () => { raf = 0; el.style.width = lw + "px"; el.style.height = lh + "px"; };
    const mv = (ev) => {
      lw = Math.max(r.w * 0.55, sw + ev.clientX - sx);
      lh = Math.max(160, sh + ev.clientY - sy);
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const up = () => {
      if (raf) cancelAnimationFrame(raf);
      api.size(w.id, lw, lh);
      window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
  };

  const style = w.max ?
  { left: 0, top: 0, width: "100%", height: "calc(100% - 30px)", zIndex: w.z, display: w.min ? "none" : "flex" } :
  { left: w.x, top: w.y, width: w.w, height: w.h, zIndex: w.z, display: w.min ? "none" : "flex" };

  return (
    <div ref={ref} className={"win" + (active ? "" : " is-inactive") + (w.max ? " is-max" : "")} style={style}
    onPointerDown={() => api.focus(w.id)}>
      <div className="win__titlebar" onPointerDown={onTitleDown} onDoubleClick={() => api.toggleMax(w.id)}>
        <span className="win__icon">{ICON(r.icon)}</span>
        <span className="win__title">{r.title}</span>
        <div className="win__btns">
          <div className="tbtn" title="Minimize" onClick={() => api.setMin(w.id, true)}>
            <svg viewBox="0 0 10 10"><rect x="1" y="7" width="8" height="2" fill="#fff" /></svg>
          </div>
          <div className="tbtn" title="Maximize" onClick={() => api.toggleMax(w.id)}>
            <svg viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" fill="none" stroke="#fff" strokeWidth="1.6" /><rect x="1" y="1" width="8" height="2.4" fill="#fff" /></svg>
          </div>
          <div className="tbtn tbtn--close" title="Close" onClick={() => api.close(w.id)}>
            <svg viewBox="0 0 10 10"><path d="M1 1l8 8M9 1l-8 8" stroke="#fff" strokeWidth="1.8" /></svg>
          </div>
        </div>
      </div>
      <div className="win__body">
        {Comp ? <Comp open={api.open} /> : <div style={{ padding: 20 }}>missing: {r.comp}</div>}
      </div>
      {!w.max && <div className="win__resize" onPointerDown={onResizeDown}></div>}
    </div>);

}

/* ---- Desktop icon (draggable, free-scatter) ----------------------- */
function DIcon({ icon, label, pos, selected, onSelect, onOpen, onMove, onHover }) {
  const moved = uR(false);
  const ref = uR(null);
  const down = (e) => {
    e.stopPropagation();
    onSelect();
    if (onHover) onHover(null);
    const el = ref.current;
    const sx = e.clientX,sy = e.clientY,ox = pos.x,oy = pos.y;
    moved.current = false;
    let lx = ox, ly = oy, raf = 0;
    const apply = () => { raf = 0; el.style.left = lx + "px"; el.style.top = ly + "px"; };
    const mv = (ev) => {
      const dx = ev.clientX - sx,dy = ev.clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved.current = true;
      if (moved.current) {
        lx = Math.max(0, Math.min(ox + dx, window.innerWidth - 70));
        ly = Math.max(0, Math.min(oy + dy, window.innerHeight - 60));
        if (!raf) raf = requestAnimationFrame(apply);
      }
    };
    const up = () => {
      if (raf) cancelAnimationFrame(raf);
      if (moved.current) onMove(lx, ly);
      window.removeEventListener("pointermove", mv);window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", mv);window.addEventListener("pointerup", up);
  };
  return (
    <div ref={ref} className={"dicon" + (selected ? " is-selected" : "")}
    style={{ left: pos.x, top: pos.y }}
    onPointerDown={down}
    onMouseEnter={() => { if (onHover && !moved.current) onHover(true); }}
    onMouseLeave={() => { if (onHover) onHover(false); }}
    onDoubleClick={() => {if (!moved.current) onOpen();}}>
      <div className="dicon__img">{icon}</div>
      <div className="dicon__label">{label}</div>
    </div>);

}

/* ---- Start menu --------------------------------------------------- */
function StartMenu({ onPick, onClose, onLogoff, avatar }) {
  uE(() => {
    const h = () => onClose();
    window.addEventListener("pointerdown", h);
    return () => window.removeEventListener("pointerdown", h);
  }, []);
  const II = window.Icons;
  const left = [
  ["mycomputer", "My Computer", "browse skills + hardware", II.MyComputer()],
  ["robotic", "Robotic Fabrication", "HRC assembly terminal", II.Exe()],
  ["patent", "Jointless Timber Patent", "US 63/662,495", II.Pdf()],
  ["rdmodular", "RD Modular System", "rhombic-dodec lattice", II.Dll()]];

  const right = [
  ["resume", "My Résumé", II.Notepad()],
  ["projects", "All Projects", II.Folder()],
  ["housing", "My Pictures", II.Jpg()],
  ["contact", "Contact", II.Mail()],
  ["recycle", "Recycle Bin", II.Recycle && II.Recycle()]];

  return (
    <div className="startmenu" onPointerDown={(e) => e.stopPropagation()}>
      <div className="startmenu__header">
        <div className="startmenu__avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
        <div className="startmenu__user">Tahmures Ghiyasi</div>
      </div>
      <div className="startmenu__body">
        <div className="startmenu__col startmenu__col--left">
          <div className="startmenu__pinned">
            {left.slice(0, 2).map((it) =>
            <div className="sm-item" key={it[0]} onClick={() => onPick(it[0])}>
                <span className="sm-item__ico">{it[3]}</span><div><b>{it[1]}</b><small>{it[2]}</small></div>
              </div>
            )}
          </div>
          {left.slice(2).map((it) =>
          <div className="sm-item" key={it[0]} onClick={() => onPick(it[0])}>
              <span className="sm-item__ico">{it[3]}</span><div><b>{it[1]}</b><small>{it[2]}</small></div>
            </div>
          )}
          <div className="sm-sep"></div>
          <div className="sm-item" onClick={() => onPick("diagrid")}>
            <span className="sm-item__ico">{II.Diagrid()}</span><div><b>Diagrid Optimization</b><small>ARCC 2025</small></div>
          </div>
          <div className="sm-item" onClick={() => onPick("golfpavilion")}>
            <span className="sm-item__ico">{II.Folder()}</span><div><b>Golf Club Pavilion</b><small>2nd Place · IASS 2024</small></div>
          </div>
        </div>
        <div className="startmenu__col startmenu__col--right">
          {right.map((it) =>
          <div className="sm-item" key={it[0]} onClick={() => onPick(it[0])}>
              <span className="sm-item__ico">{it[2]}</span><b>{it[1]}</b>
            </div>
          )}
          <div className="sm-sep"></div>
          <div className="sm-item" onClick={() => onPick("contact")}>
            <span className="sm-item__ico">{II.Help()}</span><b>Help and Support</b>
          </div>
          <div className="sm-item" onClick={() => onPick("projects")}>
            <span className="sm-item__ico">{II.Search()}</span><b>Search</b>
          </div>
        </div>
      </div>
      <div className="startmenu__footer">
        <div className="sm-foot" onClick={onLogoff}><span className="sm-foot__ico">{II.Logoff()}</span>Log Off</div>
        <div className="sm-foot" onClick={onLogoff}><span className="sm-foot__ico">{II.Power()}</span>Turn Off</div>
      </div>
    </div>);

}

/* ---- Clock -------------------------------------------------------- */
function Clock() {
  const [t, setT] = uS(new Date());
  uE(() => {const id = setInterval(() => setT(new Date()), 10000);return () => clearInterval(id);}, []);
  const hh = t.getHours() % 12 || 12,mm = String(t.getMinutes()).padStart(2, "0");
  const ap = t.getHours() < 12 ? "AM" : "PM";
  return <div className="tray__clock" title={t.toDateString()}>{hh}:{mm} {ap}</div>;
}

/* ---- Hover preview: a framed project plate that physics-tracks the cursor.
   Borrowed from interaction-led portfolios, tuned restrained for AEC. ---- */
function HoverPreview({ data }) {
  const ref = uR(null);
  const st = uR({ x: 0, y: 0, tx: 0, ty: 0, init: false });
  uE(() => {
    const onMove = (e) => {
      const s = st.current;
      s.tx = e.clientX; s.ty = e.clientY;
      if (!s.init) { s.x = s.tx; s.y = s.ty; s.init = true; }
    };
    window.addEventListener("pointermove", onMove);
    let raf = 0;
    const loop = () => {
      const s = st.current, el = ref.current;
      s.x += (s.tx - s.x) * 0.18;
      s.y += (s.ty - s.y) * 0.18;
      if (el) {
        const tilt = Math.max(-5, Math.min(5, (s.tx - s.x) * 0.45));
        const W = 300, H = 250;
        const offX = (s.x + 28 + W > window.innerWidth) ? -(W + 28) : 28;
        const offY = (s.y + 20 + H > window.innerHeight) ? -(H + 20) : 20;
        el.style.transform =
          `translate3d(${s.x}px, ${s.y}px, 0) translate(${offX}px, ${offY}px) rotate(${tilt}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className={"hoverprev" + (data ? " is-on" : "")} aria-hidden="true">
      {data &&
      <React.Fragment>
        <div className="hoverprev__plate"><img src={data.preview} alt="" /></div>
        <div className="hoverprev__cap">
          <span className="hoverprev__name">{data.caption}</span>
          <span className="hoverprev__year">{data.year}</span>
        </div>
      </React.Fragment>}
    </div>);

}

/* ---- Desktop (root of the OS) ------------------------------------- */
function Desktop({ tweaks, onLogoff, avatar, wallpaper }) {
  const api = useWindows();
  const [sel, setSel] = uS(null);
  const [preview, setPreview] = uS(null);
  const [startOpen, setStartOpen] = uS(false);
  const [launches, setLaunches] = uS([]);
  const lkey = uR(0);
  const II = window.Icons;

  // scattered icon positions, persisted to localStorage
  const [positions, setPositions] = uS(() => {
    const base = {};
    DESK_ITEMS.forEach((it) => {
      base[it.key] = it.key === "recycle" ?
      { x: window.innerWidth - 104, y: window.innerHeight - 150 } :
      { x: it.x, y: it.y };
    });
    try {
      const saved = JSON.parse(localStorage.getItem("jrl_icons") || "{}");
      Object.keys(saved).forEach((k) => {if (base[k]) base[k] = saved[k];});
    } catch (e) {}
    return base;
  });
  const moveIcon = uCB((key, x, y) => setPositions((p) => {
    const np = { ...p, [key]: { x, y } };
    try {localStorage.setItem("jrl_icons", JSON.stringify(np));} catch (e) {}
    return np;
  }), []);

  const launchApp = uCB((appId) => {
    const n = lkey.current++;
    const cx = Math.max(40, window.innerWidth / 2 - 200 + n % 4 * 22);
    const cy = Math.max(60, window.innerHeight / 2 - 150 + n % 4 * 20);
    setLaunches((p) => [...p, { key: n, appId, x: cx, y: cy, z: ++Z }]);
  }, []);
  const closeLaunch = uCB((k) => setLaunches((p) => p.filter((l) => l.key !== k)), []);
  const focusLaunch = uCB((k) => setLaunches((p) => p.map((l) => l.key === k ? { ...l, z: ++Z } : l)), []);
  const openItem = uCB((it) => {setPreview(null);if (it.kind === "link") {window.open(it.url, "_blank", "noopener");} else if (it.kind === "app") launchApp(it.key);else api.open(it.key);}, [api.open, launchApp]);

  // expose opener so boot/login deep-links could use it
  uE(() => {window.__openWin = api.open;window.__launchApp = launchApp;}, [api.open, launchApp]);

  return (
    <div className="desktop" onPointerDown={() => {setSel(null);setPreview(null);}}>
      <div className="desktop__wall" style={{ background: tweaks.wallStyle === 'solid' ?
        'radial-gradient(120% 90% at 50% 8%, #4f74cf 0%, #34529f 60%, #24397a 100%)' : undefined, backgroundSize: "cover", backgroundPosition: "center center", opacity: "0.1" }}></div>
      {tweaks.wallStyle === 'bliss' && wallpaper &&
      <div className="desktop__bliss" style={{ backgroundImage: `url(${wallpaper})` }}></div>}
      {tweaks.wallStyle === 'photo' && wallpaper &&
      <div className="desktop__portrait" style={{ backgroundImage: `url(${wallpaper})` }}></div>}
      {tweaks.wallStyle === 'memphis' &&
      <div className="desktop__memphis" style={{ backgroundImage: "url('assets/img/brand-memphis.png')" }}></div>}
      <div className="desktop__vignette"></div>

      {/* scattered, draggable desktop icons */}
      {DESK_ITEMS.map((it) =>
      <DIcon key={it.key}
      icon={it.img ? <img src={it.img} alt="" className={"nodrag" + (it.brand ? " brand" : "")} /> : ICON(REG[it.key].icon)}
      label={it.label} pos={positions[it.key]} selected={sel === it.key}
      onSelect={() => setSel(it.key)} onOpen={() => openItem(it)}
      onHover={it.preview ? (on) => setPreview(on ? it : null) : null}
      onMove={(x, y) => moveIcon(it.key, x, y)} />
      )}

      <HoverPreview data={preview} />

      {/* windows */}
      {api.wins.map((w) => <Win key={w.id} w={w} api={api} accent={tweaks.accent} radius={tweaks.radius} />)}

      {/* decoy error dialogs */}
      {launches.map((l) =>
      <window.Dialogs.Launcher key={l.key} appId={l.appId} x={l.x} y={l.y} z={l.z}
      onClose={() => closeLaunch(l.key)} onFocus={() => focusLaunch(l.key)} />
      )}

      {/* start menu */}
      {startOpen && <StartMenu avatar={avatar}
      onPick={(id) => {setStartOpen(false);api.open(id);}}
      onClose={() => setStartOpen(false)}
      onLogoff={() => {setStartOpen(false);onLogoff();}} />}

      {/* taskbar */}
      <div className="taskbar" onPointerDown={(e) => e.stopPropagation()}>
        <button className={"startbtn" + (startOpen ? " is-open" : "")}
        onPointerDown={(e) => {e.stopPropagation();setStartOpen((o) => !o);}}>start</button>
        <div className="taskbar__quick">
          <span className="qbtn" title="My Computer" onClick={() => api.open("mycomputer")}>{II.MyComputer()}</span>
          <span className="qbtn" title="Résumé" onClick={() => api.open("resume")}>{II.Notepad()}</span>
          <span className="qbtn" title="Contact" onClick={() => api.open("contact")}>{II.Mail()}</span>
        </div>
        <div className="taskbar__tasks">
          {api.wins.map((w) => {
            const r = REG[w.id];
            const active = w.z === api.topZ && !w.min;
            return (
              <div key={w.id} className={"taskbtn" + (active ? " is-active" : "") + (w.min ? " is-min" : "")}
              onClick={() => {if (active) api.setMin(w.id, true);else api.setMin(w.id, false);}}>
                {ICON(r.icon)}<span>{r.title.split(" — ")[0]}</span>
              </div>);

          })}
        </div>
        <div className="tray">
          <span className="tray__ico" title="Network — LinkedIn">{II.Globe()}</span>
          <span className="tray__ico" title="Volume (muted)">{II.Volume()}</span>
          <span className="tray__ico" title="Security">{II.Shield()}</span>
          <Clock />
        </div>
      </div>
    </div>);

}

window.Shell = { Desktop };