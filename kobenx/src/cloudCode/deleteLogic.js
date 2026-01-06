Parse.Cloud.afterDelete("Posts", (request) => {
  //Deleting comments (on a deleted post)
  const queryComment = new Parse.Query("Comments");
  queryComment.equalTo("post", request.object);
  queryComment
    .find()
    .then(Parse.Object.destroyAll)
    .catch((error) => {
      console.error(
        "Error finding related comments " + error.code + ": " + error.message
      );
    });
  //Deleting likes (on a deleted post)
  const queryLikes = new Parse.Query("Likes");
  queryLikes.equalTo("post", request.object);
  queryLikes
    .find()
    .then(Parse.Object.destroyAll)
    .catch((error) => {
      console.error(
        "Error finding related like " + error.code + ": " + error.message
      );
    });
});
