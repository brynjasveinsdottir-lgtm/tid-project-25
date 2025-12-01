import Parse from "parse";

// Trending threads: last 5 days, at least 1 like
export async function getTrendingThreads() {
  const Posts = Parse.Object.extend("Posts");
  const query = new Parse.Query(Posts);

  query.equalTo("category", "Thread");

  // last 5 days
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
  query.greaterThan("createdAt", fiveDaysAgo);

  // at least 1 like
  query.greaterThanOrEqualTo("likes", 1);

  query.descending("likes");
  query.limit(5);

  const results = await query.find();

  return results.map((post) => ({
    id: post.id,
    text: post.get("postText") ?? post.get("text"), // compatibilità
    likes: post.get("likes") ?? 0,
    author: post.get("author")?.get("username") ?? "",
    createdAt: post.createdAt,
  }));
}