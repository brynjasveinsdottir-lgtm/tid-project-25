import React, { useEffect, useState } from "react";
import Parse from "parse";
import { Link } from "react-router-dom";

export default function TrendingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const Posts = Parse.Object.extend("Posts");
        const query = new Parse.Query(Posts);

        // get only posts with category = 'Event'
        query.equalTo("category", "Event");

        // important: get only future events
        query.greaterThan("eventTime", new Date());

        // sort by event time ascending
        query.ascending("eventTime"); 

        // limit to only 4 events to show in the box
        query.limit(4);

        const results = await query.find();
        setEvents(results);
      } catch (err) {
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="trending-box">Loading events…</div>;
  }

  if (!events.length) {
    return <div className="trending-box">No upcoming events yet.</div>;
  }

  return (
    <div className="trending-wrapper">
      <h2 className="trending-title">Upcoming events</h2>
  
      <div className="trending-box">
        <ul className="trending-events-list">
          {events.map((event) => {
            const title = event.get("postTitle");
            const place = event.get("eventPlace");
            const time = event.get("eventTime");
            const imageFile = event.get("image");   // campo File su Back4App
            const imageUrl = imageFile ? imageFile.url() : null;
  
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
