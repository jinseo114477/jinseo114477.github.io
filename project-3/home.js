const savedSandwich = JSON.parse(localStorage.getItem("sandwich"));

if (savedSandwich && savedSandwich.length > 0) {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "flex";

  const container = document.getElementById("final-sandwich");

  savedSandwich.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;

    // Check if the image source is a valid sandwich image (not an icon)
    if (src.includes("images/") && !src.includes("icon")) {
      img.style.position = "absolute";
      img.style.width = "100%"; // Adjust width as needed
      img.style.zIndex = i + 1;
      img.classList.add("ingredient-image");

      // Append the image to the final sandwich container
      container.appendChild(img);
    }
  });
}

function makeAnother() {
  localStorage.removeItem("sandwich");
  window.location.href = "builder.html";
}
