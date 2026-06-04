/* app.jsx — root: boot → login → desktop state machine + Tweaks. */
const { useState: uaS, useEffect: uaE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "classic",
  "radius": "rounded",
  "wallStyle": "bliss"
}/*EDITMODE-END*/;

const ACCENTS = {
  classic: { /* Luna default: blue title, green start */
    "--xp-start-a":"#59b03a","--xp-start-b":"#3f9624","--xp-start-c":"#2f7d1b","--xp-start-text":"#ffffff",
    "--xp-taskbar-a":"#245edb","--xp-taskbar-b":"#3f8cf3","--xp-taskbar-c":"#1941a5",
  },
  blue: { /* monochrome blue start */
    "--xp-start-a":"#3f8cf3","--xp-start-b":"#1f5fd0","--xp-start-c":"#143f9e","--xp-start-text":"#ffffff",
    "--xp-taskbar-a":"#245edb","--xp-taskbar-b":"#3f8cf3","--xp-taskbar-c":"#1941a5",
  },
  yellow: { /* Memphis blue + yellow edge */
    "--xp-start-a":"#ffd34e","--xp-start-b":"#f4b81e","--xp-start-c":"#d99a0a","--xp-start-text":"#231F20",
    "--xp-taskbar-a":"#1f56c8","--xp-taskbar-b":"#3f8cf3","--xp-taskbar-c":"#123a96",
  },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [phase, setPhase] = uaS(() => localStorage.getItem("jrl_phase") || "boot");
  uaE(() => { localStorage.setItem("jrl_phase", phase); }, [phase]);

  const logo = "assets/img/logo.jpg";
  const avatar = "assets/img/end-effector.jpg";
  const wallpaper = "assets/img/wallpaper-na.png";

  // apply tweak CSS variables to the wrapper
  const cssVars = {
    "--xp-radius": t.radius === "sharp" ? "0px" : "8px",
    ...(ACCENTS[t.accent] || ACCENTS.classic),
    height:"100%",
  };

  return (
    <div style={cssVars}>
      {phase === "boot" &&
        <BootSplash logo={logo} onDone={()=>setPhase("login")}/>}
      {phase === "login" &&
        <LoginScreen avatar={avatar}
          onEnter={()=>setPhase("desktop")}
          onShutdown={()=>setPhase("boot")}/>}
      {phase === "desktop" &&
        <Shell.Desktop tweaks={t} avatar={avatar} wallpaper={wallpaper}
          onLogoff={()=>setPhase("login")}/>}

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio label="Start accent" value={t.accent}
          options={["classic","blue","yellow"]}
          onChange={v=>setTweak("accent", v)} />
        <TweakRadio label="Window chrome" value={t.radius}
          options={["rounded","sharp"]}
          onChange={v=>setTweak("radius", v)} />
        <TweakSection label="Desktop" />
        <TweakRadio label="Wallpaper" value={t.wallStyle}
          options={["bliss","memphis","solid"]}
          onChange={v=>setTweak("wallStyle", v)} />
        <TweakButton label="Replay boot" onClick={()=>{ localStorage.setItem("jrl_phase","boot"); location.reload(); }} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
