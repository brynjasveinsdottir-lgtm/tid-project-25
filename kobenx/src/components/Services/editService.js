import Parse from "parse";

import { getUserPublic } from "./userService";
import { getSinglePost } from "./getService";

export async function editPost({ postId, newPostContent, newPostPhoto }) {
  // Get the UserPublic (via the user service)
  const userPublic = await getUserPublic();
  const post = await getSinglePost({ postId });

  post.set("postText", newPostContent);    // Save
  if (newPostPhoto) {
    const parseFile = new Parse.File(newPostPhoto.name, newPostPhoto);
    post.set("image", parseFile);
  }

  // Save the post
  try {
    return await post.save();
  } catch (error) {
    console.error("Error updating post:", error);
    throw error; // important! re-throw so frontend can catch
  }
}
