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

//imports from thread card
import ThreadCard from './components/ThreadCard.jsx'


function App() {
  const [count, setCount] = useState(0)
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
      <div className='row'>
        {events.map((event, index) => (
          <EventCard key = {index} event = {event} />
        ))}
      </div>
      <p> </p>


      <TextField />

      <ThreadCard
  
      username="Username"
      bio="Student at IT University"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      timestamp="2h ago"

/>

    </>
  )
}

export default App
