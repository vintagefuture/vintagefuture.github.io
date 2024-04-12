document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const authorsDropdown = document.getElementById("authors");
  const generateQuoteBtn = document.getElementById("generateQuoteBtn");
  const quote = document.querySelector("blockquote p");
  const cite = document.querySelector("blockquote cite");

  async function updateQuote() {
    const authors = authorsDropdown.value;
    // Fetch a random quote for the selected category
    const response = await fetch(`https://api.quotable.io/authors`);
    const data = await response.json();
    if (response.ok) {
      // Update DOM elements
      quote.textContent = data.content;
      cite.textContent = data.author;
    } else {
      quote.textContent = "An error occurred";
      console.log(data);
    }
  }

  async function populateDropdown() {
    try {
      // Fetch the list of categories from the Quotable API
      const response = await fetch("https://api.quotable.io/authors");
      const data = await response.json();

      if (response.ok) {
        // Extract category names and populate the dropdown menu
        data.forEach((author) => {
          const option = document.createElement("option");
          option.value = author.name;
          option.textContent = capitalize(category.name);
          authorDropdown.appendChild(option);
        });
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Attach event listener to the dropdown for change event
  // categoryDropdown.addEventListener("change", updateQuote);

  // Attach event listener to the button for click event
  // generateQuoteBtn.addEventListener("click", updateQuote);

  // call populateDropdown once when page loads
  populateDropdown();
});

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
