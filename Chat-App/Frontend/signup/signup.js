function signupForm(event) {
    event.preventDefault(); // prevent the form from submitting in the default way
  
    // Get the input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const user = {
      name,
      email,
      phone,
      password
    }
    axios.post('http://localhost:3000/user/signup', user)
      .then(function (response) {
        // If the server responds with a success message, redirect to the login page
        window.location.href = '../login/login.html';
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  
  // Get the form element and add a submit event listener
  const form = document.querySelector('form');
  form.addEventListener('submit', signupForm);
  