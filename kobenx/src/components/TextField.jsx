import React, { useState } from "react";
import "./TextField.css"
import {AddPhotoAlternateIcon} from '@mui/icons-material/AddPhotoAlternate';



export default function TextField({}) {
    const [userInput, setUserIinput] = useState("");
    const [postUserName, setPostUserName] = useState("@username");

    const placeholderText = `Reply to ${postUserName}`;

    
    return(
        <>
        <div className="comment-box">
        <textarea type="text" className="naked" placeholder= {placeholderText} />
        <AddPhotoAlternateIcon/>

        </div>
        </>

    )
}
