/* apps7.jsx — window CONTENT: Rotegrity (Tabriz Islamic Arts University, 2019).
   A navigable XP "Web View" folder for an architectural design-studio project:
   README brief, a nexor glossary, structured metadata, and three media-gallery
   subfolders (presentation boards, geometry / form-finding, nexor details).
   Steel-blue accent brands it apart from the research-paper folders.
   Exported to window.Apps.Rotegrity. */
const { useState: useState7 } = React;
window.Apps = window.Apps || {};
const A7 = window.Apps;
const I7 = window.Icons;

const RT_INTRO = "Different building systems have their strengths and weaknesses. Some of these weaknesses include the need for expensive materials, members, or connections; the need for heavy machinery to install complex structural geometry; and the need for specialized personnel to design, manufacture, and install.";

const RT_BODY = "Rotegrity is a sphere made of Nexorade elements and possesses eligible structural stability. In this project we built a Rotegrity of 4.5 m diameter, based on an individual Regular Icosahedron geodesic sphere that has passed one iteration of loop subdivision — composed of multiple copies of two linear components (60 of each). Nexorade structures can be built on a small scale with third-grade timber. Because the upper member simply presses on the load-bearing member, no special or expensive joints are needed — each connection only meets the geometric needs of the structure. Since only two members meet at any connection (unlike space frames, where many members share a node), members can shift position to create new geometry — the basis for deployable structures. With a simple assembly logic and no need for specialized expertise, Nexorade suits cases that require rapid construction and accommodation.";

/* nexor glossary — "decide where to put which": the Details & Parts terminology */
const RT_GLOSSARY = [
  ["Nexor", "Each element that constitutes a nexorade. Latin for 'link'. A nexor has four connection points — two at its ends, two at intermediate points along its length."],
  ["Nexorade", "An 'assembly of nexors'. Their arrangement gives rise to a number of openings."],
  ["Engagement window", "Each opening formed between the nexors of a fan."],
  ["Engagement length", "The length of each side of an engagement window."],
  ["Engagement ratio", "Engagement length ÷ total nexor length. Typically in the range 0.1 – 0.4."],
  ["Valency", "The number of nexors constituting a fan. Fans in one nexorade need not share the same valency."],
];

const RT_BOARDS = [
  ["assets/img/rotegrity/board-1.jpg", "board_01_title.jpg", "Board 01 — Title & premise: the structural shortcomings Rotegrity sets out to avoid, over a render of the 4.5 m nexorade sphere."],
  ["assets/img/rotegrity/board-2.jpg", "board_02_concept.jpg", "Board 02 — The Rotegrity concept and the form-finding process: Regular Icosahedron → loop subdivision → reciprocal sphere, built from two linear components (60 of each)."],
  ["assets/img/rotegrity/board-3.jpg", "board_03_nexorade.jpg", "Board 03 — Nexorade structures: the press-fit two-member connection, the swivel detail, and the underlying nexorade rotation principles."],
  ["assets/img/rotegrity/board-4.jpg", "board_04_details.jpg", "Board 04 — Detail & parts: the nexor anatomy, ST37-2 steel-angle specification, and black-and-white photographs of the on-site assembly."],
];

const RT_GEOMETRY = [
  ["assets/img/rotegrity/ff-overview.jpg", "form_finding_overview.jpg", "Form-finding overview: Regular Icosahedron → one iteration of subdivision → form-finding of the Rotegrity based on the subdivided icosahedron."],
  ["assets/img/rotegrity/ff-icosahedron.jpg", "01_regular_icosahedron.jpg", "Stage 01 — the Regular Icosahedron: the 20-face Platonic solid that seeds the geometry."],
  ["assets/img/rotegrity/ff-geodesic.jpg", "02_geodesic_subdivision.jpg", "Stage 02 — the icosahedron after one iteration of loop subdivision, approximating a geodesic sphere."],
  ["assets/img/rotegrity/ff-rotegrity-dark.jpg", "03_rotegrity_formfinding.jpg", "Stage 03 — form-finding of the Rotegrity: nexors mapped onto the subdivided icosahedron's edges."],
  ["assets/img/rotegrity/ff-rotegrity-light.jpg", "04_rotegrity_resolved.jpg", "Stage 04 — the resolved reciprocal sphere with every nexor rotated into its engaged position."],
  ["assets/img/rotegrity/components.jpg", "two_linear_components.jpg", "The two linear components (60 of each) and the assembled red/blue Rotegrity sphere they tile."],
];

const RT_DETAILS = [
  ["assets/img/rotegrity/nexor-a-red.jpg", "nexor_A_red.jpg", "Component A (red nexor) — engagement-point layout: 130.9 / 406.4 / 516.7 / 406.4 / 130.9 mm at cut angles 17.7° · 22.6° · 22.6° · 17.7°."],
  ["assets/img/rotegrity/nexor-b-blue.jpg", "nexor_B_blue.jpg", "Component B (blue nexor) — engagement-point layout: 121 / 366.3 / 452.7 / 364.9 / 108 mm at cut angles 17.2° · 18.9° · 24.6° · 11.4°."],
  ["assets/img/rotegrity/steel-spec.jpg", "st37_steel_spec.jpg", "Material: ST37-2 equal-angle steel — tensile 52–67 ksi [360–460 MPa], yield 34 ksi [235 MPa], 25% elongation, 3 mm thick at 0.889 kg/m."],
  ["assets/img/rotegrity/render-single.jpg", "rotegrity_render.jpg", "Diagram render of the assembled Rotegrity — the interlocked red/blue nexor fans reading as a woven reciprocal shell."],
];

const RT_RENDERS = [
  ["assets/img/rotegrity/render-1.jpg", "render_01_threequarter.jpg", "The completed Rotegrity in glossy black on its steel column base — three-quarter view of the full 4.5 m sphere."],
  ["assets/img/rotegrity/render-2.jpg", "render_02_threequarter.jpg", "A second three-quarter view — the interlocking nexor fans reading as a continuous woven shell."],
  ["assets/img/rotegrity/render-front.jpg", "render_front.jpg", "Front elevation — the sphere balanced on its slender column support."],
  ["assets/img/rotegrity/render-top.jpg", "render_top.jpg", "Looking up into the sphere — the reciprocal lattice and the cruciform base seen through the engagement windows."],
  ["assets/img/rotegrity/render-3.jpg", "render_detail_lattice.jpg", "Close-up of the lattice — paired nexors crossing at their engagement points, each fan opening a hexagonal window."],
  ["assets/img/rotegrity/render-4.jpg", "render_detail_joint.jpg", "Detail of the bolted crossings — where each member simply presses on the one beneath it, no special joint required."],
];

const RT_PRINCIPLES = [
  ["assets/img/rotegrity/principle-1.jpg", "01_base_hexagon.jpg", "Step 1 — the base hexagonal fan: six members meeting edge-to-edge before any rotation."],
  ["assets/img/rotegrity/principle-2.jpg", "02_rotation_begins.jpg", "Step 2 — each member begins to rotate about its centre; the regular hexagon starts to twist."],
  ["assets/img/rotegrity/principle-3.jpg", "03_engagement_opens.jpg", "Step 3 — members slide past one another and an engagement window opens at the centre."],
  ["assets/img/rotegrity/principle-4.jpg", "04_pinwheel.jpg", "Step 4 — the fan reads as a pinwheel; each member now rests on its neighbour."],
  ["assets/img/rotegrity/principle-5.jpg", "05_engagement_grows.jpg", "Step 5 — further rotation enlarges the engagement window and the reciprocal overlap."],
  ["assets/img/rotegrity/principle-6.jpg", "06_near_limit.jpg", "Step 6 — approaching the rotation limit; the central opening tightens into a small hexagon."],
  ["assets/img/rotegrity/principle-7.jpg", "07_woven_star.jpg", "Step 7 — the fully engaged fan: a woven six-point star, the repeating unit of the Rotegrity."],
  ["assets/img/rotegrity/fan-upward.png", "fan_upward.png", "A single fan in 3D, engaged upward — the members lift off the base circle as they rotate."],
  ["assets/img/rotegrity/fan-downward.png", "fan_downward.png", "The same fan engaged downward — reversing the rotation flips the dome of the fan."],
];

const RT_SUBFOLDERS = [
  { id:"boards", name:"Presentation Boards", data:RT_BOARDS,
    blurb:"The four studio panels — title, concept & form-finding, nexorade structures, and detail & parts." },
  { id:"renders", name:"Renders", data:RT_RENDERS,
    blurb:"Studio renders of the finished black sphere on its column base — full views and lattice details." },
  { id:"principles", name:"Nexorade Principles", data:RT_PRINCIPLES, video:"assets/img/rotegrity/principle.mp4",
    blurb:"How a flat hexagonal fan rotates into an engaged, self-supporting nexor unit — the move repeated across the whole sphere." },
  { id:"geometry", name:"Geometry & Form-Finding", data:RT_GEOMETRY,
    blurb:"From the Regular Icosahedron through loop subdivision to the form-found reciprocal sphere and its two components." },
  { id:"details", name:"Nexor Details & Material", data:RT_DETAILS,
    blurb:"Engagement-point layouts for both nexor components, the ST37-2 steel-angle specification, and assembly renders." },
];

/* crossed red/blue nexor folder mark */
function RtFolderIcon({ size = 44 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="nodrag">
      <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#3a6ea8" stroke="#23476f" strokeWidth="1"/>
      <path d="M4 11.5h24V26H4z" fill="#5d8fc4"/>
      <path d="M4 11.5h24v2.2H4z" fill="#7fa9d6"/>
      <g strokeLinecap="round">
        <line x1="9" y1="23" x2="22" y2="15" stroke="#e23b2e" strokeWidth="2.6"/>
        <line x1="11" y1="15" x2="23" y2="23" stroke="#1f4fd0" strokeWidth="2.6"/>
      </g>
    </svg>
  );
}
function RtFolderMini() {
  return (
    <svg viewBox="0 0 32 32" className="nodrag" style={{width:15,height:15}}>
      <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#3a6ea8" stroke="#23476f" strokeWidth="1"/>
      <path d="M4 11.5h24V26H4z" fill="#5d8fc4"/>
    </svg>
  );
}

A7.Rotegrity = ({ open }) => {
  const [view, setView] = useState7("root");
  const [box, setBox] = useState7(null);
  const current = RT_SUBFOLDERS.find(f => f.id === view);

  const Sidebar = (
    <div className="exp__side rt__side">
      <div className="exp__panel">
        <div className="exp__panelhead">File and Folder Tasks <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          {view === "root"
            ? RT_SUBFOLDERS.map(f =>
                <div className="lnk" key={f.id} onClick={()=>setView(f.id)}>{RtFolderMini()} Open {f.name}</div>)
            : <div className="lnk" onClick={()=>setView("root")}>{I7.Folder()} Back to project folder</div>}
          <div className="lnk" onClick={()=>open && open("contact")}>{I7.Mail()} E-mail the author</div>
        </div>
      </div>

      <div className="exp__panel">
        <div className="exp__panelhead">Details <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="info">
            <b>Rotegrity</b>
            Architectural design studio · Folder
            <div className="pp-meta rt-meta">
              <div className="pp-meta__k">Studio</div>
              <div className="pp-meta__v">Architectural Design Studio</div>
              <div className="pp-meta__k">University</div>
              <div className="pp-meta__v">Tabriz Islamic Arts University</div>
              <div className="pp-meta__k">Instructors</div>
              <div className="pp-meta__v">Dr. Shahbazi · Dr. Toori</div>
              <div className="pp-meta__k">System</div>
              <div className="pp-meta__v">Nexorade / reciprocal-frame sphere</div>
              <div className="pp-meta__k">Structure</div>
              <div className="pp-meta__v">4.5 m sphere · icosahedron + 1 loop subdivision · 120 nexors (60 + 60)</div>
              <div className="pp-meta__k">Material</div>
              <div className="pp-meta__v">ST37-2 steel angle · 3 mm · 0.889 kg/m</div>
              <div className="pp-meta__k">Year</div>
              <div className="pp-meta__v">2019</div>
            </div>
          </div>
        </div>
      </div>

      <div className="exp__panel">
        <div className="exp__panelhead">Other Places <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="lnk" onClick={()=>open && open("projects")}>{I7.Folder()} My Projects</div>
          <div className="lnk" onClick={()=>open && open("mycomputer")}>{I7.MyComputer()} My Computer</div>
        </div>
      </div>
    </div>
  );

  const Root = (
    <div className="exp__main xp-scroll pp rotegrity">
      <div className="pp-addr"><span className="pp-addr__ico">{I7.Folder()}</span>
        <span>My Projects</span><span className="pp-addr__sep">›</span>
        <b>Rotegrity</b></div>

      <div className="rt-banner">
        <span className="rt-banner__tag">Nexorade · Reciprocal-Frame Sphere</span>
        A 4.5 m self-supporting sphere woven from 120 steel nexors — no special joints, no heavy machinery.
      </div>

      <div className="pp-hero plate rt-hero">
        <video src="assets/img/rotegrity/hero.mp4" autoPlay loop muted playsInline poster="assets/img/rotegrity/hero.jpg"></video>
      </div>
      <div className="ds-cap" style={{marginBottom:18}}>The Rotegrity in rotation — a reciprocal-frame (nexorade) sphere in which each member rests on the next, the two colour-coded component families interlocking into a stable shell.</div>

      <div className="exp__grouphdr">Document</div>
      <div className="pp-readme">
        <div className="pp-readme__bar">{I7.Notepad()}<b>README.txt</b><span className="pp-readme__meta">Notepad — project brief</span></div>
        <div className="pp-readme__body xp-scroll">
          <div className="pp-readme__title">Rotegrity<br/>A Nexorade Sphere</div>
          <p>{RT_INTRO}</p>
          <p style={{marginTop:12}}>{RT_BODY}</p>
        </div>
      </div>

      <div className="exp__grouphdr" style={{marginTop:18}}>Anatomy of a Nexor</div>
      <div className="rt-gloss">
        {RT_GLOSSARY.map(([t,d])=>(
          <div className="rt-gloss__row" key={t}>
            <div className="rt-gloss__k">{t}</div>
            <div className="rt-gloss__v">{d}</div>
          </div>
        ))}
      </div>

      <div className="pp-actions" style={{marginTop:16}}>
        <button className="xp-btn pp-btn rt-btn" onClick={()=>setView("boards")}>
          {RtFolderMini()} Open the Presentation Boards
        </button>
      </div>

      <div className="exp__grouphdr" style={{marginTop:18}}>Folders — media galleries</div>
      {RT_SUBFOLDERS.map(f => (
        <div className="pp-folder rt-folder" key={f.id} onClick={()=>setView(f.id)} title={"Open " + f.name}>
          <RtFolderIcon size={44}/>
          <div className="pp-folder__t"><b>{f.name}</b>
            <small>{f.blurb} — {f.data.length} items</small></div>
          <span className="pp-folder__chev">›</span>
        </div>
      ))}
    </div>
  );

  const Gallery = current && (
    <div className="exp__main xp-scroll pp rotegrity">
      <div className="pp-addr">
        <span className="pp-addr__ico">{I7.Folder()}</span>
        <span className="pp-addr__link" onClick={()=>setView("root")}>Rotegrity</span>
        <span className="pp-addr__sep">›</span><b>{current.name}</b>
        <button className="xp-btn pp-up" onClick={()=>setView("root")}>‹ Up</button>
      </div>
      <p className="ds-cap" style={{marginBottom:14}}>{current.blurb}</p>
      {current.video && (
        <div className="rt-vid">
          <div className="rt-vid__bar">{I7.Notepad ? null : null}<b>nexorade_rotation.mp4</b><span className="rt-vid__meta">Animation — flat fan → engaged nexor unit</span></div>
          <video src={current.video} controls autoPlay loop muted playsInline></video>
        </div>
      )}
      <div className={"pp-gallery" + (current.id === "boards" ? " rt-gallery--boards" : "") + (current.id === "principles" ? " rt-gallery--principles" : "")}>
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
    <div className="exp xp-scroll pp-root rt-root" style={{gridTemplateColumns:"210px 1fr"}}>
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
