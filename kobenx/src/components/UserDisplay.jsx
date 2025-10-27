import * as React from 'react';
import './UserDisplay.css';
import Avatar from './Avatar';

export default function UserDisplay({userInfo}) {
  return (

    <div className='user_display'>
        
    <Avatar src= {userInfo.image} alt={userInfo.name} />     
      <div className='column'>

        <div className='row'>
            <p className="username"> {userInfo.name}</p> {/* User name */}
            <div className='tag'> {userInfo.yr}</div> {/* How long the user has lived in CPH */}
            <p className= "subtle">• {userInfo.timeUploaded}</p>  {/* Timestamp */}

        </div>

            <p className= "subtle">{userInfo.bio}</p>
      </div> 

    </div>
  );
}