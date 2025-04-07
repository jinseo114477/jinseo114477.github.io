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
  const file = fileInput.files[0]; // Get the first selected file
  if (!file) {
    alert("Please select an image to upload.");
    return; // Exit if no file is selected
  }

  // Create a reference to Firebase Storage
  const storageRef = storage.ref('images/' + file.name);

  // Upload the file to Firebase Storage
  const uploadTask = storageRef.put(file);

  // Monitor the upload process
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // You can track the upload progress here if you want (optional)
      // Example: Calculate percentage progress
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      // Handle upload error
      console.error("Upload failed:", error);
      alert("Something went wrong while uploading the image.");
    },
    () => {
      // On successful upload, get the image URL and display it
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        displayImage(downloadURL);
      });
    }
  );
});

// Show the uploaded image on the page
function displayImage(url) {
  const img = document.createElement("img");
  img.src = url; // Set the image source to the Firebase download URL
  img.style.width = "200px"; // Set the width of the image
  img.style.margin = "10px"; // Add some spacing around the image
  gallery.appendChild(img); // Append the image to the gallery
}
