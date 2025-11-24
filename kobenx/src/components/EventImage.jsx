import React, { useState, useEffect } from "react"
import Food0 from '/src/assets/Food1.png'
import Food1 from '/src/assets/Food1.png'
import Food2 from '/src/assets/Food1.png'
import Music0 from '/src/assets/Music0.png'
import Music1 from '/src/assets/Music1.png'
import Music2 from '/src/assets/Music2.png'

const plImages ={
    Food0,
    Food1,
    Food2,
    Music0,
    Music1,
    Music2
}

export default function EventImage({event}) {

    const eventImagePl = `${event.get('eventCategory')}${Math.floor(Math.random()*3)}`
    const plEventImg = plImages[eventImagePl]

    return plEventImg
}