Parse.Cloud.beforeSave("Posts", (request) => {
  const time = request.object.get("eventTime");
  const file = request.object.get("image");

  // Event date validation
  if (time && time < new Date()) {
    throw new Parse.Error(400, "The event date cannot be in the past");
  }

  //file name validation
  if (!file) return;
  let name = file.name();

  //only support jpg or png filetypes
  if (!name.endsWith(".jpg") && !name.endsWith(".png")) {
    throw new Parse.Error(
      400,
      "Invalid file type. Only .jpg and .png images are allowed."
    );
  }
});
