/* apps2.jsx — window CONTENT: Picture & Fax Viewer, Acrobat (patent),
   Recycle Bin, Résumé, Contact, Projects folder. Exported to window.Apps. */
const { useState: useState2 } = React;
window.Apps = window.Apps || {};
const A2 = window.Apps;
const I2 = window.Icons;

/* ====================================================================
   WINDOWS PICTURE & FAX VIEWER — Ayman_Housing_Project.jpg
   ==================================================================== */
const HOUSING_IMGS = [
  { src:"assets/img/wall-spline.jpg", cap:"wall_base-spline_opening.jpg — base layer with integrated opening" },
  { src:"assets/img/dome.jpg", cap:"dome_scenario-02.jpg — hemispherical variant, intentional deviation" },
  { src:"assets/img/brick-laying.jpg", cap:"course_overlay.jpg — optimized brick-laying, max overlay + alignment" },
];
function PfvBtn({ children, onClick, title }) {
  return <div className="pfv__btn" title={title} onClick={onClick}>{children}</div>;
}
A2.PictureViewer = () => {
  const [idx, setIdx] = useState2(0);
  const [zoom, setZoom] = useState2(1);
  const [rot, setRot] = useState2(0);
  const go = (d) => { setIdx((idx + d + HOUSING_IMGS.length) % HOUSING_IMGS.length); setZoom(1); setRot(0); };
  const img = HOUSING_IMGS[idx];
  return (
    <div className="pfv">
      <div className="pfv__stage">
        <img src={img.src} alt={img.cap} style={{ transform:`scale(${zoom}) rotate(${rot}deg)` }}/>
      </div>
      <div className="pfv__cap">{img.cap} &nbsp;·&nbsp; {idx+1} / {HOUSING_IMGS.length}</div>
      <div className="pfv__bar">
        <PfvBtn title="Previous" onClick={()=>go(-1)}><svg viewBox="0 0 16 16"><path d="M11 2L5 8l6 6" fill="none" stroke="currentColor" strokeWidth="2"/></svg></PfvBtn>
        <PfvBtn title="Next" onClick={()=>go(1)}><svg viewBox="0 0 16 16"><path d="M5 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2"/></svg></PfvBtn>
        <div className="pfv__sep"></div>
        <PfvBtn title="Best fit" onClick={()=>{setZoom(1);setRot(0);}}><svg viewBox="0 0 16 16"><rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg></PfvBtn>
        <PfvBtn title="Actual size" onClick={()=>setZoom(1.6)}><svg viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M6 8h4M8 6v4" stroke="currentColor" strokeWidth="1.4"/></svg></PfvBtn>
        <div className="pfv__sep"></div>
        <PfvBtn title="Zoom in" onClick={()=>setZoom(z=>Math.min(3,z+0.25))}><svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M5 7h4M7 5v4M11 11l3 3" stroke="currentColor" strokeWidth="1.6"/></svg></PfvBtn>
        <PfvBtn title="Zoom out" onClick={()=>setZoom(z=>Math.max(0.5,z-0.25))}><svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M5 7h4M11 11l3 3" stroke="currentColor" strokeWidth="1.6"/></svg></PfvBtn>
        <div className="pfv__sep"></div>
        <PfvBtn title="Rotate" onClick={()=>setRot(r=>r+90)}><svg viewBox="0 0 16 16"><path d="M12 5A5 5 0 1 0 13 9" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M12 2v4h-4" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg></PfvBtn>
      </div>
    </div>
  );
};

/* ====================================================================
   ACROBAT — Jointless_Timber_Patent.pdf
   ==================================================================== */
function PatentP1() {
  return (
    <div className="doc">
      <div className="ds-label">United States Patent Application · Provisional</div>
      <hr className="ds-rule"/>
      <h1 className="ds-h1" style={{fontSize:"26px"}}>System and Method for Designing and Fabricating Three-Dimensional Reciprocal Lattice Structures</h1>
      <div className="ds-meta" style={{margin:"18px 0"}}>
        <div className="row"><dt>APPL. NO.</dt><dd>US 63/662,495</dd></div>
        <div className="row"><dt>STATUS</dt><dd>Provisional 2024 · Full patent filed 2025</dd></div>
        <div className="row"><dt>INVENTOR</dt><dd>Tahmures Ghiyasi (co-inventor)</dd></div>
        <div className="row"><dt>SUPPORT</dt><dd>TTU Office of Research Commercialization</dd></div>
      </div>
      <h3 className="ds-h3">Abstract</h3>
      <p className="ds-body">A connector-free structural system in which timber members are arranged
        into a three-dimensional reciprocal lattice. Each member is supported by, and in turn
        supports, its neighbours through reciprocal nexor geometry, eliminating metal fasteners and
        bespoke joints. A computational method voxelizes a target volume into space-filling cells,
        solves member geometry and a feasible assembly order, and emits robot-executable paths for
        human–robot co-assembly.</p>
      <p className="ds-cap" style={{marginTop:28}}>1 — provisional cover · figures follow</p>
    </div>
  );
}
function PatentP2() {
  return (
    <div className="doc">
      <div className="ds-label">Claims · Independent</div>
      <hr className="ds-rule"/>
      <h2 className="ds-h2">What is claimed</h2>
      <p className="ds-body"><b>1.</b> A structural assembly comprising a plurality of elongate timber
        members arranged in a three-dimensional reciprocal lattice defined by a space-filling
        polyhedral tessellation, wherein each member bears on at least two adjacent members without
        a discrete connector.</p>
      <p className="ds-body"><b>2.</b> The assembly of claim 1, wherein the tessellation comprises
        tetrahedral–octahedral or rhombic-dodecahedral cells.</p>
      <p className="ds-body"><b>3.</b> A method comprising: voxelizing a target volume into said cells;
        deriving member lengths and contact poses; computing a collision-free assembly order; and
        executing the order via a robot in collaboration with a human operator.</p>
      <div className="plate" style={{marginTop:16}}><img src="assets/img/end-effector.jpg" alt="end effector"/></div>
      <p className="ds-cap">FIG. 3 — end-effector: tool gripper + Kinect v2 RGBD camera as one integrated tool.</p>
    </div>
  );
}
function PatentP3() {
  return (
    <div className="doc">
      <div className="ds-label">Reference Publication · eCAADe 2023</div>
      <hr className="ds-rule"/>
      <h2 className="ds-h2">Layer-by-Layer Pick & Place Collaboration Between Human and Robot Using Optimization</h2>
      <p className="ds-cap" style={{marginBottom:14}}>Ghiyasi, T., Zargar, H., Baghi, A. (2023). Proceedings of eCAADe 2023: Digital Design Reconsidered.</p>
      <div className="plate"><img src="assets/img/cyber-physical.jpg" alt="cyber-physical workflow"/></div>
      <p className="ds-cap">FIG. 5 — cyber-physical workflow of the implemented methodology.</p>
      <p className="ds-body" style={{marginTop:14}}>The robot and human alternate courses: the robot places
        structurally-critical members where optimization maximizes overlay and alignment; the human
        places accent members the vision system then re-registers. Optimization runs per course, so
        the assembly adapts to the as-built state rather than a fixed plan.</p>
    </div>
  );
}
const PATENT_PAGES = [PatentP1, PatentP2, PatentP3];
A2.Acrobat = () => {
  const [pg, setPg] = useState2(0);
  return (
    <div className="pdf">
      <div className="pdf__bar">
        <span className="pdf__logo">{I2.Pdf()} Adobe Reader</span>
        <span style={{color:"#888"}}>|</span>
        <span style={{color:"#444"}}>Jointless_Timber_Patent.pdf</span>
        <span className="pdf__pg">
          <span className="xp-btn" style={{minWidth:0,padding:"1px 7px"}} onClick={()=>setPg(p=>Math.max(0,p-1))}>◀</span>
          <input className="xp-input" value={pg+1} readOnly/> / {PATENT_PAGES.length}
          <span className="xp-btn" style={{minWidth:0,padding:"1px 7px"}} onClick={()=>setPg(p=>Math.min(PATENT_PAGES.length-1,p+1))}>▶</span>
        </span>
      </div>
      <div className="pdf__body">
        <div className="pdf__thumbs xp-scroll">
          {PATENT_PAGES.map((P,i)=>(
            <div key={i} className={"pdf__thumb"+(i===pg?" is-sel":"")} onClick={()=>setPg(i)}>
              <div className="mini"><div style={{padding:"6px"}}><P/></div></div>
              <div className="pdf__thumb__n">{i+1}</div>
            </div>
          ))}
        </div>
        <div className="pdf__scroll xp-scroll">
          {PATENT_PAGES.map((P,i)=>(
            <div className="pdf__page" key={i} id={"pp"+i} style={{display:i===pg?"block":"none"}}><P/></div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ====================================================================
   RECYCLE BIN — with a wink
   ==================================================================== */
const TRASH = [
  { n:"Comic_Sans.ttf", meta:"Font · 0 KB · never installed" },
  { n:"imposter_syndrome.tmp", meta:"Temp file · deleted 2023" },
  { n:"the_competition.zip", meta:"Archive · 2nd place was theirs" },
  { n:"metal_connectors.dwg", meta:"Drawing · made obsolete by JRL" },
  { n:"boring_portfolio_template.psd", meta:"Photoshop · returned to sender" },
  { n:"i_use_inter_for_everything.css", meta:"Stylesheet · corrupted" },
];
A2.Recycle = () => (
  <div className="recyc">
    <div className="recyc__hdr">These items were deliberately discarded. Right-click would let you
      restore them — but honestly, leave them here.</div>
    <div className="recyc__list">
      {TRASH.map((t,i)=>(
        <div className="recyc__item" key={i}>
          <svg viewBox="0 0 32 32"><path d="M9 3h14M7 3h18M9 7h14l-1 22H10z" fill="none" stroke="#888" strokeWidth="1.4"/><path d="M14 11v14M18 11v14" stroke="#bbb" strokeWidth="1.2"/></svg>
          <span className="n">{t.n}</span>
          <span className="meta">{t.meta}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ====================================================================
   RÉSUMÉ — WordPad style
   ==================================================================== */
const CV_EXPERIENCE = [
  ["AI Developer Intern — Structural Engineering", "Walter P Moore · New York, NY", "May–Aug 2025", [
    "Interfaced an OpenWebUI backend with Revit using Python and pyRevit, establishing an embedded AI querying environment to retrieve and apply structural calculations (column buckling, footing prediction).",
    "Translated real-time engineering data into native BIM geometry through automated generative workflows, streamlining pan-ceiling design and sheet documentation for an active project.",
    "Collaborated with the Emulation Lab to automate structural design workflows, linking design reasoning to computational optimization.",
  ]],
  ["Graduate Research Assistant", "Texas Tech University · Lubbock, TX", "Aug 2023–Present", [
    "Direct the research and technical development of the patented Jointless Reciprocal Lattice (JRL) system, establishing novel human–robot collaboration (HRC) protocols for adaptive timber fabrication.",
    "Architected a voxel-based robotic assembly framework, synchronizing UR20 kinematic control with a Jetson AGX Orin pipeline for real-time machine vision and adaptive AI integration.",
    "Serve as reviewer and research assistant in ARCH studios (3601, 3602, 4341, 5334).",
  ]],
  ["Graduate Research Assistant", "Project for Operative Spatial Technologies · El Paso, TX", "May–Aug 2024", [
    "Optimized and digitally fabricated a hemispherical structure using algorithmic modeling.",
  ]],
  ["Graduate Teaching Assistant", "Pennsylvania State University · State College, PA", "Aug 2022–Aug 2023", [
    "Supported AE 421/422 (Architectural Structural Systems I & II); mentored students in parametric and computational analysis.",
  ]],
  ["Computational Designer", "KARA Design Group · Tehran, Iran", "2019–2021", [
    "Developed parametric façades and environmentally responsive building systems using generative algorithms.",
  ]],
  ["Instructor & Research Assistant", "Int'l Academy of Innovative Art & Architecture · Iran", "2018–2019", [
    "Taught computational design and mentored students in parametric systems and deployable structures.",
  ]],
  ["Architectural Designer", "Amoud Architectural Design Studio · Iran", "2013–2017", [
    "Contributed to concept development, technical documentation, and detailing for residential and commercial projects.",
  ]],
];
const CV_SKILLS = [
  ["Computational Design & BIM", "Rhinoceros 3D & Grasshopper (Expert) · RhinoCommon SDK (Advanced) · Autodesk Revit & Revit API (Advanced) · Dynamo · Rhino.Inside.Revit · IFC Workflows · ShapeDiver · Elefront · Pufferfish"],
  ["Programming & Development", "Python (Advanced) · C# (Advanced) · JSON · REST APIs · Git version control (Working Knowledge) · VS Code"],
  ["AI, Machine Learning & Optimization", "TensorFlow, Keras & Scikit-learn (Advanced) · Edge-AI Integration · Generative Design · Multi-Objective & Evolutionary Optimization / Wallacei (Expert)"],
  ["Robotics, Vision & Fabrication", "Robotic Path Planning (Advanced) — KUKAprc, Machina, Robots for Grasshopper · Hardware — UR20, ABB, KUKA · NVIDIA Jetson AGX Orin (Intermediate) · 3D Sensing & Vision (Advanced) — Kinect, Orbbec Femto Mega · Multi-Axis Additive & Subtractive Fabrication (Advanced)"],
  ["Simulation & Visualization", "Structural Analysis / Karamba3D (Advanced) · Environmental Simulation / Ladybug Tools (Intermediate) · V-Ray, Enscape & KeyShot (Proficient) · Adobe Creative Suite"],
];
const CV_EDUCATION = [
  ["2023–Present", "Ph.D. Candidate, Land-Use Planning, Management & Design", "Texas Tech University, Lubbock, TX — GPA 3.93/4.0"],
  ["2017–2021", "M.Sc., Architectural Technology — Computational Design", "Tabriz Islamic Art University, Iran — GPA 3.76/4.0"],
  ["2012–2016", "B.Sc., Architectural Engineering", "Bu-Ali Sina University, Iran — GPA 3.3/4.0"],
];
const CV_PROJECTS = [
  ["Jointless Reciprocal Lattice (JRL) System", "Patented connector-free timber framework for robotic fabrication and adaptive human–robot co-assembly workflows."],
  ["PARchitecture Pavilion", "Award-winning pavilion from reclaimed golf clubs — 2nd Place, IASS 2024, ETH Zurich."],
  ["Diagrid Optimization Study", "Geometric optimization of diagrid systems under lateral loading — ARCC 2025."],
  ["Voxel-Based Collaborative Assembly", "Multi-agent robotic fabrication platform integrating UR20 and NVIDIA AGX Orin for distributed HRC."],
  ["Active Bending Curved-Line Folding System", "Co-advised Master's thesis research paper — ARCC 2025."],
  ["MycoKnit Grid Shell", "Biodegradable composite grid shell exploring material-driven structural form — Penn State, 2023."],
  ["Robotic Mark Making", "Robotic path-planning research for spatial drawing and fabrication — Lawrence Tech, 2022."],
  ["Remote Robotic Assemblies", "Remote co-fabrication and machine-vision calibration — ACADIA / Princeton / ETH Zurich workshop, 2021."],
  ["Big Data Urbanism & Robotic Fabrication", "Data-driven urban simulation and modular robotic assembly — IAAC workshop, 2020."],
  ["Rotegrity — Nexorade Sphere", "Experimental tensegrity prototype exploring reciprocal structural geometries, 2018."],
  ["Pantograph Structures", "Parametric studies on deployable structural mechanisms, 2017."],
];
const CV_PUBS = [
  "Ghiyasi, T., Zargar, H., Baghi, A. (2023). Layer-by-Layer Pick and Place Collaboration Between Human and Robot Using Optimization. Proceedings of eCAADe 2023: Digital Design Reconsidered.",
  "Mostafavi, S., Ghiyasi, T., Montejano H, E., Howell, C. (2024). Timber-Dowel Reciprocal Lattice System: Design Computation to Assembly. Proceedings of the IASS 2024 Symposium, Zurich, Switzerland.",
  "Ghiyasi, T., & Ghazvinian, A. (2025). A Study on the Impact of Geometrical Optimization on Bearing Lateral Forces in Diagrid Structures. ARCC 2025, University of Maryland.",
  "Ghiyasi, T., Ghazvinian, A. (in press). Tool to Teammate: A Systematic Review on Human–Robot Collaboration in Architectural Fabrication.",
];
const CV_AWARDS = [
  "IASS 2024 Innovative Pavilions Competition — 2nd Place (€500), ETH Zurich",
  "Albert R. Moffitt Jr. & Dorris E. Moffitt Scholarship ($2,500), Texas Tech University (2024)",
  "CH Foundation Graduate Student Research Support Award ($1,500), TTU (2023)",
  "Marlene & Joseph Borda Fellowship ($750), Pennsylvania State University (2023)",
  "J. Roger Glunt Graduate Fellowship in Housing, PA Housing Research Center ($4,000), 2023",
  "TTU Travel Grants: ARCC 2025 ($1,000) + TechConnect Austin 2025 ($3,000); USPTO patent fees fully sponsored by TTU ORC",
  "Solar Decathlon (U.S. DOE, 2023) · Architecture at Zero (AIA California, 2019) · Tamayouz Excellence Award (2018)",
];

A2.Resume = () => (
  <div style={{height:"100%", display:"flex", flexDirection:"column", background:"#fff"}}>
    <div className="win__toolbar"><b style={{fontFamily:"var(--tg-mono)"}}>Tahmures_Ghiyasi_CV.rtf</b><span style={{marginLeft:"auto",color:"#888"}}>WordPad</span></div>
    <div className="wp__ruler"></div>
    <div className="wp xp-scroll doc">
      <h1 className="ds-h1" style={{fontSize:"34px",marginBottom:4}}>Tahmures Ghiyasi</h1>
      <p className="ds-cap" style={{fontSize:"12px",marginBottom:8}}>Computational Designer · Architectural Engineer · Ph.D. Candidate</p>
      <p className="cv-contact">(814) 380-1876 &nbsp;·&nbsp; tghiyasi@ttu.edu &nbsp;·&nbsp; LinkedIn &nbsp;·&nbsp; Google Scholar &nbsp;·&nbsp; Lubbock, TX</p>
      <hr className="ds-rule"/>
      <p className="ds-body" style={{maxWidth:"72ch"}}>Ph.D. candidate with 10+ years of experience in architectural
        engineering, computational design, and construction automation. Co-inventor of a U.S. patent for the
        Jointless Reciprocal Lattice system. Research focuses on AI-integrated robotic fabrication and
        multi-objective optimization to advance adaptive human–robot collaboration frameworks. Experience
        spans award-winning design projects and industry work developing AI-driven structural engineering tools.</p>

      <div className="ds-label" style={{marginTop:20}}>Professional Experience</div>
      <hr className="ds-rule"/>
      {CV_EXPERIENCE.map((e,i)=>(
        <div key={i} className="cv-role">
          <div className="cv-role__head">
            <div className="ds-h3" style={{margin:0}}>{e[0]}</div>
            <div className="cv-role__date">{e[2]}</div>
          </div>
          <div className="ds-cap" style={{marginBottom:5}}>{e[1]}</div>
          <ul className="cv-list">{e[3].map((b,j)=><li key={j}>{b}</li>)}</ul>
        </div>
      ))}

      <div className="ds-label" style={{marginTop:20}}>Technical Skills</div>
      <hr className="ds-rule"/>
      {CV_SKILLS.map((s,i)=>(
        <div key={i} className="cv-skill">
          <div className="cv-skill__k">{s[0]}</div>
          <div className="cv-skill__v">{s[1]}</div>
        </div>
      ))}

      <div className="ds-label" style={{marginTop:20}}>Patent</div>
      <hr className="ds-rule"/>
      <div className="ds-h3" style={{marginBottom:2}}>System and Method for Designing and Fabricating Three-Dimensional Reciprocal Lattice Structures</div>
      <p className="ds-body" style={{margin:0,maxWidth:"72ch"}}>USPTO Application No. US 63/662,495 (Provisional 2024;
        Full Patent Filed 2025) — supported by the TTU Office of Research Commercialization.</p>

      <div className="ds-label" style={{marginTop:20}}>Education</div>
      <hr className="ds-rule"/>
      {CV_EDUCATION.map((e,i)=>(
        <div key={i} className="cv-role">
          <div className="cv-role__head">
            <div className="ds-h3" style={{margin:0}}>{e[1]}</div>
            <div className="cv-role__date">{e[0]}</div>
          </div>
          <div className="ds-cap">{e[2]}</div>
        </div>
      ))}

      <div className="ds-label" style={{marginTop:20}}>Selected Research Projects</div>
      <hr className="ds-rule"/>
      {CV_PROJECTS.map((p,i)=>(
        <div key={i} className="cv-proj">
          <span className="cv-proj__t">{p[0]}</span>
          <span className="cv-proj__d">{p[1]}</span>
        </div>
      ))}

      <div className="ds-label" style={{marginTop:20}}>Selected Publications</div>
      <hr className="ds-rule"/>
      <ol className="cv-pubs">{CV_PUBS.map((p,i)=><li key={i}>{p}</li>)}</ol>

      <div className="ds-label" style={{marginTop:20}}>Awards & Funding</div>
      <hr className="ds-rule"/>
      <ul className="cv-list cv-list--awards">{CV_AWARDS.map((a,i)=><li key={i}>{a}</li>)}</ul>
    </div>
  </div>
);

/* ====================================================================
   CONTACT
   ==================================================================== */
A2.Contact = () => (
  <div className="contact xp-scroll doc">
    <h2 className="ds-h2">Get in touch.</h2>
    <p className="ds-body" style={{maxWidth:"54ch"}}>For research collaboration, computational-design
      consulting, or AEC roles. I reply fastest to email.</p>
    <div style={{marginTop:8}}>
      <div className="contact__row"><span className="k">Email</span>{I2.Mail()}<a href="mailto:tghiyasi@ttu.edu">tghiyasi@ttu.edu</a></div>
      <div className="contact__row"><span className="k">Phone</span>{I2.Help()}<span>(814) 380-1876</span></div>
      <div className="contact__row"><span className="k">LinkedIn</span>{I2.Globe()}<a href="#">linkedin.com/in/tahmures-ghiyasi</a></div>
      <div className="contact__row"><span className="k">Scholar</span>{I2.Globe()}<a href="#">Google Scholar — Tahmures Ghiyasi</a></div>
      <div className="contact__row"><span className="k">Location</span>{I2.Search()}<span>Lubbock, Texas</span></div>
    </div>
  </div>
);

/* ====================================================================
   PROJECTS FOLDER — opens other windows
   ==================================================================== */
A2.Projects = ({ open }) => {
  const items = [
    ["pickplace","Robotic Pick & Place", I2.Folder()],
    ["golfpavilion","Golf Club Pavilion", I2.Folder()],
    ["diagrid","Diagrid Optimization (ARCC 2025)", I2.Folder()],
    ["activebending","Active Bending Curved-Line Folding (ARCC 2025)", I2.Folder()],
    ["rotegrity","Rotegrity", I2.Folder()],
    ["robotic","Robotic_Fabrication.exe", I2.Exe()],
    ["rdmodular","RD_Modular_System.dll", I2.Dll()],
    ["housing","Ayman_Housing_Project.jpg", I2.Jpg()],
    ["patent","Jointless_Timber_Patent.pdf", I2.Pdf()],
    ["mycomputer","Skills (My Computer)", I2.MyComputer()],
  ];
  return (
    <div className="exp" style={{gridTemplateColumns:"180px 1fr"}}>
      <div className="exp__side">
        <div className="exp__panel">
          <div className="exp__panelhead">File and Folder Tasks <span className="chev">▴</span></div>
          <div className="exp__panelbody">
            <div className="lnk" onClick={()=>open && open("contact")}>{I2.Mail()} E-mail these files</div>
            <div className="lnk" onClick={()=>open && open("resume")}>{I2.Notepad()} Open résumé</div>
          </div>
        </div>
        <div className="exp__panel">
          <div className="exp__panelhead">Details <span className="chev">▴</span></div>
          <div className="exp__panelbody"><div className="info"><b>My Projects</b>7 items<br/><span style={{color:"#666"}}>selected research</span></div></div>
        </div>
      </div>
      <div className="exp__main xp-scroll">
        <div className="exp__grouphdr">Files stored on this computer</div>
        <div className="exp__grid">
          {items.map(([id,label,ico])=>(
            <div className="exp__item" key={id} onDoubleClick={()=>open && open(id)} onClick={e=>{}}>
              <div className="exp__item__ico">{ico}</div>
              <div className="exp__item__t">{label}</div>
            </div>
          ))}
        </div>
        <p className="ds-cap" style={{marginTop:14}}>Double-click any file to open it.</p>
      </div>
    </div>
  );
};

/* ====================================================================
   NEW FOLDER — empty, for future stuff
   ==================================================================== */
A2.NewFolder = ({ open }) => (
  <div className="exp" style={{gridTemplateColumns:"180px 1fr"}}>
    <div className="exp__side">
      <div className="exp__panel">
        <div className="exp__panelhead">File and Folder Tasks <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="lnk">{I2.Folder()} Make a new folder</div>
          <div className="lnk" onClick={()=>open && open("contact")}>{I2.Globe()} Publish this folder to the Web</div>
          <div className="lnk" onClick={()=>open && open("contact")}>{I2.Mail()} Share this folder</div>
        </div>
      </div>
      <div className="exp__panel">
        <div className="exp__panelhead">Details <span className="chev">▴</span></div>
        <div className="exp__panelbody"><div className="info"><b>New Folder</b>File Folder<br/><span style={{color:"#666"}}>Empty · 0 bytes</span></div></div>
      </div>
    </div>
    <div className="exp__main xp-scroll" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center",color:"#9aa3b0",fontFamily:"var(--tg-mono)"}}>
        <div style={{width:54,height:54,margin:"0 auto 12px",opacity:.5}}>{I2.Folder()}</div>
        <div style={{fontSize:12,color:"#777"}}>This folder is empty.</div>
        <div style={{fontSize:11,marginTop:6,color:"#9aa3b0"}}>Reserved for future work — drop new projects here soon.</div>
      </div>
    </div>
  </div>
);
