import React, { useState, useEffect } from 'react';
import './styles.css';
import '../HomePage/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const GoT = () => {
    const [quoteText, setQuote] = useState({
        sentence: "",
        name: "",
        house: "",
    });
    useEffect(() => {
        fetch('https://game-of-thrones-quotes.herokuapp.com/v1/random')
            .then(response => response.json())
            .then(data => setQuote({
                sentence: data.sentence,
                name: data.character.name,
                house: data.character.house.name
             }))
    }, []);

    const [namedOne, setName] = useState("")
    useEffect(() => {
            if (quoteText.house === "null") {
                setName(quoteText.name)
            } else {
                setName(quoteText.name + " of " + quoteText.house)
            }
    }, [quoteText])
    
    return (
        <div>
            <div className="container headercontent" id="GOT">
                <span className="quote text-center">"{quoteText.sentence}"</span><br />
                <span className="author text-center">- {namedOne} </span>
            </div>
        </div>
    )
}

export default GoT;