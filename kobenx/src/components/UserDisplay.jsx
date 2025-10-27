import * as React from 'react';
import './UserDisplay.css';
import Avatar from './Avatar';

export default function UserDisplay(userInfo) {
  return (

    <div className='user_display'>
        
    <Avatar alt={"Brynja Sveinsdóttir"} />     
      <div className='column'>

        <div className='row'>
            <p className="username"> Sara Jónsdóttir</p> {/* User name */}
            <div className='tag'> 2 years</div> {/* How long the user has lived in CPH */}
            <p className= "subtle">• 2m</p>  {/* Timestamp */}

        </div>

            <p className= "subtle">Studying architecture at the Royal Danish Academy</p>
      </div> 

    </div>
  );
}