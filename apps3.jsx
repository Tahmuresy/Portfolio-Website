/* apps3.jsx — window CONTENT: Robotic Pick & Place project folder.
   A navigable XP "Web View" folder: README abstract, ResearchGate link,
   demo videos (click-to-play), and a Design Files subfolder gallery.
   Exported to window.Apps.PickPlace. */
const { useState: useState3 } = React;
window.Apps = window.Apps || {};
const A3 = window.Apps;
const I3 = window.Icons;

const PP_ABSTRACT = "Robotic pick-and-place (P&P) has been widely utilized in manufacturing and architectural construction since the 1980s. However, the lack of inherent sensing capabilities in robots has limited their ability to adapt and respond to changes in design or environment. To address some of these shortcomings, this paper proposes an interactive robotic brick-laying workflow using a vision-based sensing framework to inform and optimize brick placements in consecutive layers. The proposed implementation is comprised of three major computational frameworks: (1) digitally reconstructing and analyzing the current state of the assembly, (2) optimizing placement targets based on the digital representation of the environment and desired multi-objective optimization goals, and (3) planning robot motion for the next layer of brick-laying. Within this workflow, the vision-based feedback pipeline simultaneously reconstructs and localizes the already-built assembly. This geometric information constitutes the basis for the multi-objective optimization stage. The placement targets are adaptively calculated to build the next layer upon the existing assembly while optimizing for structural stability, accounting for unforeseen deviations between layers, and allowing for human intervention and modification throughout the process. By proposing an interactive robotic brick-laying workflow, the paper explores the prospects for leveraging the capabilities of robotic pick-and-place technology and integrating it with vision-based sensing frameworks to achieve optimal results in construction. Furthermore, by examining the effectiveness of a multi-objective optimization method as an adaptive design driver, this paper contributes to the development of novel computational strategies that can enhance the flexibility and adaptability of robotic construction systems.";

const PP_RG_URL = "https://www.researchgate.net/publication/373996523_Layer-by-Layer_Pick_and_Place_Collaboration_Between_Human_and_Robot_Using_Optimization";

const PP_VIDEOS = [
  { id:"v1", file:"Arch RoboFab — First try", embed:"https://www.youtube.com/embed/k_U8fJDwgCQ", poster:"assets/img/pp-hero.jpg", note:"Initial human–robot collaborative assembly run" },
  { id:"v2", file:"Arch RoboFab — Final try", embed:"https://www.youtube.com/embed/BlSrHNJUOhc", poster:"assets/img/pp-optimized.jpg", note:"Final optimized layer-by-layer brick-laying" },
];

const PP_DESIGN = [
  ["assets/img/pp-workflow.jpg", "cyber_physical_workflow.png", "System architecture — the three computational frameworks: computer vision, multi-objective optimization, and robot motion planning."],
  ["assets/img/pp-endeffector.jpg", "end_effector_kinect.png", "Custom end-effector: tool gripper + Kinect v2 RGBD camera as one integrated tool on the ABB 2400."],
  ["assets/img/pp-clustering.jpg", "point_clustering.png", "Point clustering and boundary extraction for an accurate representation of the already-built assembly."],
  ["assets/img/pp-colorcluster.jpg", "color_cluster_diff.png", "Color-clustering image and the difference between DSLR camera image and reconstructed point cloud."],
  ["assets/img/pp-opencv.jpg", "opencv_lighting.png", "OpenCV image processing tested across room, vertical, and point-light conditions for robust localization."],
  ["assets/img/pp-hrc-sequence.jpg", "hrc_sequence.png", "The sequence of human–robot collaboration: alternating robot-placed and human-placed layers."],
  ["assets/img/pp-optimized.jpg", "optimized_sequence.png", "Optimized brick-laying — maximizing overlay with the supporting layer and brick alignment as two objectives."],
  ["assets/img/pp-wall-spline.jpg", "wall_spline_opening.png", "Wall scenario: a spline base layer with an integrated opening."],
  ["assets/img/pp-dome.jpg", "dome_deviation.png", "Dome scenario built with an intentional deviation to test adaptive correction."],
  ["assets/img/pp-build-1.jpg", "build_photo_01.jpg", "Fabrication session — ABB 2400 with the wood-block assembly in progress."],
  ["assets/img/pp-build-2.jpg", "build_photo_02.jpg", "Built reciprocal arch resting on the robot end-effector platform."],
];

function PpFolderIcon({ size = 32 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="nodrag">
      <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#f6c14e" stroke="#b78a1e" strokeWidth="1"/>
      <path d="M4 11.5h24V26H4z" fill="#ffd873"/>
      <path d="M4 8h8l2.4 2.6H28" fill="none" stroke="#fff" strokeWidth=".8" opacity=".5"/>
    </svg>
  );
}

A3.PickPlace = ({ open }) => {
  const [view, setView] = useState3("root");
  const [playing, setPlaying] = useState3({});
  const [box, setBox] = useState3(null);

  const Sidebar = (
    <div className="exp__side">
      <div className="exp__panel">
        <div className="exp__panelhead">File and Folder Tasks <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          {view === "design"
            ? <div className="lnk" onClick={()=>setView("root")}>{I3.Folder()} Back to project folder</div>
            : <div className="lnk" onClick={()=>setView("design")}>{I3.Folder()} Open Design Files</div>}
          <div className="lnk" onClick={()=>window.open(PP_RG_URL, "_blank")}>{I3.Globe()} View on ResearchGate</div>
          <div className="lnk" onClick={()=>open && open("contact")}>{I3.Mail()} E-mail the author</div>
        </div>
      </div>
      <div className="exp__panel">
        <div className="exp__panelhead">Details <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="info">
            <b>Robotic Pick &amp; Place</b>
            Research project · Folder
            <div className="pp-meta">
              <div className="pp-meta__k">Authors</div>
              <div className="pp-meta__v">Tahmures Ghiyasi, Seyed Hossein Zargar, Ali Baghi</div>
              <div className="pp-meta__k">Tech stack</div>
              <div className="pp-meta__v">Grasshopper, Python, OpenCV, Kinect V2, ABB 2400</div>
              <div className="pp-meta__k">Publication</div>
              <div className="pp-meta__v">eCAADe 41 (2023)</div>
            </div>
          </div>
        </div>
      </div>
      <div className="exp__panel">
        <div className="exp__panelhead">Other Places <span className="chev">▴</span></div>
        <div className="exp__panelbody">
          <div className="lnk" onClick={()=>open && open("projects")}>{I3.Folder()} My Projects</div>
          <div className="lnk" onClick={()=>open && open("mycomputer")}>{I3.MyComputer()} My Computer</div>
        </div>
      </div>
    </div>
  );

  const Root = (
    <div className="exp__main xp-scroll pp">
      <div className="pp-addr"><span className="pp-addr__ico">{I3.Folder()}</span>
        <span>My Projects</span><span className="pp-addr__sep">›</span>
        <b>Robotic Pick &amp; Place</b></div>

      <div className="pp-hero plate">
        <img src="assets/img/pp-hero.jpg" alt="Robot-built wood-block wall"/>
      </div>
      <div className="ds-cap" style={{marginBottom:18}}>Robot-assembled reciprocal wall built layer-by-layer with vision-guided, optimized brick placement. ABB 2400 · Kinect v2.</div>

      <div className="exp__grouphdr">Document</div>
      <div className="pp-readme">
        <div className="pp-readme__bar">{I3.Notepad()}<b>README.txt</b><span className="pp-readme__meta">Notepad — abstract</span></div>
        <div className="pp-readme__body xp-scroll">
          <div className="pp-readme__title">Layer-by-Layer Pick and Place Collaboration<br/>Between Human and Robot Using Optimization</div>
          <p>{PP_ABSTRACT}</p>
        </div>
      </div>

      <div className="pp-actions">
        <button className="xp-btn pp-btn" onClick={()=>window.open(PP_RG_URL, "_blank")}>
          {I3.Globe()} Read Full Paper on ResearchGate
        </button>
      </div>

      <div className="exp__grouphdr" style={{marginTop:18}}>Media — demonstration videos</div>
      <div className="pp-videos">
        {PP_VIDEOS.map(v => (
          <div className="pp-video" key={v.id}>
            <div className="pp-video__frame">
              {playing[v.id]
                ? <iframe src={v.embed + "?autoplay=1&rel=0"} title={v.file}
                    frameBorder="0" allow="autoplay; encrypted-media; fullscreen" allowFullScreen></iframe>
                : <button className="pp-video__poster" onClick={()=>setPlaying(p=>({...p,[v.id]:true}))}
                    style={{backgroundImage:`url(${v.poster})`}} aria-label={"Play "+v.file}>
                    <span className="pp-video__play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#fff"/></svg></span>
                  </button>}
            </div>
            <div className="pp-video__cap">
              <span className="pp-file">{I3.Run ? null : null}<b>{v.file}</b></span>
              <span className="pp-video__note">{v.note}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="exp__grouphdr" style={{marginTop:18}}>Folders</div>
      <div className="pp-folder" onClick={()=>setView("design")} title="Open Design Files">
        <PpFolderIcon size={44}/>
        <div className="pp-folder__t"><b>Design Files</b>
          <small>System diagrams · CV studies · process documentation — {PP_DESIGN.length} items</small></div>
        <span className="pp-folder__chev">›</span>
      </div>
    </div>
  );

  const Design = (
    <div className="exp__main xp-scroll pp">
      <div className="pp-addr">
        <span className="pp-addr__ico">{I3.Folder()}</span>
        <span className="pp-addr__link" onClick={()=>setView("root")}>Robotic Pick &amp; Place</span>
        <span className="pp-addr__sep">›</span><b>Design Files</b>
        <button className="xp-btn pp-up" onClick={()=>setView("root")}>‹ Up</button>
      </div>
      <p className="ds-cap" style={{marginBottom:14}}>System-architecture diagrams, computer-vision studies, and process documentation.
        Grasshopper definitions and Kinect point-cloud GIFs drop in here next.</p>
      <div className="pp-gallery">
        {PP_DESIGN.map((g,i)=>(
          <figure className="pp-tile" key={i} onClick={()=>setBox(g)}>
            <div className="pp-tile__img"><img src={g[0]} alt={g[2]} loading="lazy"/></div>
            <figcaption className="pp-tile__cap">{g[1]}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );

  return (
    <div className="exp xp-scroll pp-root" style={{gridTemplateColumns:"186px 1fr"}}>
      {Sidebar}
      {view === "design" ? Design : Root}
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
