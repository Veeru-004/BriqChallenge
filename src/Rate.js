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
      <Rating className="btn" onClick={handleRating} ratingValue={rating} />
      <h2>Similar Quote</h2>
    </div>
  )
}