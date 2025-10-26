import "./EventCardStyle.css"
import MusicEventIcon from "./assets/MusicEventIcon.png"
import FoodIcon from './assets/FoodIcon.png'
import EventCardImage from "./assets/EventCardImage.png"
import Ellipse from "./assets/Ellipse.png"

const EventCategory = 'Music'
const EventName = 'The Bird'
const EventDate = 'Thu, 9th Oct'
const EventTime = '21:00'
const EventLocation = 'Refshalevej 173, København K'
const User = 'username'
const TimeUploaded = '30m'

function EventCard() {
    
        return (
            <article className="event_card">
                <header className="header">
                    <img src={MusicEventIcon} className="event_icon" alt="Music event icon"/>
                    <h1 className="title music_title"> {EventName} </h1>
                </header>
                
                <div className="date_time_div">
                    <p className="date_time"> {EventDate} at {EventTime} </p>
                </div>

                <div className="location_div">
                    <p className="location"> {EventLocation} </p>
                </div>

                <div>
                    <img src={EventCardImage} className="card_image"></img>
                </div>

                <footer className="footer">
                    <p className="post_info"> Posted by @{User} </p>
                    <img src={Ellipse} className="ellipse" />
                    <p className="post_info"> {TimeUploaded} </p>
                </footer>
            </article>
        )
}

export default EventCard;