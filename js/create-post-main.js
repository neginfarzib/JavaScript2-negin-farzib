import { checkIfAuthenticated } from './auth-check.js';
import { createBlogPost } from './create-post.js';

checkIfAuthenticated();
const spinner = document.getElementById('loading-spinner');

const createPostForm = document.getElementById('create-post-form');
if (createPostForm) {
  document
    .getElementById('create-post-form')
    .addEventListener('submit', function (e) {
      e.preventDefault();

      spinner.classList.remove('d-none');
      createPostForm
        .querySelectorAll('input, button')
        .forEach((el) => (el.disabled = true));

      const postTitle = document.getElementById('postTitle').value.trim();
      const postContent = document.getElementById('postContent').value.trim();
      const imageUrl = document.getElementById('imageUrl').value;
      const imageAltText = document.getElementById('imageAltText').value;
      const tags = document.getElementById('tags').value;

      createBlogPost(postTitle, postContent, imageUrl, imageAltText, tags);
    });
}
