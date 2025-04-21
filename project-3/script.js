const ingredientStack = [];

function addIngredient(type) {
  const stack = document.getElementById("ingredient-stack");

  // Create new image element
  const img = document.createElement("img");
  
  const isSauce = ["mayo", "mustard", "peanutbutter", "ketchup"].includes(type);

  // If it's a sauce, choose round or squeezed image
  if (isSauce) {
    const first = ingredientStack.length === 0;
    const shape = first ? "round" : "squeezed";
    img.src = `images/${type}-${shape}.png`;
  } else {
    img.src = `images/${type}.png`;
  }

  img.alt = type;
  img.style.zIndex = ingredientStack.length + 2;

  ingredientStack.push(type);
  stack.appendChild(img);
}
