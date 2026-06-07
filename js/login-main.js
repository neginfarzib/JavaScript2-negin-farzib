import { loginUser } from './auth.js';

const form = document.getElementById('login-form');
const spinner = document.getElementById('loading-spinner');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  spinner.classList.remove('d-none');

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    await loginUser(email, password);
  } finally {
    // Keep the spinner from staying visible when login fails.
    spinner.classList.add('d-none');
  }
});
