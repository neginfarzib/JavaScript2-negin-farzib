import { registerUser } from './auth.js';

const form = document.getElementById('register-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
    registerUser(name, email, password);

});
