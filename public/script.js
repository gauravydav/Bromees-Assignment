document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        alert('Please fill in all fields');
        return;
    }

    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, username, password, confirmPassword }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
    })
    .catch(error => console.error('Error:', error));
});
