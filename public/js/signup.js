async function signup (event) {
    event.preventDefault();
    
    try {
        // Get user input
        const userName = document.getElementById('name').value;
        const userEmail = document.getElementById('email').value;
        const userPassword = document.getElementById('password').value;

        // Create user object
        const signupDetails = {
            name: userName,
            email: userEmail,
            password: userPassword
        };

        // Make Axios POST request to localhost:2000/user/signup
        const response = await axios.post('http://localhost:2000/user/signup', signupDetails);
        if (response.status === 201) {
            window.location.href = "../Login/login.html"
        } else if(response.status === 409){
            alert(response.data.message);
        } else {
            throw new Error('Failed to Signup')
        }
    } catch (error) {
        console.log(error);
        alert('Error saving signUpDetails info');
    }
}
