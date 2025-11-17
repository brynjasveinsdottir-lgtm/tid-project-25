import Parse from "parse";
import { getUserPublic } from "./userService";

export async function createPost({ selectedToggle, postContent, postPhoto, postTitle, category,eventLocation,eventTime }) {
  // Get the UserPublic (via the new user service)
  const userPublic = await getUserPublic();

  // Create a new post
  const Posts = Parse.Object.extend("Posts");
  const newPost = new Posts();
  newPost.set("category", selectedToggle);
  newPost.set("postText", postContent);
  newPost.set("author", userPublic);
  newPost.set("postTitle", postTitle);

  // Attach image if provided
  if (postPhoto) {
    const response = await fetch(postPhoto);
    const blob = await response.blob();
    const parseFile = new Parse.File("upload.jpg", blob);
    newPost.set("image", parseFile);
  }

  //if the post is an event
  if (selectedToggle === "Event") {
    newPost.set("eventCategory", category? category : "Other"); 
    newPost.set("eventTime", eventTime? eventTime: new Date("2026-01-20T15:30:00Z")); 
    newPost.set("eventPlace", eventLocation? eventLocation : "TBD");
  }
  // Save the post
  return await newPost.save();
}
