import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import Quote from './Quote'

export default function Rate() {
  const [rating, setRating] = useState(0) 
  const handleRating = (rate) => {
    setRating(rate)  
  }
  return (
    <div>
      <Quote id={rating} />
      <h1>{rating}</h1>
      <Rating onClick={handleRating} ratingValue={rating} />
    </div>
  )
}