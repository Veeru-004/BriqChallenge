import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import Quote from './Quote'
import './App.css';

export default function Rate() {
  const [rating, setRating] = useState(0) 
  const handleRating = (rate) => {
    setRating(rate)  
  }
  return (
    <div className="App">
      <Quote id={rating} />
      <h1>{rating}</h1>
      <Rating id="rating" onClick={handleRating} ratingValue={rating} />
    </div>
  )
}