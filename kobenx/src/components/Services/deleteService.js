import { getUserPublic } from "../services/userService.js";
import { getSinglePost } from "./getService.js";

export async function deletePost({ postId }) {
  // Get the UserPublic info (via the user service)
  const userPublic = await getUserPublic();
  const post = await getSinglePost({ postId });

  if (post.get("author").id !== userPublic.id) {
    return Promise.reject(
      new Error("You do not have permission to delete this post.")
    );
  }
  await post.destroy();
  console.log("Post deleted successfully");

  return;
}
