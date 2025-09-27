import { registerUser } from './auth.js';

const form = document.getElementById('register-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const bio = document.getElementById('bio').value.trim();
    const avatarUrl = document.getElementById('avatarUrl').value.trim();
    const avatarAltText = document.getElementById('avatarAltText').value;

    const bannerUrl = document.getElementById('bannerUrl').value.trim();
    const bannerAltText = document.getElementById('bannerAltText').value.trim();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
    registerUser(name, email, password, bio, avatarUrl, avatarAltText, bannerUrl, bannerAltText);

});
