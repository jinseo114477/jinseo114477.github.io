// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCv187JHuSoN_0ahDMAS_Goy1HZx64AnXE",
    authDomain: "cooper-image-hub.firebaseapp.com",
    projectId: "cooper-image-hub",
    storageBucket: "cooper-image-hub.appspot.com", // ✅ corrected domain
    messagingSenderId: "760469167320",
    appId: "1:760469167320:web:3a69e38627e7947aeecbad",
    measurementId: "G-SLWXW38BMG"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  
  // DOM references
  const fileInput = document.getElementById("fileInput");
  const uploadButton = document.getElementById("uploadButton");
  const gallery = document.getElementById("gallery");
  
  // Upload logic
  uploadButton.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }
  
    const storageRef = storage.ref("images/" + file.name);
    const uploadTask = storageRef.put(file);
  
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload failed:", error);
        alert("Something went wrong.");
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          displayImage(downloadURL);
        });
      }
    );
  });
  
  // Show image on page
  function displayImage(url) {
    const img = document.createElement("img");
    img.src = url;
    img.style.width = "200px";
    img.style.margin = "10px";
    gallery.appendChild(img);
  }
  