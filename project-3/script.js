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


  saveSandwichToLocalStorage();
}

function saveSandwichToLocalStorage() {
  const savedIngredients = ingredientStack.map(img => img.src);
  localStorage.setItem("sandwich", JSON.stringify(savedIngredients));
}

function resetSandwich() {
  const stack = document.getElementById("ingredient-stack");
  stack.innerHTML = "";
  ingredientStack.length = 0;
  localStorage.removeItem("sandwich");
}

function undoIngredient() {
  if (ingredientStack.length > 0) {
    const stack = document.getElementById("ingredient-stack");
    const last = ingredientStack.pop();
    stack.removeChild(last);
    saveSandwichToLocalStorage(); 
  }
}


function saveSandwich() {
  const sandwichImages = ingredientStack.map(img => img.src);
  localStorage.setItem("sandwich", JSON.stringify(sandwichImages));
  window.location.href = "result.html"; 
}

function goHome() {
    const srcList = ingredientStack.map(img => img.src);
    localStorage.setItem("sandwich", JSON.stringify(srcList));
    window.location.href = "index.html";
  }
