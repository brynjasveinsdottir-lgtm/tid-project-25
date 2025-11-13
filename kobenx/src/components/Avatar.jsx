import "./Avatar.css";


export default function Avatar({ src, alt }) {
    const hasImage = Boolean(src);
    const initials = alt.slice(0, 2).toUpperCase();
  
    return hasImage ? (
      <img src={src} alt={alt} className="avatar" />
    ) : (
      <div className="avatar fallback">{initials}</div>
    );
  }