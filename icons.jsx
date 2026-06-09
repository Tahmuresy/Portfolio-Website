/* icons.jsx — XP-flavored placeholder icon set (inline SVG).
   Hand-drawn nods to the Luna iconography, not the copyrighted originals.
   Each is a function returning <svg>. Exported to window.Icons. */

const Icons = {};

Icons.MyComputer = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <rect x="3" y="4" width="26" height="18" rx="1.5" fill="#cfd6e0" stroke="#5b6573" strokeWidth="1"/>
    <rect x="5" y="6" width="22" height="13" rx="1" fill="#2b6fd6"/>
    <rect x="5" y="6" width="22" height="13" rx="1" fill="url(#mcg)"/>
    <defs>
      <linearGradient id="mcg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7fb3ff"/><stop offset="1" stopColor="#1a55b8"/>
      </linearGradient>
    </defs>
    <rect x="10" y="22" width="12" height="4" fill="#b9c0cb" stroke="#5b6573" strokeWidth="0.8"/>
    <rect x="6" y="25" width="20" height="4" rx="1" fill="#dfe3ea" stroke="#5b6573" strokeWidth="0.9"/>
    <circle cx="22.5" cy="27" r="0.9" fill="#7bd66a"/>
  </svg>
);

Icons.Exe = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <rect x="3" y="5" width="26" height="22" rx="2" fill="#1b1b1b" stroke="#000" strokeWidth="1"/>
    <rect x="3" y="5" width="26" height="5" rx="2" fill="#3b3b3b"/>
    <circle cx="6.5" cy="7.5" r="1" fill="#ff5f57"/><circle cx="9.5" cy="7.5" r="1" fill="#febc2e"/>
    <text x="6" y="20" fontFamily="monospace" fontSize="9" fill="#5dff8b">&gt;_</text>
    <rect x="16" y="18.5" width="6" height="1.8" fill="#5dff8b"/>
  </svg>
);

Icons.Dll = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <path d="M16 3l11 6.3v12.6L16 28 5 21.9V9.3z" fill="#f2c94c" stroke="#9b7b16" strokeWidth="1"/>
    <path d="M16 3l11 6.3-11 6.3L5 9.3z" fill="#ffe08a"/>
    <path d="M16 15.6l11-6.3v12.6L16 28z" fill="#d6a92e"/>
    <path d="M16 15.6L5 9.3v12.6L16 28z" fill="#e8bd3e"/>
    <circle cx="16" cy="13" r="3" fill="none" stroke="#7a5e10" strokeWidth="1.1"/>
  </svg>
);

Icons.Jpg = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <rect x="5" y="4" width="22" height="24" rx="1.5" fill="#fff" stroke="#9aa3b0" strokeWidth="1"/>
    <rect x="7.5" y="9" width="17" height="12" fill="#bfe0ff"/>
    <path d="M7.5 21l4.5-6 3.5 4 3-3.5 6 5.5z" fill="#4a9b3c"/>
    <circle cx="20.5" cy="12.5" r="2" fill="#ffd34e"/>
    <rect x="7.5" y="23.5" width="17" height="1.6" fill="#e0a23a"/>
    <text x="7" y="7.3" fontFamily="Tahoma" fontSize="3.4" fill="#777">JPG</text>
  </svg>
);

Icons.Pdf = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <path d="M7 3h13l6 6v20H7z" fill="#fff" stroke="#9aa3b0" strokeWidth="1"/>
    <path d="M20 3l6 6h-6z" fill="#d7dde6"/>
    <rect x="7" y="18" width="19" height="9" rx="1.5" fill="#cf2a25"/>
    <text x="9.4" y="25" fontFamily="Tahoma" fontWeight="bold" fontSize="6.2" fill="#fff">PDF</text>
  </svg>
);

Icons.Recycle = (full) => (
  <svg viewBox="0 0 32 32" className="nodrag">
    {full && <g><rect x="10" y="3" width="12" height="5" rx="1" fill="#7bc06a"/><path d="M11 6h10l-1 4H12z" fill="#5ea84e"/></g>}
    <path d="M8 9h16l-1.6 18.5a2 2 0 0 1-2 1.8H11.6a2 2 0 0 1-2-1.8z" fill="#dfe7f2" stroke="#7e93b5" strokeWidth="1"/>
    <path d="M8 9h16l-.2 2.5H8.2z" fill="#b9c8e0"/>
    <g stroke="#3f9c4a" strokeWidth="1.4" fill="none">
      <path d="M13 14l-2 3.5 2 .4"/><path d="M11.4 17l2.1-.6"/>
      <path d="M19 14l2 3.5-2 .4" transform="rotate(120 16 19)"/>
    </g>
    <path d="M16 13l1.6 2.8h-3.2zM12.4 19.4l3.2-.4-1.5 2.9zM19.6 19.4l-3.2-.4 1.5 2.9z" fill="#4caf50"/>
  </svg>
);

Icons.Diagrid = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <rect x="4" y="4" width="24" height="24" rx="1.5" fill="#fff" stroke="#9aa3b0" strokeWidth="1"/>
    <g stroke="#00AEEF" strokeWidth="1.1" fill="none">
      <path d="M8 26L16 6l8 20M5 20l11-14 11 14M11 26L20 8"/>
      <path d="M24 26L12 8"/>
    </g>
    <g fill="#EC008C"><circle cx="16" cy="6" r="1.3"/><circle cx="8" cy="26" r="1.2"/><circle cx="24" cy="26" r="1.2"/></g>
  </svg>
);

Icons.Notepad = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <path d="M8 3h12l5 5v21H8z" fill="#fff" stroke="#8f99a8" strokeWidth="1"/>
    <path d="M20 3l5 5h-5z" fill="#d7dde6"/>
    <g stroke="#3a72c4" strokeWidth="1"><path d="M11 13h11M11 16h11M11 19h11M11 22h7"/></g>
    <rect x="6" y="3" width="3" height="26" fill="#2f6fd6"/>
  </svg>
);

Icons.Mail = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <rect x="3" y="7" width="26" height="18" rx="2" fill="#fff" stroke="#8f99a8" strokeWidth="1"/>
    <path d="M3.6 8l12.4 9.5L28.4 8" fill="none" stroke="#2f6fd6" strokeWidth="1.6"/>
    <path d="M3.6 8h24.8v1L16 18.5 3.6 9z" fill="#cfe2ff"/>
  </svg>
);

Icons.Folder = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <path d="M4 8h8l2.4 2.6H28v15.4H4z" fill="#f6c14e" stroke="#b78a1e" strokeWidth="1"/>
    <path d="M4 11.6h24V26H4z" fill="#ffd76b"/>
    <path d="M4 11.6h24v2.2H4z" fill="#ffe39a"/>
  </svg>
);

Icons.Globe = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <circle cx="16" cy="16" r="12" fill="#2f8fe0"/>
    <g stroke="#fff" strokeWidth="1" fill="none" opacity=".85">
      <ellipse cx="16" cy="16" rx="5" ry="12"/><ellipse cx="16" cy="16" rx="11" ry="5"/>
      <path d="M4 16h24M16 4v24"/>
    </g>
    <circle cx="16" cy="16" r="12" fill="none" stroke="#1a5fa8" strokeWidth="1.2"/>
  </svg>
);

Icons.Help = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <circle cx="16" cy="16" r="12" fill="#2f8fe0" stroke="#1a5fa8" strokeWidth="1"/>
    <text x="11.5" y="22" fontFamily="Tahoma" fontWeight="bold" fontSize="16" fill="#fff">?</text>
  </svg>
);

Icons.Search = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <circle cx="14" cy="14" r="8" fill="#d8ecff" stroke="#2f6fd6" strokeWidth="1.6"/>
    <path d="M20 20l6 6" stroke="#2f6fd6" strokeWidth="2.4" strokeLinecap="round"/>
  </svg>
);

Icons.Run = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <rect x="4" y="8" width="24" height="17" rx="2" fill="#dfe7f2" stroke="#7e93b5" strokeWidth="1"/>
    <rect x="6" y="13" width="20" height="9" fill="#1b1b1b"/>
    <text x="7.5" y="20" fontFamily="monospace" fontSize="6" fill="#5dff8b">cmd</text>
  </svg>
);

Icons.Power = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <circle cx="16" cy="16" r="12" fill="#d23b2e" stroke="#9b261b" strokeWidth="1"/>
    <path d="M16 8v8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
    <path d="M11 11a7 7 0 1 0 10 0" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
  </svg>
);

Icons.Logoff = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <circle cx="16" cy="16" r="12" fill="#f2a93a" stroke="#b97e16" strokeWidth="1"/>
    <path d="M20 11a7 7 0 1 0 0 10" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
    <path d="M14 16h9m-3-3 3 3-3 3" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

Icons.Volume = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <path d="M6 13h5l6-5v16l-6-5H6z" fill="#fff"/>
    <path d="M20 11a6 6 0 0 1 0 10M22.5 8.5a9 9 0 0 1 0 15" fill="none" stroke="#fff" strokeWidth="1.6"/>
  </svg>
);

Icons.Shield = () => (
  <svg viewBox="0 0 32 32" className="nodrag">
    <path d="M16 4l9 3v8c0 6-4 9.5-9 11-5-1.5-9-5-9-11V7z" fill="#3a9b3c" stroke="#1f6e1f" strokeWidth="1"/>
    <path d="M11 16l3.5 3.5L22 12" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

window.Icons = Icons;
