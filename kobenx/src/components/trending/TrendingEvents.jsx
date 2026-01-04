import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../Services/getService.js";
import EventPl from "/src/assets/EventPl.png";

export default function TrendingEvents() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const results = await getPosts({ type: "UpcomingEvents" });
      setPosts(results);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="trending-box">Loading events…</div>;
  }

  if (!posts.length) {
    return <div className="trending-box">No upcoming events yet.</div>;
  }

  return (
    <div className="trending-wrapper">
      <h2 className="trending-title">Upcoming events</h2>

      <div className="trending-box">
        <ul className="trending-events-list">
          {posts.map((event) => {
            const title = event.get("postTitle");
            const place = event.get("eventPlace");
            const time = event.get("eventTime");
            const imageFile = event.get("image");
            const imageUrl = imageFile ? imageFile.url() : EventPl;

            let dateLabel = "";
            if (time) {
              dateLabel = time.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              });
            }

            return (
              <li key={event.id} className="trending-event-item">
                <div className="trending-event-thumb">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={title || "Event image"}
                      className="trending-event-img"
                    />
                  ) : (
                    <span className="trending-event-thumb-placeholder">E</span>
                  )}
                </div>

                <div className="trending-event-text">
                  <span className="trending-event-date">{dateLabel}</span>
                  <p className="trending-event-title">{title}</p>
                  {place && <p className="trending-event-place">{place}</p>}
                </div>
              </li>
            );
          })}
        </ul>

        <Link to="/events" className="trending-show-more">
          Show more
        </Link>
      </div>
    </div>
  );
}
