document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const button = document.querySelector("button");
    const quote = document.querySelector("blockquote p");
    const cite = document.querySelector("blockquote cite");

    async function updateQuote() {
        const url =
            "https://movie-and-tv-shows-quotes.p.rapidapi.com/quotes/random/quote";
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key":
                    "21bc052652msh29e5d448cb9a74cp1e9610jsn4838a37cd1a6",
                "X-RapidAPI-Host": "movie-and-tv-shows-quotes.p.rapidapi.com",
            },
        };

        // Fetch a random quote from the Quotable API
        const response = await fetch(url, options);

        // Parse the response
        const data = await response.text();

        if (response.ok) {
            // Update DOM elements
            quote.textContent = data.content;
            cite.textContent = data.author;
        } else {
            quote.textContent = "An error occured";
            console.log(data);
        }
    }

    // Attach an event listener to the `button`
    button.addEventListener("click", updateQuote);

    // call updateQuote once when page loads
    updateQuote();
});
