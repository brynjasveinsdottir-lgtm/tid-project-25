import Avatar from "./Avatar";
import './GoingElement.css'

export default function GoingElement({ going }) {
  const getUser = going.get("user");

  const profilePic = going ? getUser.get("profilePicture") : null;
  const profilePicUrl = profilePic ? profilePic?.url?.() : null;

  return (
    <div>
        <div className='profiles-container'>
        <Avatar
            alt={getUser.get("firstName") ? getUser.get("firstName") : "XX"}
            src={profilePicUrl}
            className='going-avatar'
        />
        </div>
    </div>
  );
}
