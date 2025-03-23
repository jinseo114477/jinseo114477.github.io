document.addEventListener("DOMContentLoaded", function () {
    const textElements = document.querySelectorAll(".text-scale");

    // window.addEventListener("scroll", function () {
    //     let scrollPos = window.scrollY;

    //     textElements.forEach((element, index) => {
    //         // Scale effect based on scroll position
    //         let scaleFactor = 1 + (scrollPos / 500);
    //         element.style.transform = `scale(${scaleFactor})`;

    //         // Reverse mirror effect for odd elements
    //         if (index % 2 === 0) {
    //             element.style.transform += " scaleX(-1)";
    //         }
    //     });
    // });
    let textContainer = document.getElementById("text-scale"); // Get the container
    let fontSize = 38;
    let minSize = 6;
    
    for (let i = fontSize; i >= minSize; i -= 2) {
        let paragraph = document.createElement("p");
        paragraph.textContent = "JINSEO LEE Advanced Design : Product Design Spring 2025 Home"; // Corrected
        paragraph.style.fontSize = i + "px"; // Corrected
        paragraph.style.margin = "3px 0";
    
        textContainer.appendChild(paragraph); // Append to the correct container
    }
    

    
    let textContainer2 = document.getElementById("text-scale-mirrored"); 
    let fontSize2 = 6;
    let maxSize2 = 38;
    
    for (let i = fontSize2; i <= maxSize2; i += 2) {
        let second = document.createElement("p");
        second.textContent = "JINSEO LEE Advanced Design : Product Design Spring 2025 One"; // Corrected
        second.style.fontSize = i + "px"; // Corrected
        second.style.margin = "2px 0";
    
        second.style.transform = "scaleX(-1)";
        second.style.transform = "scaleY(-1)";
    
        textContainer2.appendChild(second); // Append to the correct container
    }



    let textContainer3 = document.getElementById("text-scale1"); // Get the container
    let fontSize3 = 38;
    let minSize3 = 6;
    
    for (let i = fontSize3; i >= minSize3; i -= 2) {
        let third = document.createElement("p");
        third.textContent = "JINSEO LEE Advanced Design : Product Design Spring 2025 One"; // Corrected
        third.style.fontSize = i + "px"; // Corrected
        third.style.margin = "2px 0";
    
        textContainer3.appendChild(third); // Append to the correct container
    }
    


    let textContainer4 = document.getElementById("text-scale-mirrored1"); 
    let fontSize4 = 6;
    let maxSize4 = 38;
    
    for (let i = fontSize4; i <= maxSize4; i += 2) {
        let four = document.createElement("p");
        four.textContent = "JINSEO LEE Advanced Design : Product Design Spring 2025 Two"; // Corrected
        four.style.fontSize = i + "px"; // Corrected
        four.style.margin = "2px 0";
    
        four.style.transform = "scaleX(-1)";
        four.style.transform = "scaleY(-1)";
    
        textContainer4.appendChild(four); // Append to the correct container
    }



    
    let textContainer5 = document.getElementById("text-scale2"); // Get the container
    let fontSize5 = 38;
    let minSize5 = 6;
    
    for (let i = fontSize5; i >= minSize5; i -= 2) {
        let five = document.createElement("p");
        five.textContent = "JINSEO LEE Advanced Design : Product Design Spring 2025 Two"; // Corrected
        five.style.fontSize = i + "px"; // Corrected
        five.style.margin = "2px 0";
    
        textContainer5.appendChild(five); // Append to the correct container
    }




    let textContainer6 = document.getElementById("text-scale-mirrored2"); 
    let fontSize6 = 6;
    let maxSize6 = 38;
    
    for (let i = fontSize6; i <= maxSize6; i += 2) {
        let six = document.createElement("p");
        six.textContent = "JINSEO LEE Advanced Design : Product Design Spring 2025 Two"; // Corrected
        six.style.fontSize = i + "px"; // Corrected
        six.style.margin = "2px 0";
    
        six.style.transform = "scaleX(-1)";
        six.style.transform = "scaleY(-1)";
    
        textContainer6.appendChild(six); // Append to the correct container
    }



    let textContainer7 = document.getElementById("text-scale3"); // Get the container
    let fontSize7 = 38;
    let minSize7 = 6;
    
    for (let i = fontSize7; i >= minSize7; i -= 2) {
        let seven = document.createElement("p");
        seven.textContent = "JINSEO LEE Advanced Design : Product Design Spring 2025 Three"; // Corrected
        seven.style.fontSize = i + "px"; // Corrected
        seven.style.margin = "2px 0";
    
        textContainer7.appendChild(seven); // Append to the correct container
    }




    let textContainer8 = document.getElementById("text-scale-mirrored3"); 
    let fontSize8 = 6;
    let maxSize8 = 38;
    
    for (let i = fontSize8; i <= maxSize8; i += 2) {
        let eight = document.createElement("p");
        eight.textContent = "JINSEO LEE Advanced Design : Product Design Spring 2025 Three"; // Corrected
        eight.style.fontSize = i + "px"; // Corrected
        eight.style.margin = "2px 0";
    
        eight.style.transform = "scaleX(-1)";
        eight.style.transform = "scaleY(-1)";
    
        textContainer8.appendChild(eight); 
    }



    let textContainer9 = document.getElementById("text-scale4"); // Get the container
    let fontSize9 = 38;
    let minSize9 = 6;
    
    for (let i = fontSize9; i >= minSize9; i -= 2) {
        let nine = document.createElement("p");
        nine.textContent = "JINSEO LEE Advanced Design : Product Design Spring 2025 Three"; // Corrected
        nine.style.fontSize = i + "px"; // Corrected
        nine.style.margin = "2px 0";
    
        textContainer9.appendChild(nine); // Append to the correct container
    }

});
