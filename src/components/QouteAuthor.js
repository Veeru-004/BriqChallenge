import React, { useState, useEffect, useCallback } from 'react';
import { Rating } from 'react-simple-star-rating'
import '../App.css';

export default function Quote1() {

    //To set the selected author once the rating changed
    const [selectedAuthor, getAuthor] = useState(" ");

    //To set the quote based on author selection
    const [quote, setQuote] = useState(" ");

    //To set the rating value based on the rating
    const [rating, setRating] = useState(0);


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
        fetch("https://type.fit/api/quotes")
            .then(response => response.json())
            .then((data) => {
                var filteredArray = data.filter(a => a.author === selectedAuthor);
                if (filteredArray.length === 1 || rating < 4) {
                    let randomNum = Math.floor(Math.random() * data.length);
                    setQuote(data[randomNum]);
                }
                else {
                    let randomNum = Math.floor(Math.random() * filteredArray.length);
                    setQuote(filteredArray[randomNum]);
                }
            }
                , setRating(0)
            )
    }
    useEffect(() => {
        getQoute();
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
                                <button className="btn" onClick={getQoute}>Get New Qoute</button>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>



        </>
    );
}

