/* app.jsx — root: boot → login → desktop state machine + Tweaks. */
const { useState: uaS, useEffect: uaE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "classic",
  "radius": "rounded",
  "wallStyle": "logo"
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
  // No boot or login screens: the site opens straight onto the desktop (the
  // wallpaper is already painted by the page while scripts load, and the
  // desktop UI fades in on top — see "straight into Windows" in xp.css).
  // Log Off / Turn Off fade to black and bring back a fresh desktop.
  const [gen, setGen] = uaS(0);
  const [veil, setVeil] = uaS(false);
  const restart = () => { setVeil(true); setTimeout(() => { setGen(g => g + 1); setVeil(false); }, 420); };

  const logo = "assets/img/logo.jpg";
  const avatar = "assets/img/avatar.jpg";
  const wallpaper = "assets/img/wallpaper-na.png";

  // apply tweak CSS variables to the wrapper
  const cssVars = {
    "--xp-radius": t.radius === "sharp" ? "0px" : "8px",
    ...(ACCENTS[t.accent] || ACCENTS.classic),
    height:"100%",
  };

  return (
    <div style={cssVars}>
      <Shell.Desktop key={gen} tweaks={t} avatar={avatar} wallpaper={wallpaper} onLogoff={restart}/>
      <div className={"restart-veil" + (veil ? " is-on" : "")} aria-hidden="true"></div>

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
          options={["logo","bliss","memphis","solid"]}
          onChange={v=>setTweak("wallStyle", v)} />
        <TweakButton label="Restart desktop" onClick={restart} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
