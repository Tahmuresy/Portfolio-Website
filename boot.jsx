/* boot.jsx — XP boot splash + login/welcome screen. window.BootScreens */
const { useState: ubS, useEffect: ubE } = React;

function BootSplash({ onDone, logo }) {
  ubE(() => { const id = setTimeout(onDone, 2600); return () => clearTimeout(id); }, []);
  return (
    <div className="boot">
      <div className="boot__brand">
        <img className="boot__logo" src={logo} alt="logo"/>
        <div className="boot__word"><b>Tahmures</b> <i>Ghiyasi</i></div>
      </div>
      <div className="boot__bar"></div>
      <div className="boot__foot">
        <div className="boot__corp">Computational <span>·</span> Robotic <span>·</span> AEC</div>
        <div>Tahmures Ghiyasi OS — Professional</div>
      </div>
    </div>
  );
}

function LoginScreen({ onEnter, onShutdown, avatar }) {
  return (
    <div className="login">
      <div className="login__topline"></div>
      <div className="login__main">
        <div className="login__left">
          <div className="login__brand" style={{fontSize:"26px", fontFamily:"var(--tg-serif)"}}>Tahmures Ghiyasi</div>
          <div className="login__hint">To begin, click your user name.</div>
        </div>
        <div className="login__divider"></div>
        <div className="login__right">
          <div className="login__tile" onClick={onEnter}>
            <div className="login__avatar" style={{ backgroundImage:`url(${avatar})` }}></div>
            <div>
              <div className="login__name">Tahmures Ghiyasi</div>
              <div className="login__sub">Computational Designer · Ph.D. Candidate</div>
            </div>
          </div>
        </div>
      </div>
      <div className="login__bottombar">
        <div className="login__poweroff" onClick={onShutdown} style={{cursor:"pointer"}}>
          <span style={{width:18,height:18,display:"inline-block"}}>{window.Icons.Power()}</span>
          Turn off computer
        </div>
        <div className="login__msg">After you log on, you can add or change accounts. Just go to Control Panel and click User Accounts.</div>
      </div>
      <div className="login__botline"></div>
    </div>
  );
}

window.BootScreens = { BootSplash, LoginScreen };
