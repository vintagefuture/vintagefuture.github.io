document.addEventListener("DOMContentLoaded", () => {
  // DOM elements

  async function getCategories() {
    try {
      // Fetch the list of categories from the Quotable API
      const response = await fetch(
        "https://api.quotable.io/tags?sortBy=name&order=1"
      );
      const data = await response.json();

      if (response.ok) {
        // Extract category names and join them into a string
        const categoryNames = data.map((category) => capitalize(category.name));
        // Update DOM element with the category names
        createColumnsFromArray(categoryNames);
      } else {
        categories.textContent = "An error occurred";
        console.log(data);
      }
    } catch (error) {
      categories.textContent = "An error occurred";
      console.error(error);
    }

    function createColumnsFromArray(array) {
      var columnsContainer = document.getElementById("columnsContainer");

      array.forEach(function (element) {
        var columnDiv = document.createElement("div");
        columnDiv.classList.add("column");
        columnDiv.textContent = element;
        columnsContainer.appendChild(columnDiv);
      });
    }
  }
  // call getCategories once when page loads
  getCategories();
});

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
