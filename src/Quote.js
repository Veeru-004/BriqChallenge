import React, { useState, useEffect } from 'react';
import './App.css';
export default function Quote() {

  const [quotes, setQuotes] = useState("");
  
  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then(response => response.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNum]);
      })
  }
  useEffect(() => {
    getQuote();
  }, []);
  return (
    <>
      <div className="App1">
        <div className="example">
          <div className="font">
          <h2>{quotes.text}</h2>
          <h3>{quotes.author}</h3>
          </div>
        </div>
        <br/>
        </div>
        <button id="button"className="btn" onClick={getQuote}>New Quote</button>   
    </>
  );
}
