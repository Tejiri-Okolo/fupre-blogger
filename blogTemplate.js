import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  collection,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { db } from "./exports.js";
import { getUserData } from "./exports.js";

const postRef = collection(db, "posts");
// const querySnapshot = getDocs(postRef);
// const posts = querySnapshot.docs.map((doc) => doc.data());

export async function uploadNewPost(post) {
  const userData = getUserData();
  const userRef = doc(db, "users", userData.uid);
  const userDoc = await getDoc(userRef);
  const user = await userDoc.data();

  await addDoc(postRef, {
    ...post,
    diplayImage: user.profilePicture,
    date: new Date().toLocaleString(),
    username: user.fullName,
  });
  //consolelog("Post added");
}

export async function getPosts() {
  const querySnapshot = await query(postRef, orderBy("date", "desc"));
  const posts = (await getDocs(querySnapshot)).docs.map((doc) => doc.data());
  return posts;
}

// REFERENCE
// tweets.innerHTML = tweetsOutput;
// document.querySelector(`#comments-${index} .container .content`).innerText = data.content;

// const blogTemplate = `<div class="blog-box">
//     <h2 class="blog-heading></h2>

//   <div class="blog-img">
//     <i class="fa fa-user-circle-o" aria-hidden="true"></i>
//   </div>
//   <p>
//     <strong>Posted by:</strong><br />
//     <strong>Date:</strong>
//   </p>

//   <p class="truncate">
//   </p>
//   <button class="show-more">
//     show more
//   </button>
//   <button class="show-less invisible">
//     show less
//   </button>
// </div>`;
// `<img src="../assets/images/user2.jpeg" alt="Profile Picture" />`

export const tempBlog = ({ title, displayImage, username, content, date }) => {
  const img = document.createElement("img");
  img.src = "./assets/images/User2.jpeg";
  img.alt = "Profile Picture";
  return `
  <div class="blog-box">
    <div class="blog-flex">
    <h2 class="blog-heading">${title}</h2>
    <div class="blog-img">
      ${displayImage ? `<img src=${displayImage} alt=''/>` : img.outerHTML}
    </div>
    </div>
    <p>
      <strong>Posted by: ${username}</strong><br />
      <strong>Date:${date}</strong>
    </p>
    <p class="text truncate">
      ${content}
    </p>
    <button class="show-more">
      show more
    </button>
    <button class="show-less invisible ">
      show less
    </button>
  </div>`;
};

export const postTemplate = ({ title }) => {
  return `
  <li>
    <a href="/post.html?title=${title}">
      ${title}
      </a>
      </li>`;
};
