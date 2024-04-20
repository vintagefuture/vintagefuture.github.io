const author = "ralph-waldo-emerson";
const authorButton = document.getElementById("featured-author-button");
const featuredQuote = document.getElementById("featured-quote");

fetch(`https://api.quotable.io/authors/slug/${author}`)
    .then((response) => response.json())
    .then((data) => {
        const bio = data.bio;
        const bioParagraph = document.getElementById("featured-author-bio");
        bioParagraph.textContent = bio;

        const author = data.name;
        const authorHeading = document.getElementById("author-heading");
        authorHeading.textContent = author;

        const description = data.description;
        const featuredSubheading = document.getElementById(
            "featured-subheading"
        );
        featuredSubheading.textContent = description;

        authorButton.addEventListener("click", async () => {
            try {
                const randomQuoteResponse = await fetch(
                    `https://api.quotable.io/random?author=${author}`
                );
                const randomQuoteData = await randomQuoteResponse.json();
                if (randomQuoteResponse.ok) {
                    bioParagraph.textContent = "";
                    bioParagraph.textContent = randomQuoteData.content;
                } else {
                    console.error(randomQuoteData);
                }
            } catch (error) {
                console.error(error);
            }
        });
    })
    .catch((error) => {
        console.error("Error fetching author bio:", error);
    });
