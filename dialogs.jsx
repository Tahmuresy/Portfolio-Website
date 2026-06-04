/* dialogs.jsx — decoy software launchers that throw famous/funny XP error
   dialogs instead of opening. window.Dialogs = { APPS, DEFS, Launcher, ErrorIcon }. */
const { useState: udS, useEffect: udE, useRef: udR } = React;

/* ---- error-box icons ---------------------------------------------- */
function ErrorIcon({ type }) {
  if (type === "warning") return (
    <svg viewBox="0 0 32 32" width="32" height="32"><path d="M16 3l13 25H3z" fill="#ffd23a" stroke="#caa61c" strokeWidth="1"/><path d="M16 12v9" stroke="#231F20" strokeWidth="3" strokeLinecap="round"/><circle cx="16" cy="25" r="1.8" fill="#231F20"/></svg>
  );
  if (type === "info") return (
    <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="13" fill="#2f7fe0" stroke="#1a5fb8" strokeWidth="1"/><circle cx="16" cy="9.5" r="2" fill="#fff"/><path d="M16 14v9" stroke="#fff" strokeWidth="3.4" strokeLinecap="round"/></svg>
  );
  return ( // error
    <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="13" fill="#e23a2e" stroke="#a82016" strokeWidth="1"/><path d="M11 11l10 10M21 11l-10 10" stroke="#fff" strokeWidth="3.4" strokeLinecap="round"/></svg>
  );
}

/* ---- launchable decoy apps ---------------------------------------- */
const APPS = {
  photoshop: { label:"Adobe Photoshop CS4", img:"assets/img/app-photoshop.png",
    splash:{ name:"Adobe Photoshop CS4", sub:"Initializing scratch disks…", ms:1600 }, start:"ps" },
  rhino: { label:"Rhinoceros 5", img:"assets/img/app-rhino.png",
    splash:{ name:"Rhinoceros 5", sub:"Validating license…", ms:1500 }, start:"rhino" },
  autocad: { label:"AutoCAD 2012", img:"assets/img/app-autocad.png",
    splash:null, start:"acad" },
  revit: { label:"Autodesk Revit 2017", img:"assets/img/app-revit.png",
    splash:{ name:"Autodesk Revit 2017", sub:"Loading 14,892 warnings…", ms:2100 }, start:"revit" },
  steam: { label:"Steam", img:"assets/img/ic-steam.svg",
    splash:{ name:"Steam", sub:"Updating Steam (1 of 1,247 files)…", ms:1900 }, start:"steam" },
  dota2: { label:"Dota 2", img:"assets/img/ic-dota2.png",
    splash:{ name:"Dota 2", sub:"Preparing to launch · Reborn build…", ms:1700 }, start:"dota2" },
  cs16: { label:"Counter-Strike 1.6", img:"assets/img/ic-cs-new.png",
    splash:{ name:"Counter-Strike 1.6", sub:"Connecting to WON master server…", ms:1700 }, start:"cs16" },
  illustrator: { label:"Adobe Illustrator CS6", img:"assets/img/app-illustrator.png",
    splash:{ name:"Adobe Illustrator CS6", sub:"Reticulating Bézier splines…", ms:1600 }, start:"ai" },
  sketchup: { label:"SketchUp Pro 2015", img:"assets/img/app-sketchup.png",
    splash:{ name:"SketchUp Pro 2015", sub:"Loading 3D Warehouse…", ms:1500 }, start:"su" },
  lumion: { label:"Lumion 6", img:"assets/img/app-lumion.png",
    splash:{ name:"Lumion 6", sub:"Detecting graphics card…", ms:2000 }, start:"lum" },
  max3ds: { label:"Autodesk 3ds Max 2014", img:"assets/img/app-3dsmax.png",
    splash:{ name:"Autodesk 3ds Max 2014", sub:"Loading plugins (1 of 412)…", ms:2100 }, start:"max" },
  keyshot: { label:"KeyShot 6", img:"assets/img/app-keyshot.jpg",
    splash:{ name:"KeyShot 6", sub:"Warming up the ray tracer…", ms:1500 }, start:"ks" },
};

/* ---- dialog definitions ------------------------------------------- */
const DEFS = {
  ps: { title:"Adobe Photoshop", img:"assets/img/app-photoshop.png", type:"error",
    msg:["Could not complete your request because the scratch disks are full.","",
         "Space occupied by: Untitled-1.psd, Untitled-final.psd, Untitled-final-FINAL.psd and Untitled-final-FINAL-v3-USE-THIS-ONE.psd."],
    btns:[{ label:"OK", act:"close" }] },

  rhino: { title:"Rhinoceros — License Required", img:"assets/img/app-rhino.png", type:"warning",
    msg:["This evaluation copy has reached its save limit (25 of 25 saves used).","",
         "Enter your license key to continue:"],
    serial:"RH50-XXXX-XXXX-XXXX",
    btns:[{ label:"Validate", act:"rhino2" },{ label:"Cancel", act:"close" }] },
  rhino2: { title:"Rhinoceros — License Error", img:"assets/img/app-rhino.png", type:"error",
    msg:["That license key belongs to your former advisor.","",
         "Nice try. The rhino remembers everything."],
    btns:[{ label:"OK", act:"close" }] },

  acad: { title:"AutoCAD Error Aborting", img:"assets/img/app-autocad.png", type:"error",
    msg:["FATAL ERROR: Unhandled Access Violation Reading 0x0000 Exception at 4d9f3a2h.","",
         "The application will now close. Unsaved changes to Drawing1.dwg have been recovered."],
    btns:[{ label:"OK", act:"acad2" }] },
  acad2: { title:"AutoCAD — Drawing Recovery", img:"assets/img/app-autocad.png", type:"warning",
    msg:["The recovery file Drawing1_recover.dwg is also corrupt.","",
         "Have you considered saving more than once every six hours?"],
    btns:[{ label:"OK", act:"close" }] },

  revit: { title:"Autodesk Revit", img:"assets/img/app-revit.png", type:"warning",
    msg:["Warning 1 of 14,892:","Highlighted elements are joined but do not intersect.","",
         "Would you like to review the remaining 14,891 warnings now?"],
    btns:[{ label:"Yes", act:"revit2" },{ label:"No", act:"revit3" }] },
  revit2: { title:"Autodesk Revit", img:"assets/img/app-revit.png", type:"info",
    msg:["Reviewing warnings…","",
         "Just kidding — nobody has ever reviewed all the warnings. Be free."],
    btns:[{ label:"OK", act:"close" }] },
  revit3: { title:"Autodesk Revit", img:"assets/img/app-revit.png", type:"info",
    msg:["Wise choice.","",
         "The model will keep accumulating warnings silently, as is tradition."],
    btns:[{ label:"OK", act:"close" }] },

  steam: { title:"Steam", img:"assets/img/ic-steam-new.webp", type:"info",
    msg:["Steam must install 1 update before you can play.","",
         "Estimated time remaining: 6 hours.",
         "(It will say this for the entire 6 hours.)"],
    btns:[{ label:"Update", act:"steam2" },{ label:"Later", act:"close" }] },
  steam2: { title:"Steam — Library", img:"assets/img/ic-steam-new.webp", type:"warning",
    msg:["You own 312 games. You have played 11.","",
         "The Steam Summer Sale starts in 3 days. Please prepare your wallet."],
    btns:[{ label:"OK", act:"close" }] },

  dota2: { title:"Dota 2", img:"assets/img/ic-dota2.png", type:"warning",
    msg:["You have been placed in the low-priority queue.","",
         "Reason: a teammate from 2014 is still reporting you.",
         "Estimated wait: 24 minutes. Estimated regret: immediate."],
    btns:[{ label:"Find Match", act:"dota2b" },{ label:"Cancel", act:"close" }] },
  dota2b: { title:"Dota 2", img:"assets/img/ic-dota2.png", type:"info",
    msg:["Match found. Your team has already started arguing.","",
         "It is 09:00 in-game and someone typed \"gg\"."],
    btns:[{ label:"OK", act:"close" }] },

  cs16: { title:"Counter-Strike 1.6", img:"assets/img/ic-cs-new.png", type:"error",
    msg:["WON authentication failed.","",
         "The WON master servers were shut down in 2004.",
         "Some things are better left in 2003. gg."],
    btns:[{ label:"Retry", act:"cs16b" },{ label:"Disconnect", act:"close" }] },
  cs16b: { title:"Counter-Strike 1.6 — Console", img:"assets/img/ic-cs-new.png", type:"info",
    msg:["] sv_cheats 1","] noclip","",
         "Nostalgia enabled. You can stop running now — the bomb was defused years ago."],
    btns:[{ label:"OK", act:"close" }] },

  ai: { title:"Adobe Illustrator", img:"assets/img/app-illustrator.png", type:"error",
    msg:["Can't open the illustration. The file is locked, or you do not have permission.","",
         "It was last saved as Logo_FINAL_v7_actuallyfinal_USE-THIS.ai."],
    btns:[{ label:"OK", act:"ai2" }] },
  ai2: { title:"Adobe Illustrator", img:"assets/img/app-illustrator.png", type:"warning",
    msg:["The font 'Helvetica Neue' is missing and has been replaced with Myriad.","",
         "Your kerning will never be the same."],
    btns:[{ label:"OK", act:"close" }] },

  su: { title:"SketchUp", img:"assets/img/app-sketchup.png", type:"warning",
    msg:["This model contains 1,284,991 edges.","",
         "SketchUp may become unresponsive. Have you tried making a component?"],
    btns:[{ label:"Purge Unused", act:"su2" },{ label:"Cancel", act:"close" }] },
  su2: { title:"SketchUp", img:"assets/img/app-sketchup.png", type:"info",
    msg:["Purged 0 unused components.","",
         "The lag is coming from inside the house."],
    btns:[{ label:"OK", act:"close" }] },

  lum: { title:"Lumion", img:"assets/img/app-lumion.png", type:"error",
    msg:["Your graphics card does not meet the minimum requirements.","",
         "Required: a GPU from the future. Detected: integrated Intel."],
    btns:[{ label:"Continue Anyway", act:"lum2" },{ label:"Quit", act:"close" }] },
  lum2: { title:"Lumion", img:"assets/img/app-lumion.png", type:"warning",
    msg:["Rendering at 0.4 fps.","",
         "Each tree you placed is individually judging your laptop."],
    btns:[{ label:"OK", act:"close" }] },

  max: { title:"3ds Max", img:"assets/img/app-3dsmax.png", type:"error",
    msg:["A fatal error has occurred and the application will now close.","",
         "Your autoback file is from 47 minutes ago. Good luck."],
    btns:[{ label:"OK", act:"max2" }] },
  max2: { title:"3ds Max", img:"assets/img/app-3dsmax.png", type:"warning",
    msg:["Recovered scene contains 3 missing maps and 1 haunted spline.","",
         "Reset XForm and never speak of this again."],
    btns:[{ label:"OK", act:"close" }] },

  ks: { title:"KeyShot", img:"assets/img/app-keyshot.jpg", type:"info",
    msg:["Real-time rendering is ready.","",
         "Your scene is beautiful. Your deadline was yesterday."],
    btns:[{ label:"Render", act:"ks2" },{ label:"Cancel", act:"close" }] },
  ks2: { title:"KeyShot", img:"assets/img/app-keyshot.jpg", type:"warning",
    msg:["Rendering at 4000 samples…","",
         "The chrome looks perfect. Nobody will notice it for 0.2 seconds in the final video."],
    btns:[{ label:"OK", act:"close" }] },
};

/* ---- splash (brief loading box) ----------------------------------- */
function Splash({ app, x, y, z, onFocus }) {
  return (
    <div className="splash" style={{ left:x, top:y, zIndex:z }} onPointerDown={onFocus}>
      <img className="splash__logo" src={app.img} alt=""/>
      <div className="splash__name">{app.name}</div>
      <div className="splash__sub">{app.sub}</div>
      <div className="splash__bar"><i></i></div>
    </div>
  );
}

/* ---- one launch instance: splash → dialog (with chaining) --------- */
function Launcher({ appId, x:ix, y:iy, z, onClose, onFocus }) {
  const app = APPS[appId];
  const [stage, setStage] = udS(app.splash ? "splash" : "dialog");
  const [curId, setCurId] = udS(app.start);
  const [serial, setSerial] = udS("");
  const ref = udR(null);
  const drag = udR(null);
  const [pos, setPos] = udS({ x:ix, y:iy });

  udE(() => {
    if (stage !== "splash") return;
    const id = setTimeout(() => setStage("dialog"), app.splash.ms);
    return () => clearTimeout(id);
  }, [stage]);

  if (stage === "splash") {
    return <Splash app={{ ...app.splash, img:app.img }} x={pos.x+30} y={pos.y+20} z={z} onFocus={onFocus}/>;
  }

  const def = DEFS[curId];
  const onTitleDown = (e) => {
    if (e.target.closest(".tbtn")) return;
    onFocus();
    const r = ref.current.getBoundingClientRect();
    drag.current = { dx:e.clientX - r.left, dy:e.clientY - r.top };
    const mv = (ev) => setPos({ x:Math.max(0,ev.clientX-drag.current.dx), y:Math.max(0,ev.clientY-drag.current.dy) });
    const up = () => { window.removeEventListener("pointermove",mv); window.removeEventListener("pointerup",up); };
    window.addEventListener("pointermove",mv); window.addEventListener("pointerup",up);
  };
  const click = (act) => { if (act === "close") onClose(); else { setCurId(act); setSerial(""); } };

  return (
    <div className="dlg" ref={ref} style={{ left:pos.x, top:pos.y, zIndex:z }} onPointerDown={onFocus}>
      <div className="win__titlebar" onPointerDown={onTitleDown}>
        <span className="win__icon"><img src={def.img} alt="" style={{width:16,height:16,objectFit:"contain"}}/></span>
        <span className="win__title">{def.title}</span>
        <div className="win__btns">
          <div className="tbtn tbtn--close" title="Close" onClick={onClose}>
            <svg viewBox="0 0 10 10"><path d="M1 1l8 8M9 1l-8 8" stroke="#fff" strokeWidth="1.8"/></svg>
          </div>
        </div>
      </div>
      <div className="dlg__inner">
        <div className="dlg__body">
          <div className="dlg__ico"><ErrorIcon type={def.type}/></div>
          <div className="dlg__msg">
            {def.msg.map((m,i)=> m==="" ? <div key={i} style={{height:8}}></div> : <div key={i}>{m}</div>)}
            {def.serial &&
              <input className="xp-input dlg__serial" placeholder={def.serial}
                value={serial} onChange={e=>setSerial(e.target.value.toUpperCase())} autoFocus/>}
          </div>
        </div>
        <div className="dlg__btns">
          {def.btns.map((b,i)=>(
            <button key={i} className="xp-btn" autoFocus={i===0 && !def.serial} onClick={()=>click(b.act)}>{b.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

window.Dialogs = { APPS, DEFS, Launcher, ErrorIcon };
