// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  // getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { auth, storeUserData } from "./exports.js";
const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login-form");

const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", toggleMenuMobile);

function toggleMenuMobile() {
  hamburger.classList.toggle("close");
  document.querySelector("ul.mobile-menu").classList.toggle("show-menu");
}

// const firebaseConfig = {
//   apiKey: "AIzaSyDcIymAjKOf0uYEZqMWETyN_uIB3DYb2L4",
//   authDomain: "university-student-blog.firebaseapp.com",
//   projectId: "university-student-blog",
//   storageBucket: "university-student-blog.appspot.com",
//   messagingSenderId: "879359471046",
//   appId: "1:879359471046:web:07c798436fd30c2931d6c7",
//   measurementId: "G-XS2VB3XJ8E",
// };
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const database = JSON.parse(localStorage.getItem("users"));
// let correctDetails = false;

login && login.addEventListener("submit", submit);

function submit(e) {
  e.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      storeUserData(userCredential.user);
      //consolelog("logged in");

      window.location.replace("/");
      // Signed in
      // const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      //consolelog(errorMessage);
    });
  // if (email && password) {
  //   database.forEach((user) => {
  //     if (user.email === email.value && user.password === password.value) {
  //       correctDetails = true;
  //       user.correctDetails = true;
  //     } else {
  //       user.correctDetails = false;
  //     }
  //   });
  //   localStorage.setItem("users", JSON.stringify(database));
  // }

  // if (correctDetails) {
  // } else {
  //   //consolelog("incorrect details");
  // }
}
