const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');

// Get username and token from local storage
const username = localStorage.getItem('username');
const token = localStorage.getItem('token');

if (!token || !username) {
  // Redirect to login page or show error message
  window.location.href = 'login.html';
}

// Set up authorization headers for Axios requests
axios.defaults.headers.common['Authorization'] = token;

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message !== '') {
    sendMessage(message, username);
  }
  messageInput.value = '';
});

async function sendMessage(message, username) {
  const payload = { message, username };
  try {
    const response = await axios.post('http://localhost:3000/message/chat', payload);
    if (response.status === 200) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;
      messagesDiv.appendChild(messageElement);
    }
  } catch (error) {
    console.error(error);
    // Display error message to user
  }
}
