document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("authors-div");
    const authorsList = document.getElementById("authors-list");
    const paginationContainer = document.getElementById("pagination");

    const desiredRows = 6;

    async function populateDropdown(pageNumber = 1) {
        try {
            const response = await fetch(
                `https://api.quotable.io/authors?sortBy=name&page=${pageNumber}`
            );
            const data = await response.json();
            const results = data.results;

            if (response.ok) {
                authorsList.innerHTML = ""; // Clear previous list items
                data.results.forEach((element) => {
                    const itemCount = results.length;
                    const numColumns = Math.ceil(itemCount / desiredRows);

                    container.style.columnCount = numColumns;

                    const authorLink = document.createElement("a");
                    authorLink.textContent = element.name;
                    authorLink.href = `https://api.quotable.io/random?author=${encodeURIComponent(
                        element.name
                    )}`; // Constructing the link with the author's name
                    authorLink.style.color = "inherit"; // Setting color to inherit to remove default blue color
                    const authorListItem = document.createElement("li");
                    authorListItem.appendChild(authorLink);
                    authorsList.appendChild(authorListItem);
                });

                // Remove margin and padding from the ul element
                authorsList.style.margin = "0";
                authorsList.style.padding = "0";

                // Pagination
                paginationContainer.innerHTML = ""; // Clear previous pagination links
                for (let i = 1; i <= data.totalPages; i++) {
                    const pageLink = document.createElement("a");
                    pageLink.textContent = i;
                    pageLink.href = `javascript:void(0);`; // Update this with actual pagination link
                    pageLink.style.color = "inherit"; // Remove default color
                    pageLink.style.textDecoration = "none"; // Remove default text decoration
                    if (i > 1) {
                        pageLink.style.marginLeft = "5px"; // Add some spacing between page numbers
                    }
                    pageLink.addEventListener("click", () => {
                        populateDropdown(i);
                    });
                    paginationContainer.appendChild(pageLink);
                }
            } else {
                console.error(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    populateDropdown();
});
