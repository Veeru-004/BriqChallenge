import React, { useState, useEffect, useCallback } from 'react';
import { Rating } from 'react-simple-star-rating'
import './App.css';
import stringSimilarity from 'string-similarity'

export default function QuoteCopy() {

    //To set the selected author once the rating changed
    const [selectedQuote, getQuote] = useState(" ");

    //To set the quote based on author selection
    const [quote, setQuote] = useState(" ");

    //To set the rating value based on the rating
    const [rating, setRating] = useState(0);

    //Inbuilt Function to get the rating value and set the selected author
    const handleRating = (rate) => {
        setRating(rate)
        if (rate > 3) {
            getQuote(quote.text)
        }
        else {
            getQuote(" ")
        }
    }
    //Function to get random quote on applying logic
    const QuoteFunc = () => {
        fetch("https://type.fit/api/quotes")
            .then(response => response.json())
            .then((data) => {
                if (rating < 4) {
                    let randomNum = Math.floor(Math.random() * data.length);
                    setQuote(data[randomNum]);
                }
                else {
                    const filteredArray = [];
                    const compare = data.forEach(obj => {
                        let score = stringSimilarity.compareTwoStrings(obj.text, selectedQuote)
                        let tempObj = {
                            "value": score,
                            "text": obj.text,
                            "author": obj.author,
                        }
                        filteredArray.push(tempObj);
                    })
                    //Filter array using score
                    filteredArray.sort(function (a, b) {
                        return (a.value - b.value);
                    })

                    //setting index the most last element to achieve the highest score
                    let randomNum = Math.floor(Math.random() * 42 + 1600);
                    console.log(filteredArray)
                    setQuote(filteredArray[randomNum]);
                }
            }, setRating(0))
    }

    useEffect(() => {
        QuoteFunc();
    }, []);

    return (
        <>
            <section className="py-4">
                <div className="container">
                    <div className="col-lg-6 mx-auto">
                        <header className="text-center pb-4">
                            <h1>Random Quote</h1>
                            <p>Give 4/5 Star rating for Similar Quote</p>
                        </header>
                    </div>
                    <div>
                        <div className="col-lg-8 mx-auto">
                            <blockquote className="blockquote-custom bg-transperent p-5 shadow rounded">
                                <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                                <p className="font-italic">{quote.text}..."</p>
                                <footer className="blockquote-footer pt-3 mt-4 border-top">{quote.author}
                                </footer>
                                <Rating className="btn" onClick={handleRating} ratingValue={rating} /><br />
                                <button className="btn" onClick={QuoteFunc}>Get New Qoute</button>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

