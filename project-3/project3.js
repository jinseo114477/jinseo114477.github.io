// Set up Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCv187JHuSoN_0ahDMAS_Goy1HZx64AnXE",
    authDomain: "cooper-image-hub.firebaseapp.com",
    projectId: "cooper-image-hub",
    storageBucket: "cooper-image-hub.appspot.com"
  };
  
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  
  const fileInput = document.getElementById("fileInput");
  const uploadButton = document.getElementById("uploadButton");
  const gallery = document.getElementById("gallery");
  
  // Upload image when button is clicked
  uploadButton.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) {
      alert("Pick a file first");
      return;
    }
  
    const ref = storage.ref("images/" + file.name);
    ref.put(file).then(snapshot => {
      return snapshot.ref.getDownloadURL();
    }).then(showImage).catch(err => {
      console.error("Upload failed:", err);
      alert("Upload failed!");
    });
  });
  
  function showImage(url) {
    const img = document.createElement("img");
    img.src = url;
    img.style.width = "200px";
    img.style.margin = "10px";
    gallery.appendChild(img);
  }
  