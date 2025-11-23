import Parse from "parse";
import { getUserPublic } from "./userService";

export async function createPost({
  selectedToggle,
  postContent,
  postPhoto,
  postTitle,
  category,
  location,
  eventTime,
}) {
  // Get the UserPublic (via the new user service)
  const userPublic = await getUserPublic();

  // Create a new post
  const Posts = Parse.Object.extend("Posts");
  const newPost = new Posts();
  newPost.set("category", selectedToggle);
  newPost.set("postText", postContent);
  newPost.set("author", userPublic);
  newPost.set("postTitle", postTitle);

  // Attach image if provided (now it should be a File object)
  if (postPhoto) {
    const parseFile = new Parse.File(postPhoto.name, postPhoto);
    newPost.set("image", parseFile);
  }

  //if the post is an event
  if (selectedToggle === "Event") {
    const eventDate = eventTime? new Date(eventTime):new Date("2026-01-20T15:30:00Z") ; // convert the datetime-local string to Date or uses hard coded date if none provided (But lets change this and have a fallback in the UI, but for now it will crash if we dont provide a date)
    newPost.set("eventTime", eventDate);
    newPost.set("eventCategory", category ? category : "Other");
    newPost.set("eventPlace", location ? location : "TBD");
  }
  // Save the post
  return await newPost.save();
}
