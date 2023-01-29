async function login(event) {
    event.preventDefault();

    try {
        // Get user input
        const userEmail = document.getElementById('email').value;
        const userPassword = document.getElementById('password').value;
    
        // Create user object
        const loginDetails = {
            email: userEmail,
            password: userPassword
        };
    
        // Make Axios POST request to localhost:2000/user/login
        const response = await axios.post('http://localhost:2000/user/login', loginDetails);
        if (response.status === 200) {
            // Redirect to homepage
            window.location.href = "../homepage/home.html"
        } else if(response.status === 401){
            alert(response.data.message);
        } else {
            throw new Error('Failed to Login')
        }
    } catch (error) {
        console.log(error);
        alert('Error logging in. Please check your email and password.');
    }
    
}
