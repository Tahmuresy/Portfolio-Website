/* apps1.jsx — window CONTENT: My Computer, Robotic_Fabrication terminal,
   RD_Modular_System. Exported to window.Apps.
   (Diagrid now lives in apps5.jsx as a full project folder.) */
const { useState, useEffect, useRef } = React;
const Apps = window.Apps || (window.Apps = {});
const I = window.Icons;

/* ====================================================================
   MY COMPUTER — skills as drives
   ==================================================================== */
const DRIVES = [
  { letter:"C:", name:"Computational_Design (C:)", pct:95, color:"#00AEEF",
    items:["Rhinoceros 3D + Grasshopper — Expert","RhinoCommon SDK — Advanced","Autodesk Revit + Revit API — Advanced","Rhino.Inside.Revit · Dynamo · IFC","Elefront · Pufferfish · ShapeDiver"] },
  { letter:"D:", name:"Programming (D:)", pct:82, color:"#EC008C",
    items:["Python — Advanced","C# — Advanced","JSON · REST APIs","Git version control","VS Code"] },
  { letter:"E:", name:"AI_ML_Optimization (E:)", pct:88, color:"#FFD700",
    items:["TensorFlow · Keras · Scikit-learn — Advanced","Edge-AI Integration","Generative Design","Multi-Objective / Evolutionary — Wallacei — Expert"] },
  { letter:"F:", name:"Robotics_Vision_Fab (F:)", pct:90, color:"#00AEEF",
    items:["Path planning — KUKAprc · Machina · Robots","Hardware — UR20 · ABB · KUKA","NVIDIA Jetson AGX Orin","3D Sensing — Kinect · Orbbec Femto Mega","Multi-axis additive + subtractive"] },
  { letter:"G:", name:"Simulation_Viz (G:)", pct:74, color:"#EC008C",
    items:["Karamba3D — Advanced","Ladybug Tools — Intermediate","V-Ray · Enscape · KeyShot","Adobe Creative Suite"] },
];
const REMOVABLE = [
  { name:"UR20 (H:)", ico:"robot" },
  { name:"Jetson AGX Orin (J:)", ico:"chip" },
];

function DriveBar({ d }) {
  const used = 100 - d.pct;
  return (
    <div className="drive">
      <div className="drive__ico">
        <svg viewBox="0 0 32 32" width="34" height="34">
          <rect x="3" y="9" width="26" height="16" rx="2" fill="#dfe3ea" stroke="#8a93a3" strokeWidth="1"/>
          <rect x="3" y="9" width="26" height="6" rx="2" fill="#eef1f6"/>
          <circle cx="24" cy="20" r="1.4" fill={d.color}/>
          <rect x="6" y="18" width="9" height="2.2" rx="1" fill="#b9c0cb"/>
        </svg>
      </div>
      <div className="drive__meta">
        <div className="drive__name">{d.name}</div>
        <div className="drive__bartrack"><div className="drive__bar" style={{ width:d.pct+"%", background:`linear-gradient(180deg,${d.color},${d.color})`, opacity:.9 }}></div></div>
        <div className="drive__free">{d.pct}% proficiency · {used} units free</div>
      </div>
    </div>
  );
}

Apps.MyComputer = ({ open }) => {
  const [sel, setSel] = useState(null);
  return (
    <div className="exp xp-scroll">
      <div className="exp__side">
        <div className="exp__panel">
          <div className="exp__panelhead">System Tasks <span className="chev">▴</span></div>
          <div className="exp__panelbody">
            <div className="lnk" onClick={()=>open && open("resume")}>{I.Notepad()} View résumé</div>
            <div className="lnk" onClick={()=>open && open("contact")}>{I.Mail()} Contact author</div>
            <div className="lnk" onClick={()=>open && open("patent")}>{I.Pdf()} Add / remove patents</div>
          </div>
        </div>
        <div className="exp__panel">
          <div className="exp__panelhead">Other Places <span className="chev">▴</span></div>
          <div className="exp__panelbody">
            <div className="lnk" onClick={()=>open && open("projects")}>{I.Folder()} My Projects</div>
            <div className="lnk" onClick={()=>open && open("contact")}>{I.Globe()} Network Places</div>
          </div>
        </div>
        <div className="exp__panel">
          <div className="exp__panelhead">Details <span className="chev">▴</span></div>
          <div className="exp__panelbody">
            <div className="info">
              <b>TGHIYASI-WORKSTATION</b>
              Computational Designer<br/>Architectural Engineer<br/>Ph.D. Candidate, TTU<br/>
              <span style={{color:"#666"}}>10+ yrs · Lubbock, TX</span>
            </div>
          </div>
        </div>
      </div>
      <div className="exp__main xp-scroll">
        <div className="exp__grouphdr">Hard Disk Drives — skill volumes</div>
        {DRIVES.map(d => (
          <div key={d.letter} onClick={()=>setSel(sel===d.letter?null:d.letter)} style={{cursor:"pointer"}}>
            <DriveBar d={d}/>
            {sel===d.letter && (
              <ul style={{margin:"0 0 8px 56px", padding:0, listStyle:"none", fontFamily:"var(--tg-mono)", fontSize:"11px", color:"#333"}}>
                {d.items.map((it,i)=><li key={i} style={{padding:"2px 0", borderBottom:"0.5px solid #e2e2e2"}}>{it}</li>)}
              </ul>
            )}
          </div>
        ))}
        <div className="exp__grouphdr" style={{marginTop:14}}>Devices with Removable Storage — hardware</div>
        <div className="exp__grid">
          {REMOVABLE.map(r=>(
            <div className="exp__item" key={r.name}>
              <div className="exp__item__ico">
                <svg viewBox="0 0 32 32" width="32" height="32">
                  <rect x="6" y="6" width="20" height="20" rx="2" fill="#cfd6e0" stroke="#7a8494" strokeWidth="1"/>
                  <rect x="9" y="9" width="14" height="9" fill="#1b2a44"/>
                  <circle cx="16" cy="22" r="2" fill="#00AEEF"/>
                </svg>
              </div>
              <div className="exp__item__t">{r.name}<small>edge device</small></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ====================================================================
   ROBOTIC_FABRICATION.EXE — terminal
   ==================================================================== */
const BOOT_LINES = [
  { t:"Tahmures Ghiyasi OS v2.5  ·  Jointless Reciprocal Lattice runtime", c:"c-key" },
  { t:"(c) Tahmures Ghiyasi — Human-Robot Collaboration Lab, TTU", c:"c-dim" },
  { t:"" },
  { t:"[ ok ] mounting UR20 kinematic controller .......... ONLINE", c:"c-ok" },
  { t:"[ ok ] Jetson AGX Orin vision pipeline ............. ONLINE", c:"c-ok" },
  { t:"[ ok ] Orbbec Femto Mega RGBD calibration .......... 0.4 mm", c:"c-ok" },
  { t:"[warn] operator presence detected in cell .......... HANDOVER", c:"c-warn" },
  { t:"" },
  { t:"workflow: layer-by-layer pick & place (eCAADe 2023)", c:"c-mag" },
  { t:"type `help` for commands.", c:"c-dim" },
];
const TERM_CMDS = {
  help: () => [
    "available commands:",
    "  whoami        operator profile",
    "  workflow      HRC assembly loop",
    "  jrl           jointless reciprocal lattice spec",
    "  vision        machine-vision stack",
    "  seq           show assembly sequence (image)",
    "  projects      list research projects",
    "  clear         clear screen",
  ],
  whoami: () => ["tghiyasi — computational designer, architectural engineer.",
    "role: directs research + technical dev of the patented JRL system."],
  workflow: () => [
    "HUMAN-ROBOT COLLABORATION LOOP",
    "  1. scan      Orbbec RGBD → point cloud of placed bricks",
    "  2. cluster   OpenCV color clustering → identify last course",
    "  3. plan      multi-objective optimization → next pick + pose",
    "  4. place     UR20 sets robot-layer brick (max overlay + align)",
    "  5. handover  human places accent layer → re-scan, repeat",
  ],
  jrl: () => [
    "JOINTLESS RECIPROCAL LATTICE (JRL)",
    "  connector-free timber framework, tetra-octahedral voxelization.",
    "  US patent 63/662,495 (provisional 2024 · full filed 2025).",
    "  each member self-supports via reciprocal nexor geometry.",
  ],
  vision: () => [
    "MACHINE-VISION STACK",
    "  sensor   Kinect v2 / Orbbec Femto Mega (RGBD)",
    "  proc     OpenCV — adaptive thresholding across lighting",
    "  edge     Jetson AGX Orin — real-time inference",
    "  output   brick centroid + course boundary → Grasshopper",
  ],
  projects: () => [
    "  jrl          Jointless Reciprocal Lattice (patented)",
    "  voxel        Voxel-based collaborative assembly (UR20)",
    "  parch        PARchitecture Pavilion — IASS 2024, 2nd place",
    "  diagrid      Diagrid optimization study — ARCC 2025",
    "  → run `seq` to view the assembly sequence.",
  ],
  seq: () => ["[loading plate: human-robot collaboration sequence]", "__IMG__hrc"],
  clear: () => "__CLEAR__",
};

Apps.Terminal = () => {
  const [history, setHistory] = useState([]);
  const [booted, setBooted] = useState(false);
  const [val, setVal] = useState("");
  const scroller = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let i = 0, alive = true;
    const tick = () => {
      if (!alive) return;
      if (i < BOOT_LINES.length) {
        setHistory(h => [...h, { kind:"boot", ...BOOT_LINES[i] }]);
        i++;
        setTimeout(tick, 120 + Math.random()*120);
      } else { setBooted(true); }
    };
    setTimeout(tick, 250);
    return () => { alive = false; };
  }, []);

  useEffect(() => { if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight; });

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const echo = { kind:"cmd", t:raw };
    if (!cmd) { setHistory(h => [...h, echo]); return; }
    const fn = TERM_CMDS[cmd];
    if (!fn) { setHistory(h => [...h, echo, { kind:"out", t:`'${cmd}' is not recognized. type \`help\`.`, c:"c-warn" }]); return; }
    const res = fn();
    if (res === "__CLEAR__") { setHistory([]); return; }
    const lines = res.map(t => t === "__IMG__hrc" ? { kind:"img", src:"assets/img/hrc-sequence.jpg" } : { kind:"out", t });
    setHistory(h => [...h, echo, ...lines]);
  };

  return (
    <div className="term xp-scroll" ref={scroller} onClick={()=>inputRef.current && inputRef.current.focus()}>
      {history.map((l, idx) => {
        if (l.kind === "img") return <img key={idx} className="term__plate" src={l.src} alt="assembly sequence"/>;
        if (l.kind === "cmd") return <div key={idx} className="term__line"><span className="prompt">jrl@orin:<b>~</b>$ </span>{l.t}</div>;
        return <div key={idx} className={"term__line " + (l.c||"")}>{l.t}</div>;
      })}
      {booted && (
        <div className="term__row">
          <span className="prompt">jrl@orin:<b>~</b>$</span>
          <input ref={inputRef} autoFocus className="term__input" value={val}
            onChange={e=>setVal(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter"){ run(val); setVal(""); } }}/>
        </div>
      )}
      {!booted && <span className="term__cursor"></span>}
    </div>
  );
};

/* ====================================================================
   RD_MODULAR_SYSTEM.DLL — rhombic dodecahedron discretization
   ==================================================================== */
function RhombicDiagram() {
  // a flat tiling of rhombi suggesting space-filling rhombic dodecahedra
  const rh = [];
  const w = 26, h = 15;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 8; c++) {
    const x = c*w*2 + (r%2)*w, y = r*h*2;
    rh.push(<polygon key={r+"-"+c}
      points={`${x},${y} ${x+w},${y+h} ${x},${y+2*h} ${x-w},${y+h}`}
      fill={(r+c)%3===0?"#eaf6fb":"#fff"} stroke="#00AEEF" strokeWidth="0.6"/>);
  }
  return (
    <svg viewBox="0 -20 420 230" style={{width:"100%", background:"var(--tg-grey-5)"}}>
      {rh}
      {/* highlighted single cell, exploded nexor */}
      <g transform="translate(300,150)">
        <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" fill="none" stroke="#EC008C" strokeWidth="1.4"/>
        <polygon points="0,-30 26,-15 0,0 -26,-15" fill="#EC008C" opacity=".12"/>
        <line x1="0" y1="0" x2="0" y2="30" stroke="#EC008C" strokeWidth="0.8"/>
      </g>
    </svg>
  );
}

Apps.RDModular = () => (
  <div className="pad pad--cols xp-scroll doc">
    <div>
      <div className="ds-label">Modular System · Discretization</div>
      <hr className="ds-rule"/>
      <h1 className="ds-h1">A connector-free lattice from space-filling cells.</h1>
      <p className="ds-kicker">RD_Modular discretizes free-form volumes into a packing of rhombic
        dodecahedra — the space-filling polyhedron whose faces meet at the angles a reciprocal
        timber nexor wants anyway.</p>
      <div className="plate"><RhombicDiagram/></div>
      <p className="ds-cap">Fig. 1 — Rhombic-dodecahedral tessellation. Highlighted: one cell and its
        reciprocal nexor axis (magenta).</p>
      <h3 className="ds-h3" style={{marginTop:16}}>Why the rhombic dodecahedron</h3>
      <p className="ds-body">It tiles space with no gaps and only twelve identical rhombic faces.
        Each face hosts one timber member; members lean on one another reciprocally, so the
        assembly stands with zero metal connectors. I voxelize the target volume into this cell,
        then solve member lengths and contact order as a graph the robot can build course-by-course.</p>
    </div>
    <aside className="pad__side">
      <div className="slab">Module</div>
      RD_Modular_System.dll
      <div className="slab">Cell</div>
      Rhombic dodecahedron<br/>12 rhombic faces<br/>face angle 70.5° / 109.5°
      <div className="slab">Packing</div>
      Space-filling, FCC-dual
      <div className="slab">Members</div>
      1 per face · timber dowel
      <div className="slab">Connectors</div>
      None — reciprocal nexor
      <div className="slab">Build order</div>
      Graph-sequenced, robot-first
      <div className="slab">Status</div>
      Patent 63/662,495
    </aside>
  </div>
);


