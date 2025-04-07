const firebaseConfig = {
    apiKey: "AIzaSyCv187JHuSoN_0ahDMAS_Goy1HZx64AnXE",
    authDomain: "cooper-image-hub.firebaseapp.com",
    databaseURL: "https://cooper-image-hub-default-rtdb.firebaseio.com",
    projectId: "cooper-image-hub",
    storageBucket: "cooper-image-hub.appspot.com",
    messagingSenderId: "760469167320",
    appId: "1:760469167320:web:3a69e38627e7947aeecbad"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const storage = firebase.storage();
  const database = firebase.database();
  
  const nameInput = document.getElementById("nameInput");
  const majorSelect = document.getElementById("majorSelect");
  const fileInput = document.getElementById("fileInput");
  const uploadButton = document.getElementById("uploadButton");
  const gallery = document.getElementById("gallery");
  
  uploadButton.addEventListener("click", () => {
    const name = nameInput.value;
    const major = majorSelect.value;
    const file = fileInput.files[0];
  
    if (!name || !major || !file) {
      alert("Please fill in all fields and select an image.");
      return;
    }
  
    const storageRef = storage.ref('images/' + file.name);
    const uploadTask = storageRef.put(file);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        alert("Something went wrong while uploading the image.");
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const userData = {
            name: name,
            major: major,
            imageUrl: downloadURL
          };
  
          const ref = database.ref("imageCooper");
          ref.push(userData);
  
          displayImage(downloadURL);
        });
      }
    );
  });
  

  function displayImage(url) {
    const img = document.createElement("img");
    img.src = url;
    img.style.width = "200px";
    img.style.margin = "10px";
    gallery.appendChild(img);
  }
  