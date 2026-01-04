import "./UserDisplay.css";
import Avatar from "../avatar/Avatar.jsx";
import { timeSinceMoved } from "../services/timeService.js";
import { getCountryCode } from "../utils/countryCodes.js";
import ReactCountryFlag from "react-country-flag";

export default function UserDisplay({ userInfoParse, time }) {
  if (userInfoParse) {
    const profilePic = userInfoParse
      ? userInfoParse.get("profilePicture")
      : null;
    const profilePicUrl = profilePic ? profilePic?.url?.() : null;

    const timeInCph = timeSinceMoved({ user: userInfoParse });
    const homeCountry = userInfoParse.get("homeCountry");
    const countryCode = getCountryCode(homeCountry) || "UN";

    return (
      <div className="user_display">
        <Avatar
          alt={
            userInfoParse.get("firstName")
              ? userInfoParse.get("firstName")
              : "UNKNOWN"
          }
          src={profilePicUrl}
        />
        <div className="column">
          <div className="row">
            <p className="username">
              {" "}
              {userInfoParse.get("firstName")
                ? userInfoParse.get("firstName")
                : "FirstName"}{" "}
              {userInfoParse ? userInfoParse.get("lastName") : "User name"}{" "}
            </p>
            <ReactCountryFlag
              countryCode={countryCode}
              className="flag"
              svg={true}
              fallback={
                <p className="subtle">
                  {userInfoParse.get("homeCountry")
                    ? userInfoParse.get("homeCountry")
                    : "unknown country"}
                </p>
              }
            />
            <div className="tag"> {timeInCph} </div>{" "}
            {time && <p className="subtle">• {time}</p>}
          </div>

          <p className="subtle">
            {userInfoParse.get("occupation")
              ? userInfoParse.get("occupation")
              : "bio"}
          </p>
        </div>
      </div>
    );
  }
}
