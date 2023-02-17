// Get references to the HTML form and input fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');

// Add an event listener to the form's submit button
signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Create an object to store the user's data
  const newUser = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    password: passwordInput.value,
  };

  try {
    // Send a POST request to the /signup endpoint with the user's data
    const response = await axios.post('http://localhost:5000/signup', newUser);
    
    // Display a success message to the user
    alert(response.data.message);
    
    // Clear the form inputs
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    passwordInput.value = '';
  } catch (error) {
    // Display an error message to the user
    alert(error.response.data.message);
  }
});
