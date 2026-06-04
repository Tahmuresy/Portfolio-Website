/* apps4.jsx — window CONTENT: Golf Club Pavilion project folder.
   A navigable XP "Web View" folder branded for sustainable design /
   material reclamation: Awards box, README abstract, ResearchGate link,
   and two nested media-gallery subfolders.
   Exported to window.Apps.GolfPavilion. */
const { useState: useState4 } = React;
window.Apps = window.Apps || {};
const A4 = window.Apps;
const I4 = window.Icons;

const GC_ABSTRACT = "This paper presents an exploratory study of sustainable architecture through designing, optimizing, and constructing a structure utilizing reclaimed golf clubs. Highlighting the increasing adoption of resource-driven design, this research underscores the importance of integrating reclaimed materials into architectural design and fabrication. It sets a precedent for environmental responsibility within the architecture, engineering, and construction industries. The primary strategies discussed include material reuse, repurposing, and optimizing material use through computational design and digital fabrication. Central to the research is the creative utilization of reclaimed golf clubs, which vary in size and are employed without alteration to preserve the integrity of each piece. This method emphasizes the innovative potential of non-traditional building components. Another crucial aspect of this project is its contribution to reducing the construction industry's carbon footprint. By repurposing high-performance sports equipment, the study demonstrates how the lifespan of such materials can be significantly extended, enhancing sustainability and resource efficiency. The paper details the challenges in designing a joinery system that accommodates the unique properties of reclaimed golf clubs. The connection system developed for this project is vital, allowing for the assembly of the clubs without permanent modifications like welding or riveting. A proof-of-the-concept prototype of the system is designed, fabricated, and discussed in this paper, highlighting the complexities and uncertainties of working with reclaimed materials and showcasing the innovative solutions necessary for their successful architectural integration for promoting a shift towards more sustainable and responsible design methodologies.";

const GC_RG_URL = "https://www.researchgate.net/publication/383750969_Innovative_Reclamation_and_Design_A_Lightweight_Structure_from_Reclaimed_Golf_Clubs";

/* gallery contents — real project plates, organized into two subfolders */
const GC_OPTIM = [
  ["assets/img/golf/form-finding.jpg", "form_finding_process.jpg", "Form-finding: from the boundary curve (A) through tensioned membranes (B–C) to the relaxed quad-mesh shell (D)."],
  ["assets/img/golf/wallacei-grid-top.jpg", "wallacei_population_top.jpg", "Wallacei X (NSGA-II) — 214 exported Pareto solutions out of 15,000 evaluated individuals."],
  ["assets/img/golf/wallacei-grid-persp.jpg", "wallacei_population_persp.jpg", "Solution population in perspective — each cell a candidate gridshell scored on three fitness values."],
  ["assets/img/golf/pareto-front.jpg", "pareto_front_selection.jpg", "Pareto front — five desired solutions selected from the last ten generations."],
  ["assets/img/golf/pareto-scatter.jpg", "pareto_scatter.jpg", "Non-dominated solutions scattered across the objective space by fitness value."],
  ["assets/img/golf/generation-row.jpg", "generation_comparison.jpg", "Generation comparison; Gen 99 · Ind 13 highlighted as the chosen direction."],
  ["assets/img/golf/mesh-298-top.jpg", "mesh_gen298_top.jpg", "Selected individual Gen 298 · Ind 42 — quad-mesh panel topology, plan view."],
  ["assets/img/golf/mesh-298-iso.jpg", "mesh_gen298_iso.jpg", "Gen 298 · Ind 42 — isometric of the relaxed three-leg shell."],
  ["assets/img/golf/mesh-298-persp.jpg", "mesh_gen298_persp.jpg", "Gen 298 · Ind 42 — vaulted arch perspective, FV 112.04 / 17.12 / 0.80."],
  ["assets/img/golf/mesh-298-arch.jpg", "mesh_gen298_span.jpg", "Gen 298 · Ind 42 — span study showing the continuous quad lattice."],
  ["assets/img/golf/shell-side.jpg", "shell_elevation_side.jpg", "Final shell — side elevation of the quad-mesh surface."],
  ["assets/img/golf/shell-front.jpg", "shell_elevation_front.jpg", "Final shell — front elevation."],
  ["assets/img/golf/precedent-nomad.jpg", "precedent_nomad_skis.jpg", "Precedent: Nomad Pavilion gridshell fabricated from reclaimed skis (EPFL, Lausanne)."],
];

const GC_JOINERY = [
  ["assets/img/golf/discarded-clubs.jpg", "reclaimed_stock.jpg", "Reclaimed stock sorted by failure mode: (a) grip damage, (b) deformed shaft, (c) broken head."],
  ["assets/img/golf/connection-development.jpg", "connection_development.jpg", "Development of the connection system: initial U-joint test → first iteration → final design."],
  ["assets/img/golf/connection-exploded.jpg", "connection_exploded.jpg", "Exploded view of the connection components (clamshell · linkage · U-joint) and assembled states."],
  ["assets/img/golf/prototype-detail.jpg", "prototype_details.jpg", "Proof-of-concept prototype (left) and details of the 3D-printed connection components (right)."],
  ["assets/img/golf/prototype-connector.jpg", "prototype_connector.jpg", "Half-scale prototype — PLA/PETG clamshell connector gripping reclaimed shafts without alteration."],
];

const GC_SUBFOLDERS = [
  { id:"optim", name:"Optimization & Form-Finding", data:GC_OPTIM,
    blurb:"Kangaroo2 relaxation meshes, Wallacei X (NSGA-II) Pareto fronts, and the selected quad-mesh panel topology." },
  { id:"joinery", name:"Joinery & Prototyping", data:GC_JOINERY,
    blurb:"The parametric PLA/PETG connection system and half-scale prototype photographed at the First Friday Art Trail." },
];

/* gold trophy — bespoke XP-flavored mark for the awards box (no emoji) */
function GcTrophy({ size = 30 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="nodrag" aria-hidden="true">
      <defs>
        <linearGradient id="gc-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe89a"/><stop offset=".5" stopColor="#f6c441"/><stop offset="1" stopColor="#c8920f"/>
        </linearGradient>
      </defs>
      <path d="M9 4h14v6a7 7 0 0 1-14 0z" fill="url(#gc-gold)" stroke="#9b7314" strokeWidth="1"/>
      <path d="M9 5H5.5v2.5A4.5 4.5 0 0 0 10 12" fill="none" stroke="#c8920f" strokeWidth="1.6"/>
      <path d="M23 5h3.5v2.5A4.5 4.5 0 0 1 22 12" fill="none" stroke="#c8920f" strokeWidth="1.6"/>
      <rect x="14.4" y="16" width="3.2" height="4" fill="#d9a522"/>
      <path d="M11 20h10l1 3H10z" fill="url(#gc-gold)" stroke="#9b7314" strokeWidth="1"/>
      <rect x="8.5" y="23" width="15" height="3" rx="1" fill="#e0b431" stroke="#9b7314" strokeWidth="1"/>
      <path d="M13.2 6.6l1.1 2.2 2.4.3-1.8 1.7.5 2.4-2.1-1.2-2.1 1.2.5-2.4-1.8-1.7 2.4-.3z" fill="#fff" opacity=".75"/>
    </svg>
  );
}

/* green reclamation folder mark for the nested subfolders */
function GcFolderIcon({ size = 44 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="nodrag">
      <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#3f9b6e" stroke="#1f6e49" strokeWidth="1"/>
      <path d="M4 11.5h24V26H4z" fill="#5cbf8c"/>
      <path d="M4 11.5h24v2.2H4z" fill="#7cd6a6"/>
      <g stroke="#1f6e49" strokeWidth="1.2" fill="none" opacity=".9" transform="translate(16 19) scale(.62)">
        <path d="M-5 -1l2.4-4.2 2.4 1.4"/>
        <path d="M5.4 1.6l-2.4 4.2-2.4-1.4"/>
        <path d="M-2.6 5.2l-2.4-4.2 2.4-1.4" transform="rotate(120)"/>
      </g>
    </svg>
  );
}

A4.GolfPavilion = ({ open }) => {
  const [view, setView] = useState4("root");
  const [box, setBox] = useState4(null);
  const current = GC_SUBFOLDERS.find(f => f.id === view);

  const Sidebar = (
    <div className="exp__side golf__side">
      {/* AWARDS & RECOGNITION — branded gold box */}
      <div className="gc-award">
        <div className="gc-award__head"><GcTrophy size={26}/><span>Awards &amp; Recognition</span></div>
        <div className="gc-award__body">
          <b>2nd Place Winner</b>
          <span className="gc-award__prize">€500 Prize</span>
          <small>IASS Symposium 2024 · ETH Zurich</small>
        </div>
      </div>

      <div className="exp__panel">
        <div className="exp__panelhead">File and Folder Tasks <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          {view === "root"
            ? GC_SUBFOLDERS.map(f =>
                <div className="lnk" key={f.id} onClick={()=>setView(f.id)}>{GcFolderMini()} Open {f.name}</div>)
            : <div className="lnk" onClick={()=>setView("root")}>{I4.Folder()} Back to project folder</div>}
          <div className="lnk" onClick={()=>window.open(GC_RG_URL, "_blank")}>{I4.Globe()} View on ResearchGate</div>
          <div className="lnk" onClick={()=>open && open("contact")}>{I4.Mail()} E-mail the author</div>
        </div>
      </div>

      <div className="exp__panel">
        <div className="exp__panelhead">Details <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="info">
            <b>Golf Club Pavilion</b>
            Research project · Folder
            <div className="pp-meta gc-meta">
              <div className="pp-meta__k">Authors</div>
              <div className="pp-meta__v">Javier Cardenas, Carson Maggard, Mason Moya, Micah Regier, Tahmures Ghiyasi, Ali Ghazvinian</div>
              <div className="pp-meta__k">Tech stack</div>
              <div className="pp-meta__v">Kangaroo2 · Karamba3D · Wallacei X (NSGA-II) · 3D Printing (PLA / PETG)</div>
              <div className="pp-meta__k">Institution</div>
              <div className="pp-meta__v">Texas Tech University</div>
              <div className="pp-meta__k">Publication</div>
              <div className="pp-meta__v">IASS 2024 Symposium · Zurich</div>
            </div>
          </div>
        </div>
      </div>

      <div className="exp__panel">
        <div className="exp__panelhead">Other Places <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="lnk" onClick={()=>open && open("projects")}>{I4.Folder()} My Projects</div>
          <div className="lnk" onClick={()=>open && open("mycomputer")}>{I4.MyComputer()} My Computer</div>
        </div>
      </div>
    </div>
  );

  const Root = (
    <div className="exp__main xp-scroll pp golf">
      <div className="pp-addr"><span className="pp-addr__ico">{I4.Folder()}</span>
        <span>My Projects</span><span className="pp-addr__sep">›</span>
        <b>Golf Club Pavilion</b></div>

      <div className="gc-banner">
        <span className="gc-banner__tag">Reclaimed · Resource-Driven Design</span>
        Innovative Reclamation and Design — a lightweight gridshell from reclaimed golf clubs.
      </div>

      <div className="pp-hero plate">
        <img src="assets/img/golf/golf-hero.jpg" alt="Pavilion of reclaimed golf clubs at dusk"/>
      </div>
      <div className="ds-cap" style={{marginBottom:18}}>Half-scale prototype assembled from reclaimed golf-club shafts and 3D-printed clamshell connectors — no welding, no riveting, no alteration of the reclaimed pieces.</div>

      <div className="exp__grouphdr">Document</div>
      <div className="pp-readme">
        <div className="pp-readme__bar">{I4.Notepad()}<b>README.txt</b><span className="pp-readme__meta">Notepad — abstract</span></div>
        <div className="pp-readme__body xp-scroll">
          <div className="pp-readme__title">Innovative Reclamation and Design:<br/>A Lightweight Structure from Reclaimed Golf Clubs</div>
          <p>{GC_ABSTRACT}</p>
        </div>
      </div>

      <div className="pp-actions">
        <button className="xp-btn pp-btn gc-btn" onClick={()=>window.open(GC_RG_URL, "_blank")}>
          {I4.Globe()} Read Full Paper on ResearchGate
        </button>
      </div>

      <div className="exp__grouphdr" style={{marginTop:18}}>Folders — media galleries</div>
      {GC_SUBFOLDERS.map(f => (
        <div className="pp-folder gc-folder" key={f.id} onClick={()=>setView(f.id)} title={"Open " + f.name}>
          <GcFolderIcon size={44}/>
          <div className="pp-folder__t"><b>{f.name}</b>
            <small>{f.blurb} — {f.data.length} items</small></div>
          <span className="pp-folder__chev">›</span>
        </div>
      ))}
    </div>
  );

  const Gallery = current && (
    <div className="exp__main xp-scroll pp golf">
      <div className="pp-addr">
        <span className="pp-addr__ico">{I4.Folder()}</span>
        <span className="pp-addr__link" onClick={()=>setView("root")}>Golf Club Pavilion</span>
        <span className="pp-addr__sep">›</span><b>{current.name}</b>
        <button className="xp-btn pp-up" onClick={()=>setView("root")}>‹ Up</button>
      </div>
      <p className="ds-cap" style={{marginBottom:14}}>{current.blurb}</p>
      <div className="pp-gallery">
        {current.data.map((g,i)=>(
          <figure className="pp-tile" key={i} onClick={()=>setBox(g)}>
            <div className="pp-tile__img"><img src={g[0]} alt={g[2]} loading="lazy"/></div>
            <figcaption className="pp-tile__cap">{g[1]}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );

  return (
    <div className="exp xp-scroll pp-root golf-root" style={{gridTemplateColumns:"200px 1fr"}}>
      {Sidebar}
      {view === "root" ? Root : Gallery}
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

/* small inline green folder for sidebar task links */
function GcFolderMini() {
  return (
    <svg viewBox="0 0 32 32" className="nodrag" style={{width:15,height:15}}>
      <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#3f9b6e" stroke="#1f6e49" strokeWidth="1"/>
      <path d="M4 11.5h24V26H4z" fill="#5cbf8c"/>
    </svg>
  );
}
