import Parse from "parse";

import { getUserPublic } from "../services/userService.js";

function getPostPointer(postId) {
  const Posts = Parse.Object.extend("Posts");
  const post = new Posts();
  post.id = postId;
  return post;
}

function getUserPublicPointer(userId) {
  const UserPublic = Parse.Object.extend("UserPublic");
  const user = new UserPublic();
  user.id = userId;
  return user;
}

export async function addComment({ post, text }) {
  if (!text.trim()) throw new Error("Cannot add empty comment");

  const userPublic = await getUserPublic();
  if (!userPublic) throw new Error("No user logged in");

  const Comment = Parse.Object.extend("Comments");
  const comment = new Comment();

  comment.set("text", text);
  comment.set("post", post);
  comment.set("author", userPublic);

  await comment.save();

  const newCount = await updatePostCommentsCount(post.id);
  return { comment, count: newCount };
}

export async function deleteComment(commentId, postId) {
  const Comments = Parse.Object.extend("Comments");
  const comment = new Comments();
  comment.id = commentId;

  await comment.destroy();
  const newCount = await updatePostCommentsCount(postId);

  return newCount;
}

export async function getCommentsCount(postId) {
  const postPointer = getPostPointer(postId);
  const Comments = Parse.Object.extend("Comments");

  const query = new Parse.Query(Comments);
  query.equalTo("post", postPointer);

  return await query.count();
}

export async function updatePostCommentsCount(postId) {
  const postPointer = getPostPointer(postId);
  const newCount = await getCommentsCount(postId);

  postPointer.set("comments", newCount);
  await postPointer.save();

  return newCount;
}

export async function userHasCommented(postId) {
  const userPublic = await getUserPublic();
  if (!userPublic) return false;

  const postPointer = getPostPointer(postId);
  const userPointer = getUserPublicPointer(userPublic.id);

  const Comments = Parse.Object.extend("Comments");
  const query = new Parse.Query(Comments);
  query.equalTo("post", postPointer);
  query.equalTo("author", userPointer);

  const existing = await query.first();
  return !!existing;
}
