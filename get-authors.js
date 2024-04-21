document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("authors-div");
    const authorsList = document.getElementById("authors-list");
    const paginationContainer = document.getElementById("pagination");
    const authorsQuote = document.getElementById("authors-quote");
    const selectedAuthorTitle = document.getElementById(
        "selected-author-title"
    );
    const authorsMainDiv = document.getElementById("authors-main-div");
    const desiredRows = 5;

    async function populateList(pageNumber = 1) {
        try {
            // Get the list of authors
            const response = await fetch(
                `https://api.quotable.io/authors?sortBy=name&page=${pageNumber}`
            );
            const data = await response.json();
            const results = data.results;

            fetch(
                `https://api.quotable.io/authors?sortBy=name&page=${pageNumber}`
            )
                .then((response) => response.json())
                .then((data) => {
                    const results = data.results;
                })
                .catch((error) => {
                    console.error(
                        "There was a problem with the fetch operation:",
                        error
                    );
                });

            if (response.ok) {
                authorsList.innerHTML = "";
                results.forEach((element) => {
                    // Calculate the number of columns necessary for each page
                    const itemCount = results.length;
                    const numColumns = Math.ceil(itemCount / desiredRows);
                    container.style.columnCount = numColumns;

                    // Create a hyperlink for each author
                    const authorLink = document.createElement("a");
                    authorLink.textContent = element.name;
                    authorLink.title = element.bio;
                    authorLink.href = `https://api.quotable.io/random?author=${element.slug}`;

                    // Add the link to the existing unordered list
                    const authorListItem = document.createElement("li");
                    authorListItem.appendChild(authorLink);
                    authorsList.appendChild(authorListItem);

                    // Re-render the page when clicking on an author
                    authorLink.addEventListener("click", async (event) => {
                        event.preventDefault();

                        fetch(authorLink.href)
                            .then((authorResponse) => authorResponse.json())
                            .then((authorData) => {
                                // Add another quote button
                                const anotherQuoteButton =
                                    document.createElement("button");
                                anotherQuoteButton.textContent =
                                    "Get another one";
                                anotherQuoteButton.className = "button";
                                anotherQuoteButton.addEventListener(
                                    "click",
                                    () => {
                                        fetch(
                                            `https://api.quotable.io/random?author=${element.slug}`
                                        )
                                            .then((randomQuoteResponse) =>
                                                randomQuoteResponse.json()
                                            )
                                            .then((randomQuoteData) => {
                                                authorsQuote.textContent = "";
                                                authorsQuote.textContent =
                                                    randomQuoteData.content;
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            });
                                    }
                                );

                                // Add back button
                                const backButton =
                                    document.createElement("button");
                                backButton.textContent = "Back";
                                backButton.className = "button";
                                backButton.style.marginTop = "5px";
                                backButton.addEventListener("click", () => {
                                    window.location.href = "./authors.html";
                                });

                                // Clears out previous content
                                container.innerHTML = "";
                                paginationContainer.innerHTML = "";

                                // Fills the page with selected author's random quote
                                authorsQuote.textContent = authorData.content;
                                selectedAuthorTitle.textContent = `Random quote by ${authorData.author}`;
                                const blockquoteElement =
                                    document.querySelector("blockquote");
                                authorsMainDiv.insertBefore(
                                    anotherQuoteButton,
                                    blockquoteElement
                                );
                                authorsMainDiv.insertBefore(
                                    backButton,
                                    blockquoteElement
                                );
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    });
                });

                // Pagination
                paginationContainer.innerHTML = "";

                // Previous page arrow
                const prevPageLink = document.createElement("a");
                prevPageLink.innerHTML = '<i class="fas fa-chevron-left"></i>';
                prevPageLink.href = `javascript:void(0);`;
                prevPageLink.addEventListener("click", () => {
                    populateList(pageNumber - 1);
                });
                paginationContainer.appendChild(prevPageLink);

                // Page numbers
                for (let i = 1; i <= data.totalPages; i++) {
                    const pageLink = document.createElement("a");
                    pageLink.textContent = i;
                    pageLink.href = `javascript:void(0);`;
                    pageLink.style.marginLeft = "10px";
                    pageLink.addEventListener("click", () => {
                        populateList(i);
                    });
                    paginationContainer.appendChild(pageLink);
                }

                // Add next page arrow
                const nextPageLink = document.createElement("a");
                nextPageLink.innerHTML = '<i class="fas fa-chevron-right"></i>';
                nextPageLink.href = `javascript:void(0);`;
                nextPageLink.addEventListener("click", () => {
                    populateList(pageNumber + 1);
                });
                paginationContainer.appendChild(nextPageLink);
            } else {
                console.error(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    populateList();
});
