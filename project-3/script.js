const ingredientStack = [];

function addIngredient(type) {
  const stack = document.getElementById("ingredient-stack");

  const img = document.createElement("img");
  const sauceList = ["butter", "mayonnaise", "mustard", "ketchup", "peanutbutter", "nutella"];

  const isSauce = sauceList.includes(type);
  let imgSrc;

  if (isSauce) {
    const first = ingredientStack.length === 0;
    imgSrc = first ? `images/${type}.png` : `images/${type}-top.png`;
  } else {
    imgSrc = `images/${type}.png`;
  }

  img.src = imgSrc;
  img.alt = type;
  img.style.zIndex = ingredientStack.length + 2;
  img.classList.add("ingredient-image");

  ingredientStack.push(img);
  stack.appendChild(img);
}

function resetSandwich() {
  const stack = document.getElementById("ingredient-stack");
  stack.innerHTML = "";
  ingredientStack.length = 0;
}

function undoIngredient() {
  if (ingredientStack.length > 0) {
    const stack = document.getElementById("ingredient-stack");
    const last = ingredientStack.pop();
    stack.removeChild(last);
  }
}

function goHome() {
    const stackData = ingredientStack.map(img => img.src);
    localStorage.setItem("sandwich", JSON.stringify(stackData));
    window.location.href = "index.html";
  }
  
