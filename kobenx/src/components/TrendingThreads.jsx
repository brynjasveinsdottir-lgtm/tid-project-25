import { useEffect, useState } from "react";
import { getTrendingThreads } from "./Services/trendingService";
import { Link } from "react-router-dom";

export default function TrendingThreads() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    async function load() {
      const results = await getTrendingThreads();
      setThreads(results);
    }
    load();
  }, []);

  function getShortTitle(text) {
    if (!text) return "";
    return text.split(" ").slice(0, 8).join(" ") + "...";
  }

  function formatDate(date) {
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  }

  return (
    <div className="trending-wrapper">
      <h2 className="trending-title">Trending threads</h2>

      <div className="trending-box">

        {/* LISTA THREAD */}
        <ul className="trending-events-list">
          {threads.length === 0 && (
            <p className="no-events">No trending threads</p>
          )}

          {threads.map((t) => (
            <li key={t.id} className="trending-event-item">
              <div className="trending-event-text">
                <p className="trending-event-date">
                  {formatDate(t.createdAt)}
                </p>

                <h4 className="trending-event-title">
                  {getShortTitle(t.text)}
                </h4>

                <p className="trending-event-place">@{t.author}</p>
              </div>
            </li>
          ))}
        </ul>

        <Link to="/threads" className="trending-show-more">
          Show more
        </Link>

      </div>
    </div>
  );
}