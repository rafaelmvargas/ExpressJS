function getRecipes() {
  document.querySelector(".recipes").innerHTML = ``;
  fetch(`./api/recipes`)
    .then((response) => response.json())
    .then((data) => data.sort((a, b) => +b.year - +a.year))
    .then((recipes) => renderRecipes(recipes));
}

function addRecipe(event) {
  event.preventDefault();
  const { title, image, year, description } = event.target;
  const recipe = {
    title: title.value,
    author: author.value,
    image: image.value,
    year: year.value,
    description: description.value,
  };
  fetch("./api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
    .then((response) => response.json())
    .then(getRecipes);
}

function renderRecipes(recipes) {
  recipes.reverse().forEach((recipe) => {
    // destructure
    const { _id, title, image, year, description } = recipe;
    recipeEl = document.createElement("div");

    recipeEl.innerHTML = `
    <img src="img/${image}" />
    <h3><a href="detail.html?recipe=${_id}">${title}</a></h3>
        <p>${description}</p>
    <p>${year}</p>
    <button class="delete" data-id=${_id} href="#">Delete</button>
  `;

    return document.querySelector(".recipes").append(recipeEl);
  });
}

function deleteRecipe(event) {
  fetch(`./api/recipes/${event.target.dataset.id}`, {
    method: "DELETE",
  }).then(getRecipes());
}

// new
function seed() {
  fetch("./api/import").then(getRecipes);
}

function handleClicks(event) {
  if (event.target.matches("[data-id]")) {
    deleteRecipe(event);
  } else if (event.target.matches("#seed")) {
    seed();
  }
}

document.addEventListener("click", handleClicks);

const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", addRecipe);

getRecipes();
