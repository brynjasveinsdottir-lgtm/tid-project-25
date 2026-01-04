import Parse from "parse";

export function getCurrentUser() {
  return Parse.User.current();
}

// Return the UserPublic object for the logged-in user
export async function getUserPublic() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    throw new Error("No user logged in");
  }

  const UserPublic = Parse.Object.extend("UserPublic");
  const query = new Parse.Query(UserPublic);
  query.equalTo("userIdPrivate", currentUser);

  const userPublic = await query.first();

  if (!userPublic) {
    throw new Error("No matching UserPublic found");
  }

  return userPublic;
}
