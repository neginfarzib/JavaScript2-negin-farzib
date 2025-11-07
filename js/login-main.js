import { loginUser } from './auth.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

const form = document.getElementById('login-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  loginUser(email, password);
});
