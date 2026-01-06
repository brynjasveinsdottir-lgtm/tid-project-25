import Comment from "./Comment";

export default function CommentList({
  comments,
  onCommentsUpdated,
  currentUser,
}) {
  if (!comments || comments.length === 0) {
    return (
      <p className="comment-placeholder-text">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((c) => (
        <Comment
          key={c.id}
          comment={c}
          onCommentsUpdated={onCommentsUpdated}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}
