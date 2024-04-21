const dadJokeButton = document.getElementById("dad-joke-button");
const dadJoke = document.getElementById("dad-joke");

async function getDadJokeQuote() {
    fetch("https://icanhazdadjoke.com/", {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Parse the response as JSON
        })
        .then((data) => {
            // Data will contain the random joke
            dadJoke.textContent = data.joke;
            console.log(data.joke);
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}

// Attach an event listener to dadJokeButton
dadJokeButton.addEventListener("click", getDadJokeQuote);
