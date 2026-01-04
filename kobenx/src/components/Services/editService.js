import Parse from "parse";

import { getUserPublic } from "./userService";
import { getSinglePost } from "./getService.js";

export async function editPost({ postId, newPostContent, newPostPhoto }) {
  // Get the UserPublic (via the user service)
  const userPublic = await getUserPublic();
  const post = await getSinglePost({ postId });
  if (post.get("author").id !== userPublic.id) {
    return Promise.reject(
      new Error("You do not have permission to edit this post.")
    );
  }

  post.set("postText", newPostContent);
  if (newPostPhoto) {
    const parseFile = new Parse.File(newPostPhoto.name, newPostPhoto);
    post.set("image", parseFile);
  }
  if (newPostPhoto === null) {
    post.unset("image");
  }

  // Save the post
  try {
    return await post.save();
  } catch (error) {
    console.error("Error updating post:", error);
    throw error; // important! re-throw so frontend can catch
  }
}
