document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("authors-div");
    const authorsList = document.getElementById("authors-list");

    const desiredRows = 5;

    async function populateDropdown() {
        try {
            const response = await fetch(
                "https://api.quotable.io/authors?sortBy=name&page=2"
            );
            const data = await response.json();
            const results = data.results;

            if (response.ok) {
                data.results.forEach((element) => {
                    const itemCount = results.length;
                    const numColumns = Math.ceil(itemCount / desiredRows);

                    container.style.columnCount = numColumns;

                    const authorLink = document.createElement("a");
                    authorLink.textContent = element.name;
                    authorLink.href = `https://api.quotable.io/random?author=${encodeURIComponent(
                        element.name
                    )}`;
                    const authorListItem = document.createElement("li");
                    authorListItem.appendChild(authorLink);
                    authorsList.appendChild(authorListItem);
                });
            } else {
                console.error(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    populateDropdown();
});
