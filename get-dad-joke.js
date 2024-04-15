const button = document.querySelector("button");
const quote = document.querySelector("blockquote p");
const cite = document.querySelector("blockquote cite");

async function updateQuote() {
  fetch("https://icanhazdadjoke.com/", {
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
      quote.textContent = data.joke;
      console.log(data.joke);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Attach an event listener to the `button`
button.addEventListener("click", updateQuote);
