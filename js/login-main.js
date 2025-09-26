import { loginUser } from './auth.js';

const form = document.getElementById('login-form');
form.addEventListener('submit', (e) => {
        e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    loginUser(email, password);
});
