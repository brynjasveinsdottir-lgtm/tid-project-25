import Parse from "parse";

export async function getPosts({ type }) {
  const Posts = Parse.Object.extend("Posts");
  const query = new Parse.Query(Posts);
  query.include("author");
  query.descending("createdAt");

  if (type === "Events" || type === "UpcomingEvents") {
    query.equalTo("category", "Event");
    query.greaterThanOrEqualTo("eventTime", new Date());
    query.ascending("eventTime");
    query.exclude(
      'author.profilePicture',
      'author.firstName',
      'author.lastName',
      'author.homeCountry',
      'author.occupation',
      'author.userIdPrivate',
      'author.dateMovedToCph'
    )
  } else if (type === "Threads") {
    query.equalTo("category", "Thread");
  }

  //for the upcoming events section on the homepage
  if (type === "UpcomingEvents") {
    query.limit(4);
  }

  const results = await query.find();
  return results;
}

export async function getSignups({ post }) {
  const Signups = Parse.Object.extend("Signups");
  const query = new Parse.Query(Signups);
  query.equalTo("post", post);
  query.include("user");
  query.exclude(
      'user.lastName',
      'user.username',
      'user.homeCountry',
      'user.occupation',
      'user.userIdPrivate',
      'user.dateMovedToCph'
    )
  const results = await query.find();
  return results;
}

export async function getSinglePost({ postId }) {
  const Posts = Parse.Object.extend("Posts");
  const query = new Parse.Query(Posts);
  query.include("author");
  query.equalTo("objectId", postId);
  const result = await query.first();
  return result;
}
