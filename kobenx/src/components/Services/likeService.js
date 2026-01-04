import Parse from "parse";
import { getUserPublic } from "../services/userService.js";

// Pointer to Posts
function getPostPointer(postId) {
  const Posts = Parse.Object.extend("Posts");
  const post = new Posts();
  post.id = postId;
  return post;
}

// Pointer to UserPublic
function getUserPublicPointer(id) {
  const UserPublic = Parse.Object.extend("UserPublic");
  const user = new UserPublic();
  user.id = id;
  return user;
}

// Toggle Like
export async function toggleLike(postId) {
  const userPublic = await getUserPublic();
  if (!userPublic) throw new Error("No user logged in");

  const postPointer = getPostPointer(postId);
  const userPointer = getUserPublicPointer(userPublic.id);

  const Likes = Parse.Object.extend("Likes");

  // Check if like exists
  const query = new Parse.Query(Likes);
  query.equalTo("user", userPointer);
  query.equalTo("post", postPointer);

  const existing = await query.first();

  if (existing) {
    await existing.destroy();
    await updatePostLikesCount(postId);
    return { liked: false };
  }

  const newLike = new Likes();
  newLike.set("user", userPointer);
  newLike.set("post", postPointer);
  await newLike.save();
  await updatePostLikesCount(postId);

  return { liked: true };
}

// Count likes for a post
export async function getLikesCount(postId) {
  const postPointer = getPostPointer(postId);
  const Likes = Parse.Object.extend("Likes");

  const query = new Parse.Query(Likes);
  query.equalTo("post", postPointer);

  return await query.count();
}

// Update 'likes' column in Posts class
export async function updatePostLikesCount(postId) {
  const postPointer = getPostPointer(postId);

  const newCount = await getLikesCount(postId);
  postPointer.set("likes", newCount);
  await postPointer.save();

  return newCount;
}

// Check if current user liked the post
export async function userHasLiked(postId) {
  const userPublic = await getUserPublic();
  if (!userPublic) return false;

  const userPointer = getUserPublicPointer(userPublic.id);
  const postPointer = getPostPointer(postId);

  const Likes = Parse.Object.extend("Likes");

  const query = new Parse.Query(Likes);
  query.equalTo("user", userPointer);
  query.equalTo("post", postPointer);

  const existing = await query.first();
  return !!existing;
}
