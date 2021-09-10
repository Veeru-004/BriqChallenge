import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating'
import './App.css';
export default function Quote() {

  const [selectedAuthor, getAuthor] = useState(" ")
  const [quotes, setQuotes] = useState("");
  const [rating, setRating] = useState(0)
  const filterAuthors = [selectedAuthor];
  const handleRating = (rate) => {
    setRating(rate)
    let value = rate;
    if (value >= 4) {
      getAuthor(quotes.author)
    }
    else {
      getAuthor("")
    }
  }
  const sameQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then(response => response.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNum]);
        setRating(0)
      })
  }

  const getQoute = () => {
    if (rating <= 3) {
      fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then((data) => {
          let randomNum = Math.floor(Math.random() * data.length);
          setQuotes(data[randomNum]);
          setRating(0)
        })
    }
    else {
      fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then((data) => {
          var filtered = data.filter(a => a.author == filterAuthors[0]);
          if (filtered.length === 1) {
            sameQuote();
            return;
          }
          let randomNum = Math.floor(Math.random() * filtered.length);
          setQuotes(filtered[randomNum]);
          console.log(data)
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
                <p><br />Give 4/5 Star rating for Same Author Quote <a href="https://bootstrapious.com/snippets" class="font-italic text-info"></a></p>
              </header>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 mx-auto">
              <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded">
                <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                <p class="mb-0 mt-2 font-italic">{quotes.text}<a href="#" class="text-info"></a>."</p>
                <footer class="blockquote-footer pt-4 mt-4 border-top"><cite title="Source Title">{quotes.author}</cite>
                </footer>
                <Rating className="btn" onClick={handleRating} ratingValue={rating} /><br />  <button className="btn" onClick={getQoute}>Get Qoute</button>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

