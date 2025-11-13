import React, { useState } from "react";
import "./TextField.css"
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

//Temporary image upload functionality until implemented with file upload
import sampleImage from "../assets/bike.jpg";


export default function TextField({placeholderText, onChange, onPhotoChange}) {
    const [userInput, setUserInput] = useState("");
    const [inputPhoto, setInputPhoto] = useState(null); // not yet implemented
    const [externalLink, setExternalLink] = useState(null); // not yet implemented

   

    const handleChange = (e) => {
        const value = e.target.value;
        onChange?.(value); // let parent know of change (if provided)
      };

    const handleAddPhoto = () => {
        setInputPhoto(sampleImage);
        onPhotoChange?.(sampleImage); 
     };

     const handleRemovePhoto = () => {
        setInputPhoto(null);
        onPhotoChange?.(sampleImage); 
     };


    
    return(
        <>
        <div className="comment-box">
        <textarea type="text" className="naked" placeholder= {placeholderText} onChange={handleChange}/>
        {inputPhoto && <img src={inputPhoto} className="photo" onClick={handleRemovePhoto}></img>}  {/*TEMPORARY: removing the image when you click on it, add later a delete button or something*/}
        <div className="icon-container">  {/* Actions not ready yet */}
            <AddPhotoAlternateOutlinedIcon onClick={handleAddPhoto}/> 
            <EmojiEmotionsOutlinedIcon/>
            <LinkOutlinedIcon/>
        </div> 

        



        </div>
        </>

    )
}
