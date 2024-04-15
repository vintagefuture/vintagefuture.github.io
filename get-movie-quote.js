const movieQuoteParagraph = document.getElementById("movie-quote");
const quoteFromFooter = document.getElementById("quoteFrom");
const movieQuoteButton = document.getElementById("movie-quote-button");

async function getMovieQuote() {
    const url =
        "https://movie-and-tv-shows-quotes.p.rapidapi.com/quotes/random/quote";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "36f4fc788emsh2ff407b3cec6a59p1ef96cjsnf9418516d502",
            "X-RapidAPI-Host": "movie-and-tv-shows-quotes.p.rapidapi.com",
        },
    };

    try {
        const movieQuoteResult = await fetch(url, options);
        const movie = await movieQuoteResult.json();
        movieQuoteParagraph.textContent = movie.quote;
        quoteFromFooter.innerHTML = `${"<i>" + movie.actor + "</i>"} in ${
            "<i>" + movie.quoteFrom + "</i>"
        }`;
        console.log("quote: ", movie.quote);
        console.log("movie: ", movie.quoteFrom);
        console.log("actor: ", movie.actor);
    } catch (error) {
        console.error(error);
    }
}

// Attach an event listener to movieQuoteButton
movieQuoteButton.addEventListener("click", getMovieQuote);
