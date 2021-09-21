import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating'
import './App.css';

export default function Quote() {

  //To set the selected author once the rating changed
  const [selectedAuthor, getAuthor] = useState(" ");

  //To set the quote based on author selection
  const [quote, setQuote] = useState(" ");

  //To set the rating value based on the rating
  const [rating, setRating] = useState(0);

  //Function to fetch the all qoutes and get the random quote if the author has one quote or the rating is less than 4  
  const Quotes = () => {
    fetch("https://type.fit/api/quotes")
      .then(response => response.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuote(data[randomNum]);
        setRating(0)
      })
  }

  //Inbuilt Function to get the rating value and set the selected author
  const handleRating = (rate) => {
    setRating(rate)
    if (rate > 3) {
      getAuthor(quote.author)
    }
    else {
      getAuthor(" ")
    }
  }

  //Function to get random quote on applying logic
  const getQoute = () => {
    if (rating < 4) { //If rating is less than 
      Quotes();
    }
    else {
      fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then((data) => {
          var filtered = data.filter(a => a.author === selectedAuthor);
          if (filtered.length === 1) {
            Quotes();
            return;
          }
          let randomNum = Math.floor(Math.random() * filtered.length);
          setQuote(filtered[randomNum]);
          setRating(0)
        })
    }
  }
  useEffect(() => {
    getQoute();
  }, []);
  return (
    <>
      <section class="py-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 mx-auto">
              <header class="text-center pb-5">
                <h1 class="h2">Random Quote</h1>
                <p><br />Give 4/5 Star rating for Same Author Quote</p>
              </header>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 mx-auto">
              <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded">
                <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                <p class="mb-0 mt-2 font-italic">{quote.text}..."</p>

                <footer class="blockquote-footer pt-4 mt-4 border-top"><cite title="Source Title">{quote.author}</cite>
                </footer>
                <Rating className="btn" onClick={handleRating} ratingValue={rating} /><br />
                <button className="btn" onClick={getQoute}>Get New Qoute</button>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

