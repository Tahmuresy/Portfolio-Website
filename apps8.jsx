/* apps8.jsx — window CONTENT: Tabriz Audio Arts Center
   (Tabriz Islamic Arts University, 2017).
   A navigable XP "Web View" folder for an architectural design-studio project:
   README brief, a structured metadata block, a looping hero film, and media
   galleries (renders, form-finding diagrams, drawings). A teal accent brands
   it apart from the steel-blue Rotegrity studio folder.
   Exported to window.Apps.TabrizAudio. */
const { useState: useState8 } = React;
window.Apps = window.Apps || {};
const A8 = window.Apps;
const I8 = window.Icons;

const TZ_INTRO = "In designing the Tabriz Audio Arts Center, spaces with different qualities of listening and hearing were needed in order to accompany audiences through these experiences. A sense of dynamism in Iranian classical music is an important and inevitable part of that experience.";

const TZ_BODY = "The proposed architectural form of several domino-shaped boxes was developed to help form a sense of spatial dynamics. Each of these boxes is held by an integrated tubular lamella structure and encompasses a multi-level architectural space that relies on a reinforced-concrete frame. The boxes also hold the acrylic / Plexiglass sheeting plates suggested as the cover material. By using a fabric structure for periods when the weather is good, the building can open outdoor gallery spaces and perform music at the same time without interfering with the function of the interior space. For the final presentation, the Unity engine displayed the 3D model through AR technology, leading to a better understanding of the architectural design.";

const TZ_RENDERS = [
  ["assets/img/tabriz/render-1.jpg", "render_01_front.jpg", "Front view — the white tensile sails sweep down from the lamella-clad boxes to a meadow of slender column stubs."],
  ["assets/img/tabriz/render-2.jpg", "render_02_threequarter.jpg", "Three-quarter view across the meadow — the domino boxes emerging from the fabric landscape, the bermed hill folding behind."],
  ["assets/img/tabriz/render-3.jpg", "render_03_boxes.jpg", "The lamella-clad acoustic boxes lifted on slender columns, the tensile fabric peeling back toward the green hill."],
  ["assets/img/tabriz/render-4.jpg", "render_04_elevation.jpg", "Side view — the fabric canopy reads as a continuous range of peaks rising over the glazed concert halls."],
  ["assets/img/tabriz/render-5.jpg", "render_05_aerial.jpg", "Aerial view — the center set into the landscape beside a stepped outdoor amphitheatre carved into the slope."],
  ["assets/img/tabriz/render-6.jpg", "render_06_canopy.jpg", "Beneath the canopy — the glazed lamella facade and the underside of the tensile roof draping toward the meadow."],
];

const TZ_PROCESS = [
  ["assets/img/tabriz/diagram-1.jpg", "01_lamella_members.jpg", "Tubular lamella members rising from the base slab — the first move of the integrated structure."],
  ["assets/img/tabriz/diagram-2.jpg", "02_tubular_frame.jpg", "The integrated tubular lamella structure (highlighted red) braced into a regular bay grid."],
  ["assets/img/tabriz/diagram-3.jpg", "03_concrete_frame.jpg", "The reinforced-concrete frame carrying the multi-level floor plates of each box."],
  ["assets/img/tabriz/diagram-4.jpg", "04_circulation.jpg", "Vertical circulation and the movement of sound studied through the section (blue)."],
  ["assets/img/tabriz/diagram-5.jpg", "05_domino_boxes.jpg", "The domino-shaped boxes massed over the structure — each a distinct listening volume."],
  ["assets/img/tabriz/diagram-6.jpg", "06_lamella_mesh.jpg", "The boxes wrapped in their lamella mesh enclosure, holding the acrylic cover plates."],
  ["assets/img/tabriz/diagram-7.jpg", "07_fabric_canopy.jpg", "Form-finding the tensile fabric canopy that drapes between and over the boxes."],
  ["assets/img/tabriz/diagram-8.jpg", "08_assembly.jpg", "The fabric canopy with the boxes — the layered system read as an exploded assembly."],
];

const TZ_DRAWINGS = [
  ["assets/img/tabriz/plans.png", "floor_plans.png", "Floor plans — Ground, First, Second and Third levels, the long domino bays threaded by performance and gallery spaces."],
  ["assets/img/tabriz/sections.jpg", "sections_A_B.jpg", "Sections A and B with the site key plan — the tubular lamella towers rising inside the draped fabric envelope."],
];

const TZ_SUBFOLDERS = [
  { id:"renders", name:"Renders", data:TZ_RENDERS,
    blurb:"Final renders of the center in its meadow — fabric sails, lamella-clad boxes, and the amphitheatre landscape." },
  { id:"process", name:"Form-Finding & Structure", data:TZ_PROCESS,
    blurb:"From the tubular lamella members and concrete frame to the domino boxes, their mesh enclosure, and the tensile canopy." },
  { id:"drawings", name:"Plans & Sections", data:TZ_DRAWINGS,
    blurb:"The four-level floor plans and the two building sections with the site key plan." },
];

/* domino-box + sound-wave folder mark, teal */
function TzFolderIcon({ size = 44 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="nodrag">
      <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#1f7d86" stroke="#125159" strokeWidth="1"/>
      <path d="M4 11.5h24V26H4z" fill="#3aa3ad"/>
      <path d="M4 11.5h24v2.2H4z" fill="#5cc0c9"/>
      <g strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M8 19h2l1.5-3 2 6 1.5-4 1.5 2H20" stroke="#eafcff"/>
      </g>
    </svg>
  );
}
function TzFolderMini() {
  return (
    <svg viewBox="0 0 32 32" className="nodrag" style={{width:15,height:15}}>
      <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#1f7d86" stroke="#125159" strokeWidth="1"/>
      <path d="M4 11.5h24V26H4z" fill="#3aa3ad"/>
    </svg>
  );
}

A8.TabrizAudio = ({ open }) => {
  const [view, setView] = useState8("root");
  const [box, setBox] = useState8(null);
  const current = TZ_SUBFOLDERS.find(f => f.id === view);

  const Sidebar = (
    <div className="exp__side tz__side">
      <div className="exp__panel">
        <div className="exp__panelhead">File and Folder Tasks <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          {view === "root"
            ? TZ_SUBFOLDERS.map(f =>
                <div className="lnk" key={f.id} onClick={()=>setView(f.id)}>{TzFolderMini()} Open {f.name}</div>)
            : <div className="lnk" onClick={()=>setView("root")}>{I8.Folder()} Back to project folder</div>}
          <div className="lnk" onClick={()=>open && open("contact")}>{I8.Mail()} E-mail the author</div>
        </div>
      </div>

      <div className="exp__panel">
        <div className="exp__panelhead">Details <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="info">
            <b>Tabriz Audio Arts Center</b>
            Architectural design studio · Folder
            <div className="pp-meta tz-meta">
              <div className="pp-meta__k">Studio</div>
              <div className="pp-meta__v">Architectural Design Studio</div>
              <div className="pp-meta__k">University</div>
              <div className="pp-meta__v">Tabriz Islamic Arts University</div>
              <div className="pp-meta__k">Program</div>
              <div className="pp-meta__v">Audio arts center · concert &amp; gallery</div>
              <div className="pp-meta__k">Structure</div>
              <div className="pp-meta__v">Integrated tubular lamella · reinforced-concrete frame</div>
              <div className="pp-meta__k">Envelope</div>
              <div className="pp-meta__v">Acrylic / Plexiglass plates · tensile fabric canopy</div>
              <div className="pp-meta__k">Presentation</div>
              <div className="pp-meta__v">Unity · AR walkthrough</div>
              <div className="pp-meta__k">Year</div>
              <div className="pp-meta__v">2017</div>
            </div>
          </div>
        </div>
      </div>

      <div className="exp__panel">
        <div className="exp__panelhead">Other Places <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="lnk" onClick={()=>open && open("projects")}>{I8.Folder()} My Projects</div>
          <div className="lnk" onClick={()=>open && open("mycomputer")}>{I8.MyComputer()} My Computer</div>
        </div>
      </div>
    </div>
  );

  const Root = (
    <div className="exp__main xp-scroll pp tabriz">
      <div className="pp-addr"><span className="pp-addr__ico">{I8.Folder()}</span>
        <span>My Projects</span><span className="pp-addr__sep">›</span>
        <b>Tabriz Audio Arts Center</b></div>

      <div className="tz-banner">
        <span className="tz-banner__tag">Audio Arts Center · Tensile + Lamella · 2017</span>
        Domino-shaped boxes of sound, lifted on a tubular lamella structure and draped in a tensile fabric that opens to the landscape.
      </div>

      <div className="pp-hero plate tz-hero">
        <video src="assets/img/tabriz/hero.mp4" autoPlay loop muted playsInline poster="assets/img/tabriz/render-1.jpg"></video>
      </div>
      <div className="ds-cap" style={{marginBottom:18}}>The Tabriz Audio Arts Center — the domino-box halls emerging from a continuous tensile fabric landscape, presented as a real-time AR walkthrough built in Unity.</div>

      <div className="exp__grouphdr">Document</div>
      <div className="pp-readme">
        <div className="pp-readme__bar">{I8.Notepad()}<b>README.txt</b><span className="pp-readme__meta">Notepad — project brief</span></div>
        <div className="pp-readme__body xp-scroll">
          <div className="pp-readme__title">Tabriz Audio Arts Center<br/>Spaces for listening</div>
          <p>{TZ_INTRO}</p>
          <p style={{marginTop:12}}>{TZ_BODY}</p>
        </div>
      </div>

      <div className="pp-actions" style={{marginTop:16}}>
        <button className="xp-btn pp-btn tz-btn" onClick={()=>setView("renders")}>
          {TzFolderMini()} Open the Renders
        </button>
      </div>

      <div className="exp__grouphdr" style={{marginTop:18}}>Folders — media galleries</div>
      {TZ_SUBFOLDERS.map(f => (
        <div className="pp-folder tz-folder" key={f.id} onClick={()=>setView(f.id)} title={"Open " + f.name}>
          <TzFolderIcon size={44}/>
          <div className="pp-folder__t"><b>{f.name}</b>
            <small>{f.blurb} — {f.data.length} items</small></div>
          <span className="pp-folder__chev">›</span>
        </div>
      ))}
    </div>
  );

  const Gallery = current && (
    <div className="exp__main xp-scroll pp tabriz">
      <div className="pp-addr">
        <span className="pp-addr__ico">{I8.Folder()}</span>
        <span className="pp-addr__link" onClick={()=>setView("root")}>Tabriz Audio Arts Center</span>
        <span className="pp-addr__sep">›</span><b>{current.name}</b>
        <button className="xp-btn pp-up" onClick={()=>setView("root")}>‹ Up</button>
      </div>
      <p className="ds-cap" style={{marginBottom:14}}>{current.blurb}</p>
      <div className={"pp-gallery" + (current.id === "renders" ? " tz-gallery--renders" : "") + (current.id === "drawings" ? " tz-gallery--drawings" : "")}>
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
    <div className="exp xp-scroll pp-root tz-root" style={{gridTemplateColumns:"210px 1fr"}}>
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
