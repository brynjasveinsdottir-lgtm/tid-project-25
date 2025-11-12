import React, { useState } from "react";
import "./TextField.css"
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';


export default function TextField({placeholderText, onChange}) {
    const [userInput, setUserInput] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setUserInput(value);
        onChange?.(value); // Call parent callback if provided
      };
    //const [postUserName, setPostUserName] = useState("@username");
    //const placeholderText = `Reply to ${postUserName}`;

    
    return(
        <>
        <div className="comment-box">
        <textarea type="text" className="naked" placeholder= {placeholderText} onChange={handleChange}/>
        <div className="icon-container">  {/* not yet interactive */}
            <AddPhotoAlternateOutlinedIcon/> 
            <EmojiEmotionsOutlinedIcon/>
            <LinkOutlinedIcon/>
        </div> 

        </div>
        </>

    )
}
