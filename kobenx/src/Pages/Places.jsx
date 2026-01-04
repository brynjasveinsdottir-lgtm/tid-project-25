import placesmap from "../assets/placesMap.png";

export default function Places() {
  return (
    <div className="page-structure">
      <h1 className="page-title">Places</h1>
      <div className="info-box">
        <p className="info-text">Coming soon...</p>{" "}
      </div>
      <img className="places-map" src={placesmap} alt="Map of places" />
    </div>
  );
}
