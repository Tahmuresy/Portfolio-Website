/* apps6.jsx — window CONTENT: Active Bending Curved-Line Folding (ARCC 2025).
   A navigable XP "Web View" folder branded for lightweight / bending-active
   research: README abstract, ResearchGate link, structured metadata, and
   three media-gallery subfolders. Warm ochre accent brands it apart from
   Pick & Place (cyan), Golf (green), and Diagrid (magenta).
   Exported to window.Apps.ActiveBending. */
const { useState: useState6 } = React;
window.Apps = window.Apps || {};
const A6 = window.Apps;
const I6 = window.Icons;

const AB_ABSTRACT = "Flexible structures integrate advanced formability techniques with flexible materials and the principles of bending-active systems. Architectural design tools and structural systems provide a framework for developing foldable bending-active shells. These systems have emerged as a significant approach in the pursuit of lightweight and sustainable architectural designs, aiming to minimize environmental impact. A central aspect of these structures is achieving optimal performance while reducing energy and material use. Their ability to withstand applied loads is largely derived from their geometric configuration, which is determined through a form optimization process known as form-finding. This process necessitates a shift in the computational methods employed in architectural modeling. Recent advancements in simulation techniques have enabled deeper exploration of bending-active structures, informed by the evolution of materials, historical precedents, and innovative applications. This research introduces an original structural concept that leverages bending-active principles. The proposed system demonstrates the potential of using flexible materials in shell structures to enhance stiffness and structural efficiency. The design process incorporates fundamental geometric principles, utilizing folding techniques to achieve the desired form, which the authors suggest as a potential application of this pattern in constructing lightweight pavilion structures. By employing folded bending-active surfaces, the stiffness of the structure is augmented through the introduction of curvature, resulting in a highly efficient and adaptable system.";

const AB_RG_URL = "https://www.researchgate.net/publication/404720170_ACTIVE_BENDING_CURVED-LINE_FOLDING_AS_LIGHTWEIGHT_STRUCTURES_TRANSFORMING_FLAT_SHEETS_INTO_COMPLEX_3D_FORMS";

const AB_PATTERNS = [
  ["assets/img/bending/fig01-classification.jpg", "fig01_classification.jpg", "Fig. 1 — Classifications of bending-active surfaces by type of bending, availability of folding, and the resulting shape."],
  ["assets/img/bending/fig02-crease-reflection.jpg", "fig02_crease_families.jpg", "Fig. 2 — Crease-pattern families that generate a bending-active system: reflection (concave · mixed · convex · inflection) and repetition across 2–4 units. (Image: Aline Vergauwen)"],
  ["assets/img/bending/fig03-crease-kraft.jpg", "fig03_kraft_study.jpg", "Fig. 3 — Physical crease-pattern study in kraft paper — the flat sheet (top) folds into a self-stiffening curved module (bottom). (Image: Soroush Reaisi)"],
  ["assets/img/bending/fig04-pattern-behavior.jpg", "fig04_pattern_behavior.jpg", "Fig. 4 — A) Behavior of the generated pattern along its fold and bend lines. B) Pattern optimization increasing form development through a 180° rotation."],
  ["assets/img/bending/fig05-millipede.jpg", "fig05_millipede.jpg", "Fig. 5 — Determining the maximum form change of the pattern using the Millipede plugin in Grasshopper. (Image: Soroush Reaisi & Tahmures Ghiyasi)"],
];

const AB_MATERIALS = [
  ["assets/img/bending/fig06-materials.jpg", "fig06_cnc_materials.jpg", "Fig. 6 — The final pattern CNC-cut across four candidate materials: HIPS 2 mm and Polypropylene at 2 / 1 / 0.5 mm. (Image: Soroush Reaisi)"],
  ["assets/img/bending/fig07-test-1mm.jpg", "fig07_test_pp1_hips2.jpg", "Fig. 7 — A) PP, 1 mm. B) HIPS, 2 mm — the HIPS samples proved fragile along the curved lines under slight pressure. (Image: Soroush Reaisi)"],
  ["assets/img/bending/fig08-test-2mm.jpg", "fig08_test_pp2.jpg", "Fig. 8 — A) PP, 2 mm — strong results on the 150 and 200 mm models. B) PP recovered its original shape after roughly a week under a bolted connection. (Image: Soroush Reaisi)"],
  ["assets/img/bending/fig09-formability.jpg", "fig09_formability.jpg", "Fig. 9 — Formability of the patterns after connecting modules with bolts and nuts. (Image: Soroush Reaisi)"],
];

const AB_PAVILION = [
  ["assets/img/bending/fig10-form-design.jpg", "fig10_form_design.jpg", "Fig. 10 — The pavilion form-design process, from paired modules to the aggregated curved shell. (Image: Soroush Reaisi)"],
  ["assets/img/bending/fig11-kiwi.jpg", "fig11_kiwi_deformation.jpg", "Fig. 11 — Z-axis deformation of the pavilion analyzed with the Kiwi plugin in Grasshopper under dead load: A) without and B) with bolted connections."],
  ["assets/img/bending/fig12-connection.jpg", "fig12_connection_setup.jpg", "Fig. 12 — A) Connection of the different points of the pavilion. B) Setting up the pavilion's form on site. C) Render of the proposed research pavilion. (Image: Soroush Reaisi)"],
  ["assets/img/bending/fig13-process.jpg", "fig13_project_process.jpg", "Fig. 13 — The overall process: from traditional knowledge and bending-active materials through design and modeling to the final active-bending structure. (Image: Soroush Reaisi)"],
  ["assets/img/bending/render-persp.jpg", "render_pavilion_persp.jpg", "Perspective render of the proposed research pavilion — the folded bending-active shell rising from timber seating ramps."],
];

const AB_SUBFOLDERS = [
  { id:"patterns", name:"Bending-Active Patterns", data:AB_PATTERNS,
    blurb:"Surface classifications, crease-pattern families, the kraft-paper study, and Millipede form-change optimization." },
  { id:"materials", name:"Material Testing", data:AB_MATERIALS,
    blurb:"CNC-cut prototypes in HIPS and Polypropylene, curved-line fragility tests, and bolted-connection formability." },
  { id:"pavilion", name:"Pavilion Design & Analysis", data:AB_PAVILION,
    blurb:"Form-finding, Kiwi Z-axis deformation analysis, on-site assembly, the project workflow, and final renders." },
];

/* warm folded-sheet folder mark for the nested subfolders */
function AbFolderIcon({ size = 44 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="nodrag">
      <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#c89a4e" stroke="#9a6f1f" strokeWidth="1"/>
      <path d="M4 11.5h24V26H4z" fill="#e3c178"/>
      <path d="M4 11.5h24v2.2H4z" fill="#f1d79b"/>
      <path d="M7 22c4-6 8-6 9 0M16 22c1-6 5-6 9 0" fill="none" stroke="#9a6f1f" strokeWidth="1.2" opacity=".85"/>
    </svg>
  );
}
function AbFolderMini() {
  return (
    <svg viewBox="0 0 32 32" className="nodrag" style={{width:15,height:15}}>
      <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#c89a4e" stroke="#9a6f1f" strokeWidth="1"/>
      <path d="M4 11.5h24V26H4z" fill="#e3c178"/>
    </svg>
  );
}

A6.ActiveBending = ({ open }) => {
  const [view, setView] = useState6("root");
  const [box, setBox] = useState6(null);
  const current = AB_SUBFOLDERS.find(f => f.id === view);

  const Sidebar = (
    <div className="exp__side ab__side">
      <div className="exp__panel">
        <div className="exp__panelhead">File and Folder Tasks <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          {view === "root"
            ? AB_SUBFOLDERS.map(f =>
                <div className="lnk" key={f.id} onClick={()=>setView(f.id)}>{AbFolderMini()} Open {f.name}</div>)
            : <div className="lnk" onClick={()=>setView("root")}>{I6.Folder()} Back to project folder</div>}
          <div className="lnk" onClick={()=>window.open(AB_RG_URL, "_blank")}>{I6.Globe()} View on ResearchGate</div>
          <div className="lnk" onClick={()=>open && open("contact")}>{I6.Mail()} E-mail the author</div>
        </div>
      </div>

      <div className="exp__panel">
        <div className="exp__panelhead">Details <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="info">
            <b>Active Bending Curved-Line Folding</b>
            Research project · Folder
            <div className="pp-meta ab-meta">
              <div className="pp-meta__k">Authors</div>
              <div className="pp-meta__v">Soroush Reaisi, Tahmures Ghiyasi</div>
              <div className="pp-meta__k">Tech stack</div>
              <div className="pp-meta__v">Rhinoceros · Grasshopper · Millipede · Kiwi3D · CNC fabrication</div>
              <div className="pp-meta__k">Materials</div>
              <div className="pp-meta__v">HIPS 2 mm · Polypropylene 0.5–2 mm</div>
              <div className="pp-meta__k">Institutions</div>
              <div className="pp-meta__v">Concordia University · Texas Tech University</div>
              <div className="pp-meta__k">Publication</div>
              <div className="pp-meta__v">ARCC 2025 · University of Maryland</div>
            </div>
          </div>
        </div>
      </div>

      <div className="exp__panel">
        <div className="exp__panelhead">Other Places <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="lnk" onClick={()=>open && open("projects")}>{I6.Folder()} My Projects</div>
          <div className="lnk" onClick={()=>open && open("mycomputer")}>{I6.MyComputer()} My Computer</div>
        </div>
      </div>
    </div>
  );

  const Root = (
    <div className="exp__main xp-scroll pp bending">
      <div className="pp-addr"><span className="pp-addr__ico">{I6.Folder()}</span>
        <span>My Projects</span><span className="pp-addr__sep">›</span>
        <b>Active Bending Curved-Line Folding (ARCC 2025)</b></div>

      <div className="ab-banner">
        <span className="ab-banner__tag">Bending-Active · Lightweight Structures</span>
        Curved-line folding transforms flat sheets into a self-stiffening, complex 3D shell — a lightweight research pavilion.
      </div>

      <div className="pp-hero plate">
        <img src="assets/img/bending/hero.jpg" alt="Aerial render of the folded bending-active research pavilion"/>
      </div>
      <div className="ds-cap" style={{marginBottom:18}}>A research pavilion of folded, bending-active shells — flat polypropylene sheets curved along curved-line folds into a stiff, lightweight canopy over timber seating ramps.</div>

      <div className="exp__grouphdr">Document</div>
      <div className="pp-readme">
        <div className="pp-readme__bar">{I6.Notepad()}<b>README.txt</b><span className="pp-readme__meta">Notepad — abstract</span></div>
        <div className="pp-readme__body xp-scroll">
          <div className="pp-readme__title">Active Bending Curved-Line Folding as Lightweight Structures:<br/>Transforming Flat Sheets into Complex 3D Forms</div>
          <p>{AB_ABSTRACT}</p>
        </div>
      </div>

      <div className="pp-actions">
        <button className="xp-btn pp-btn ab-btn" onClick={()=>window.open(AB_RG_URL, "_blank")}>
          {I6.Globe()} Read Full Paper on ResearchGate
        </button>
      </div>

      <div className="exp__grouphdr" style={{marginTop:18}}>Folders — media galleries</div>
      {AB_SUBFOLDERS.map(f => (
        <div className="pp-folder ab-folder" key={f.id} onClick={()=>setView(f.id)} title={"Open " + f.name}>
          <AbFolderIcon size={44}/>
          <div className="pp-folder__t"><b>{f.name}</b>
            <small>{f.blurb} — {f.data.length} items</small></div>
          <span className="pp-folder__chev">›</span>
        </div>
      ))}
    </div>
  );

  const Gallery = current && (
    <div className="exp__main xp-scroll pp bending">
      <div className="pp-addr">
        <span className="pp-addr__ico">{I6.Folder()}</span>
        <span className="pp-addr__link" onClick={()=>setView("root")}>Active Bending Curved-Line Folding (ARCC 2025)</span>
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
    <div className="exp xp-scroll pp-root ab-root" style={{gridTemplateColumns:"200px 1fr"}}>
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
