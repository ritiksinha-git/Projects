// Get the user list and chat window elements
const userListEl = document.getElementById("user-list");
const chatBodyEl = document.getElementById("chat-body");
const otherUserEl = document.getElementById("other-user");

// Get the message input and send button elements
const messageInputEl = document.getElementById("message-input");
const sendBtnEl = document.getElementById("send-btn");

// Store the current user and other user's name
let currentUser = "";
let otherUser = "";

// Display a list of logged-in users
const displayUsers = (users) => {
  // Clear the existing user list
  userListEl.innerHTML = "";

  // Loop through the users and create a list item for each user
  users.forEach((user) => {
    // Skip the current user
    if (user !== currentUser) {
      const li = document.createElement("li");
      li.innerText = user;

      // Add a click event listener to the list item
      li.addEventListener("click", () => {
        otherUser = user;
        otherUserEl.innerText = otherUser;

        // Clear the chat body
        chatBodyEl.innerHTML = "";
      });

      userListEl.appendChild(li);
    }
  });
};

// Add a message to the chat body
const addMessage = (message, sender) => {
  const p = document.createElement("p");
  p.innerText = `${sender}: ${message}`;
  chatBodyEl.appendChild(p);
};

// Send a message to the other user
