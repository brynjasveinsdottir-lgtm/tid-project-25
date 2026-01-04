import EventCard from "/src/components/post/EventCard.jsx";
import "/src/assets/Manrope.ttf";
import "/src/index.css";
import "/src/Pages/PageStyle.css";

export default function EventSection({ category, events }) {
  return (
    <div className="category-section">
      <h2 className="category-header">{category}</h2>
      <div className="category-row">
        <div className="event-row">
          {events.map((post) => (
            <EventCard key={post.id} event={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
