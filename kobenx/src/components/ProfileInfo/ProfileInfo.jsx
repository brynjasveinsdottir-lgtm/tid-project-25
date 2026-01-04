import "./ProfileInfo.css";
import Avatar from "/src/components/Avatar";

export default function ProfileInfo({ userInfo }) {
  const profilePic = userInfo ? userInfo.get("profilePicture") : null;
  const profilePicUrl = profilePic ? profilePic?.url?.() : null;

  return (
    <div className="profile-info">
      <Avatar
        alt={userInfo ? userInfo.get("firstName") : "UNKNOWN"}
        src={profilePicUrl}
      />
      <div className="profile-text">
        <p className="profile-name">
          {userInfo ? userInfo.get("firstName") : "FirstName"}{" "}
          {userInfo ? userInfo.get("lastName") : "LastName"}
        </p>
        <p className="profile-username">
          {userInfo ? "@" + userInfo.get("username") : "@username"}
        </p>
      </div>
    </div>
  );
}
