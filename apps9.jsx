/* apps9.jsx — Mondrian Generator: the live web app (mondrian-generator/) running inside
   an XP window. Registers window.Apps.MondrianGenerator and window.Icons.Mondrian. */
window.Apps = window.Apps || {};
window.Icons = window.Icons || {};

window.Icons.Mondrian = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <rect x="2.5" y="2.5" width="27" height="27" fill="#F2EFE7" stroke="#151515" strokeWidth="1.4"/>
    <rect x="2.5" y="2.5" width="14" height="14" fill="#D12A1F"/>
    <rect x="20" y="22" width="9.5" height="7.5" fill="#1D4F9B"/>
    <rect x="2.5" y="25" width="7" height="4.5" fill="#F1C232"/>
    <path d="M16.5 2.5v27M2.5 16.5h27M20 16.5v13M2.5 25h14M20 22h9.5" stroke="#151515" strokeWidth="1.6"/>
    <rect x="2.5" y="2.5" width="27" height="27" fill="none" stroke="#151515" strokeWidth="1.4"/>
  </svg>
);

window.Apps.MondrianGenerator = () => {
  const src = "mondrian-generator/";
  return (
    <div className="mg-app">
      <div className="mg-bar">
        <span className="mg-bar__lbl">Address</span>
        <span className="mg-bar__url">{"tahmuresghiyasi.com/" + src}</span>
        <a className="xp-btn mg-bar__btn" href={src} target="_blank" rel="noopener">Open full screen ↗</a>
      </div>
      <iframe className="mg-frame" src={src} title="Mondrian Generator"
        allow="clipboard-write; web-share" loading="eager"></iframe>
    </div>
  );
};
