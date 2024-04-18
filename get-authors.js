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

    async function populateDropdown(pageNumber = 1) {
        try {
            const response = await fetch(
                `https://api.quotable.io/authors?sortBy=name&page=${pageNumber}`
            );
            const data = await response.json();
            const results = data.results;

            if (response.ok) {
                authorsList.innerHTML = "";
                data.results.forEach((element) => {
                    const itemCount = results.length;
                    const numColumns = Math.ceil(itemCount / desiredRows);

                    container.style.columnCount = numColumns;

                    const authorLink = document.createElement("a");
                    authorLink.textContent = element.name;
                    authorLink.href = `https://api.quotable.io/random?author=${encodeURIComponent(
                        element.name
                    )}`;
                    authorLink.addEventListener("click", async (event) => {
                        event.preventDefault();
                        try {
                            const authorResponse = await fetch(authorLink.href);
                            const authorData = await authorResponse.json();
                            const anotherQuoteButton =
                                document.createElement("button");
                            anotherQuoteButton.textContent = "Get another one";
                            anotherQuoteButton.className = "button";

                            if (authorResponse.ok) {
                                authorsQuote.textContent = authorData.content;

                                container.innerHTML = "";
                                paginationContainer.innerHTML = "";

                                selectedAuthorTitle.textContent = `Random quote by ${authorData.author}`;
                                authorsMainDiv.appendChild(anotherQuoteButton);
                                anotherQuoteButton.addEventListener(
                                    "click",
                                    async () => {
                                        try {
                                            const randomQuoteResponse =
                                                await fetch(
                                                    `https://api.quotable.io/random?author=${encodeURIComponent(
                                                        authorData.author
                                                    )}`
                                                );
                                            const randomQuoteData =
                                                await randomQuoteResponse.json();
                                            if (randomQuoteResponse.ok) {
                                                authorsQuote.textContent = "";
                                                authorsQuote.textContent =
                                                    randomQuoteData.content;
                                            } else {
                                                console.error(randomQuoteData);
                                            }
                                        } catch (error) {
                                            console.error(error);
                                        }
                                    }
                                );
                            } else {
                                console.error(authorData);
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    });
                    const authorListItem = document.createElement("li");
                    authorListItem.appendChild(authorLink);
                    authorsList.appendChild(authorListItem);
                });

                // Pagination
                paginationContainer.innerHTML = "";

                // Previous page arrow
                const prevPageLink = document.createElement("a");
                prevPageLink.innerHTML = '<i class="fas fa-chevron-left"></i>';
                prevPageLink.href = `javascript:void(0);`;
                prevPageLink.addEventListener("click", () => {
                    populateDropdown(pageNumber - 1);
                });
                paginationContainer.appendChild(prevPageLink);

                // Page numbers
                for (let i = 1; i <= data.totalPages; i++) {
                    const pageLink = document.createElement("a");
                    pageLink.textContent = i;
                    pageLink.href = `javascript:void(0);`;
                    if (i > 1) {
                        pageLink.style.marginLeft = "10px";
                    }
                    pageLink.addEventListener("click", () => {
                        populateDropdown(i);
                    });
                    paginationContainer.appendChild(pageLink);
                }

                // Add next page arrow
                const nextPageLink = document.createElement("a");
                nextPageLink.innerHTML = '<i class="fas fa-chevron-right"></i>';
                nextPageLink.href = `javascript:void(0);`;
                nextPageLink.addEventListener("click", () => {
                    populateDropdown(pageNumber + 1);
                });
                paginationContainer.appendChild(nextPageLink);
            } else {
                console.error(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    populateDropdown();
});
