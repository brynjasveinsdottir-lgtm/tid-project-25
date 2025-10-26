import React, { useState } from "react";
import "./TextField.css"
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';


export default function TextField({}) {
    const [userInput, setUserIinput] = useState("");
    const [postUserName, setPostUserName] = useState("@username");

    const placeholderText = `Reply to ${postUserName}`;

    
    return(
        <>
        <div className="comment-box">
        <textarea type="text" className="naked" placeholder= {placeholderText} />
        <div className="icon-container"> 
            <AddPhotoAlternateOutlinedIcon/> 
            <EmojiEmotionsOutlinedIcon/>
            <LinkOutlinedIcon/>
        </div> 

        </div>
        </>

    )
}
