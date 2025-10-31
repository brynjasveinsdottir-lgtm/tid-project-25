import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EventCard from './components/EventCard.jsx'
import './assets/Manrope.ttf'
import MusicEventIcon from "/src/assets/MusicEventIcon.png"
import FoodEventIcon from '/src/assets/FoodIcon.png'
import EventCardImage from "/src/assets/EventCardImage.png"


//imports from text field
import TextField from './components/TextField.jsx'




function App() {
  const [count, setCount] = useState(0)




  //data for event cards
  const events = [{
      category: "music",
      name: "The Bird",
      date: "Thu, 9th Oct",
      time: "21:00",
      location: "Refshalevej 173, København K",
      user: "username",
      timeUploaded: "30m",
      icon: MusicEventIcon,
      image: EventCardImage,
    },
    {
      category: "food",
      name: "Street Food",
      date: "Thu, 9th Oct",
      time: "21:00",
      location: "Refshalevej 173, København K",
      user: "username",
      timeUploaded: "30m",
      icon: FoodEventIcon,
      image: EventCardImage,
    },
  ];

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React - Test</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Our examples start here below */}

      {/* EVENT CARDS */}
      <div className='row'>
        {events.map((event, index) => (
          <EventCard key = {index} event = {event} />
        ))}
      </div>
      <p> </p>

      {/* USER DISPLAY */}
      <UserDisplay userInfo={userA} />

      {/* TEXT FIELD / COMMENT */}
      <TextField />
      
    </>
  )
}

export default App
