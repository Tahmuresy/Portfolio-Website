/* apps5.jsx — window CONTENT: Diagrid Optimization (ARCC 2025) project folder.
   A navigable XP "Web View" folder branded for structural optimization /
   tall-building research: README abstract, ResearchGate link, structured
   metadata, and a Figures & Diagrams media-gallery subfolder.
   Exported to window.Apps.Diagrid (overrides the old doc-style page). */
const { useState: useState5 } = React;
window.Apps = window.Apps || {};
const A5 = window.Apps;
const I5 = window.Icons;

const DG_ABSTRACT = "The increasing demand for sustainable and resilient high-rise structures has driven the development of advanced structural systems that integrate material efficiency, structural performance, and environmental adaptability. Diagrid structures, known for their high lateral stiffness, reduced material consumption, and improved architectural versatility, have emerged as a prominent solution. This study investigates the optimization of diagrid systems in tall buildings using a multi-objective parametric framework. The primary objectives are minimizing structural mass, volume, and lateral displacement while ensuring stability and addressing environmental considerations, such as daylight access. A computational workflow integrating parametric modeling, structural analysis, and optimization tools evaluates the influence of key variables, including diagonal member inclination, diagrid density, and building geometry. The study explores a range of configurations in plan utilizing stress-line mapping techniques to align diagrid patterns with principal stress trajectories. Daylight factor analyses refine the configurations to enhance environmental performance without compromising structural safety. Results demonstrate that diagrid inclination angles within specific ranges, combined with optimized geometric parameters, improve lateral stiffness while reducing material use. These findings provide a systematic approach for balancing structural and architectural objectives, contributing to the broader goal of sustainable and efficient high-rise design.";

const DG_RG_URL = "https://www.researchgate.net/publication/404719611_A_STUDY_OF_THE_IMPACT_OF_GEOMETRICAL_OPTIMIZATION_ON_BEARING_LATERAL_FORCES_IN_THE_DIAGRID_STRUCTURES";

/* gallery contents — the four paper plates with verbatim-derived captions */
const DG_FIGURES = [
  ["assets/img/diagrid/precedents.jpg", "fig01_precedents.jpg", "Fig. 1 — Precedents of diagrid high-rises. A: Hearst Tower, New York. B: CCTV Headquarters, Beijing, with the planar projection of its irregular diagrid. C: 30 St Mary Axe (the Gherkin), London."],
  ["assets/img/diagrid/workflow.jpg", "fig02_workflow.png", "Fig. 2 — Workflow of the parametric and computational approach: parametric modelling → structural analysis → multi-objective optimization → integrating daylight and design criteria, across Rhinoceros, Grasshopper, Karamba3D, and Wallacei."],
  ["assets/img/diagrid/configuration.jpg", "fig03_configuration.png", "Fig. 3 — Configuration demonstrating the diagrid optimized for lateral forces alongside a central shear core carrying gravity loads. Member diameters are tuned parametrically at a uniform 0.88 cm wall thickness."],
  ["assets/img/diagrid/scatterplot.jpg", "fig04_pareto_scatter.png", "Fig. 4 — Scatterplot of the trade-offs among total structural mass, element volume, and cumulative displacement across ~10,000 Wallacei iterations; perspective views (right) show optimized towers with varying base shapes."],
];

const DG_SUBFOLDER = {
  name: "Figures & Diagrams",
  blurb: "Precedent study, the parametric workflow, the optimized diagrid-plus-core configuration, and the Wallacei Pareto trade-off space.",
};

/* structural diagrid folder mark — magenta-noded lattice on a blue plate */
function DgFolderIcon({ size = 44 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="nodrag">
      <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#3a6ea8" stroke="#23476f" strokeWidth="1"/>
      <path d="M4 11.5h24V26H4z" fill="#5d8fc4"/>
      <path d="M4 11.5h24v2.2H4z" fill="#7fa9d6"/>
      <g stroke="#fff" strokeWidth="1" fill="none" opacity=".85">
        <path d="M8 25l4-9 4 9 4-9 4 9M6 20l6-6 6 6 6-6"/>
      </g>
      <g fill="#EC008C"><circle cx="12" cy="16" r="1.2"/><circle cx="20" cy="16" r="1.2"/></g>
    </svg>
  );
}
/* small inline variant for sidebar task links */
function DgFolderMini() {
  return (
    <svg viewBox="0 0 32 32" className="nodrag" style={{width:15,height:15}}>
      <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#3a6ea8" stroke="#23476f" strokeWidth="1"/>
      <path d="M4 11.5h24V26H4z" fill="#5d8fc4"/>
    </svg>
  );
}

A5.Diagrid = ({ open }) => {
  const [view, setView] = useState5("root");
  const [box, setBox] = useState5(null);

  const Sidebar = (
    <div className="exp__side dg__side">
      <div className="exp__panel">
        <div className="exp__panelhead">File and Folder Tasks <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          {view === "figures"
            ? <div className="lnk" onClick={()=>setView("root")}>{I5.Folder()} Back to project folder</div>
            : <div className="lnk" onClick={()=>setView("figures")}>{DgFolderMini()} Open {DG_SUBFOLDER.name}</div>}
          <div className="lnk" onClick={()=>window.open(DG_RG_URL, "_blank")}>{I5.Globe()} View on ResearchGate</div>
          <div className="lnk" onClick={()=>open && open("contact")}>{I5.Mail()} E-mail the author</div>
        </div>
      </div>

      <div className="exp__panel">
        <div className="exp__panelhead">Details <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="info">
            <b>Diagrid Optimization</b>
            Research project · Folder
            <div className="pp-meta dg-meta">
              <div className="pp-meta__k">Authors</div>
              <div className="pp-meta__v">Tahmures Ghiyasi, Ali Ghazvinian</div>
              <div className="pp-meta__k">Tech stack</div>
              <div className="pp-meta__v">Rhinoceros · Grasshopper · Karamba3D · Wallacei</div>
              <div className="pp-meta__k">Variables</div>
              <div className="pp-meta__v">Diagrid angle 63°–79° · 40–80 stories · 4–8 perimeter facets</div>
              <div className="pp-meta__k">Institution</div>
              <div className="pp-meta__v">Huckabee College of Architecture, Texas Tech University</div>
              <div className="pp-meta__k">Publication</div>
              <div className="pp-meta__v">ARCC 2025 · University of Maryland</div>
            </div>
          </div>
        </div>
      </div>

      <div className="exp__panel">
        <div className="exp__panelhead">Other Places <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="lnk" onClick={()=>open && open("projects")}>{I5.Folder()} My Projects</div>
          <div className="lnk" onClick={()=>open && open("mycomputer")}>{I5.MyComputer()} My Computer</div>
        </div>
      </div>
    </div>
  );

  const Root = (
    <div className="exp__main xp-scroll pp diagrid">
      <div className="pp-addr"><span className="pp-addr__ico">{I5.Folder()}</span>
        <span>My Projects</span><span className="pp-addr__sep">›</span>
        <b>Diagrid Optimization (ARCC 2025)</b></div>

      <div className="dg-banner">
        <span className="dg-banner__tag">Structural Optimization · Tall Buildings</span>
        Geometric optimization of diagrid exoskeletons — minimizing mass, volume, and lateral drift under wind and seismic loads.
      </div>

      <div className="pp-hero plate">
        <img src="assets/img/diagrid/hero.jpg" alt="Diagrid exoskeleton of a glass high-rise tower"/>
      </div>
      <div className="ds-cap" style={{marginBottom:18}}>The diagrid exoskeleton carries lateral wind and seismic forces through its triangulated steel lattice, freeing the floor plates of perimeter columns — the structural logic this study optimizes parametrically.</div>

      <div className="exp__grouphdr">Document</div>
      <div className="pp-readme">
        <div className="pp-readme__bar">{I5.Notepad()}<b>README.txt</b><span className="pp-readme__meta">Notepad — abstract</span></div>
        <div className="pp-readme__body xp-scroll">
          <div className="pp-readme__title">A Study of the Impact of Geometrical Optimization<br/>on Bearing Lateral Forces in Diagrid Structures</div>
          <p>{DG_ABSTRACT}</p>
        </div>
      </div>

      <div className="pp-actions">
        <button className="xp-btn pp-btn dg-btn" onClick={()=>window.open(DG_RG_URL, "_blank")}>
          {I5.Globe()} Read Full Paper on ResearchGate
        </button>
      </div>

      <div className="exp__grouphdr" style={{marginTop:18}}>Folders — media galleries</div>
      <div className="pp-folder dg-folder" onClick={()=>setView("figures")} title={"Open " + DG_SUBFOLDER.name}>
        <DgFolderIcon size={44}/>
        <div className="pp-folder__t"><b>{DG_SUBFOLDER.name}</b>
          <small>{DG_SUBFOLDER.blurb} — {DG_FIGURES.length} items</small></div>
        <span className="pp-folder__chev">›</span>
      </div>
    </div>
  );

  const Figures = (
    <div className="exp__main xp-scroll pp diagrid">
      <div className="pp-addr">
        <span className="pp-addr__ico">{I5.Folder()}</span>
        <span className="pp-addr__link" onClick={()=>setView("root")}>Diagrid Optimization (ARCC 2025)</span>
        <span className="pp-addr__sep">›</span><b>{DG_SUBFOLDER.name}</b>
        <button className="xp-btn pp-up" onClick={()=>setView("root")}>‹ Up</button>
      </div>
      <p className="ds-cap" style={{marginBottom:14}}>{DG_SUBFOLDER.blurb}</p>
      <div className="pp-gallery">
        {DG_FIGURES.map((g,i)=>(
          <figure className="pp-tile" key={i} onClick={()=>setBox(g)}>
            <div className="pp-tile__img"><img src={g[0]} alt={g[2]} loading="lazy"/></div>
            <figcaption className="pp-tile__cap">{g[1]}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );

  return (
    <div className="exp xp-scroll pp-root dg-root" style={{gridTemplateColumns:"200px 1fr"}}>
      {Sidebar}
      {view === "figures" ? Figures : Root}
      {box && (
        <div className="pp-lightbox" onClick={()=>setBox(null)}>
          <div className="pp-lightbox__inner" onClick={e=>e.stopPropagation()}>
            <button className="pp-lightbox__close" onClick={()=>setBox(null)} aria-label="Close">✕</button>
            <img src={box[0]} alt={box[2]}/>
            <div className="pp-lightbox__cap"><b>{box[1]}</b><span>{box[2]}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};
