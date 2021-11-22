function showDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("recipe");

  fetch(`api/recipes/${recipeId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((recipe) => renderRecipe(recipe));
}

function renderRecipe(recipe) {
  const { image, title, author, description } = recipe;

  editForm.title.value = title;
  editForm.author.value = author === undefined ? "Anonymous" : author;
  editForm.image.value = image;
  editForm.description.value = description;

  const recipeContainer = document.querySelector(".recipe");

  recipeContainer.innerHTML = `
    <img src="img/${image}" />
    <h3>${title}</h3>
    <h4>${author === undefined ? "Anonymous" : author}</h4>
    <p>${description}</p>
    <a href="/">Back</a>
    `;
}

const updateRecipe = (event) => {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("recipe");
  const { title, author, image, description } = event.target;
  const updatedRecipe = {
    _id: recipeId,
    title: title.value,
    author: author.value,
    image: image.value,
    description: description.value,
  };
  fetch(`api/recipes/${recipeId}`, {
    method: "PUT",
    body: JSON.stringify(updatedRecipe),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(showDetail);
};

const editForm = document.querySelector("#editForm");
editForm.addEventListener("submit", updateRecipe);

showDetail();
