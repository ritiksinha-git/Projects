document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', signup);
});

async function signup(event) {
    event.preventDefault();
    
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const phonenumber = event.target.phonenumber.value;

    try {
        const response = await axios.post('http://localhost:3000/signup', {
            name,
            email,
            password,
            phonenumber
        });

        if (response.data.success) {
            alert('Signed Up Successfully');
            console.log(response);
            window.location.href = 'login.html';
        } else {
            console.log('Email already exists');
        }
    } catch (err) {
        const errorMessage = "<h4> Something went wrong </h4>";
        document.body.insertAdjacentHTML('beforeend', errorMessage);
        console.error(err);
    }
}
