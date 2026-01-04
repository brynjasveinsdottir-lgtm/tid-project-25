import TextField from "../textField/TextField";

export default function ThreadForm({ data, setData, onDraftChange }) {
  return (
    <TextField
      placeholderText="What's on your mind?"
      onChange={(text) => {
        setData((prev) => ({ ...prev, content: text }));
        onDraftChange?.(text);
      }}
      onPhotoChange={(photo) => setData((prev) => ({ ...prev, photo }))}
      value={data.content}
      photo={data.photo}
    />
  );
}
