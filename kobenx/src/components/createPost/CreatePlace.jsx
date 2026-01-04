export default function PlaceForm({ data, setData }) {
  return (
    <div className="input-container">
      <select
        value={data.location}
        onChange={(e) =>
          setData((prev) => ({ ...prev, location: e.target.value }))
        }
        required
      >
        <option value="">Select location</option>
        <option value="Tivoli">Tivoli Gardens</option>
        <option value="Nyhavn">Nyhavn</option>
        <option value="Refshaleøen">Refshaleøen</option>
        <option value="Nørrebrogade">Nørrebrogade</option>
        <option value="Nørrebro market">Nørrebro market</option>
        <option value="Other">Other</option>
      </select>
      <p className="dev-description">
        Sorry we do not support this post type yet...
      </p>
    </div>
  );
}
