import "./EventCardStyle.css"
import MusicEventIcon from "./assets/MusicEventIcon.png"
import EventCardImage from "./assets/EventCardImage.png"
import Ellipse from "./assets/Ellipse.png"

function EventCard() {
    return (
        <article className="event_card">
            <header className="header">
                <img src={MusicEventIcon} className="event_icon" alt="Music event icon"/>
                <h1 className="title music_title"> The Bird </h1>
            </header>
            
            <div className="date_time_div">
                <p className="date_time"> Thu, 9 Oct at 21:00 </p>
            </div>

            <div className="location_div">
                <p className="location"> Refshalevej 173,  København K </p>
            </div>

            <div>
                <img src={EventCardImage} className="card_image"></img>
            </div>

            <footer className="footer">
                <p className="post_info"> Posted by @username </p>
                <img src={Ellipse} className="ellipse" />
                <p className="post_info"> 30m </p>
            </footer>
        </article>
    )
}

export default EventCard;