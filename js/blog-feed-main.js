import { allPosts, searchPostAPI } from './manage-all-post.js';
const base_url = 'https://v2.api.noroff.dev';
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};

/**
 * Fetching all posts. Then sort them by date
 *
 * @return {Promise<object[]>} A promise that resolves to an array of post objects sorted by date.
 * */
export async function dateSortedAllPosts() {
  let posts = await allPosts();
  let sortedAllPosts = posts.data.sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );
  return sortedAllPosts;
}

document.addEventListener('DOMContentLoaded', async () => {
  const blogPostsThumbnail = document.getElementById('blog-post-container');
  const errorMessageElement = document.getElementById('errorMessage');

  const posts = await dateSortedAllPosts();
  console.log(posts.length);
  displayPosts(posts);

  function displayPosts(posts) {
    blogPostsThumbnail.innerHTML = '';

    const inputSearchPostsDiv = document.createElement('div');
    inputSearchPostsDiv.classList.add('w-75', 'mx-auto', 'mb-4', 'my-4');

    const inputBtnSearchPostsDiv = document.createElement('div');
    inputBtnSearchPostsDiv.classList.add('d-flex');
    const inputSearchPosts = document.createElement('input');
    inputSearchPosts.type = 'text';
    inputSearchPosts.id = 'searchPosts';
    inputSearchPosts.placeholder = 'Search all posts ...';
    inputSearchPosts.classList.add('form-control', 'me-2');
    inputBtnSearchPostsDiv.appendChild(inputSearchPosts);
    const searchPostsBtn = document.createElement('button');
    searchPostsBtn.classList.add('btn', 'btn-primary', 'px-4');
    searchPostsBtn.textContent = 'Search';
    searchPostsBtn.addEventListener('click', async function (e) {
      e.preventDefault();
      const searchInput = document.getElementById('searchPosts').value.trim();
      const searchPostsList = await searchPostAPI(searchInput);
      displayPosts(searchPostsList);
    });
    inputBtnSearchPostsDiv.appendChild(searchPostsBtn);
    inputSearchPostsDiv.appendChild(inputBtnSearchPostsDiv);

    const editLineSeperator = document.createElement('div');
    editLineSeperator.classList.add('mt-4', 'border-5');
    inputSearchPostsDiv.appendChild(editLineSeperator);

    blogPostsThumbnail.appendChild(inputSearchPostsDiv);

    const maxPosts = posts.length;
    const postToShow = posts.slice(0, maxPosts);

    postToShow.forEach((post) => {
      const blogThumbnail = document.createElement('div');
      blogThumbnail.classList.add('card', 'w-75', 'mx-auto', 'shadow', 'mb-4');

      const blogThumbnailDiv = document.createElement('div');
      blogThumbnailDiv.classList.add('card-body');

      if (post.author) {
        const authorHref = document.createElement('a');
        authorHref.classList.add(
          'text-decoration-none',
          'text-dark',
          'd-flex',
          'align-items-center',
          'mb-2'
        );
        authorHref.href =
          'post/user-posts.html?name-of-user=' + post.author.name;

        const postAuthorIcon = document.createElement('img');
        postAuthorIcon.src = 'assets/person-icon.svg';
        postAuthorIcon.alt = 'author-icon';
        postAuthorIcon.width = '32';
        postAuthorIcon.height = '32';
        postAuthorIcon.classList.add('me-2');
        authorHref.appendChild(postAuthorIcon);

        const postAuthor = document.createElement('h4');
        postAuthor.classList.add('card-title', 'mb-0');
        postAuthor.textContent = post.author.name;
        authorHref.appendChild(postAuthor);

        blogThumbnailDiv.appendChild(authorHref);
      }

      const postCreatedTime = document.createElement('p');
      postCreatedTime.classList.add('text-muted', 'small', 'mb-3');
      const date = new Date(post.created);
      postCreatedTime.textContent = date.toLocaleDateString('en-US', options);
      blogThumbnailDiv.appendChild(postCreatedTime);

      const blogThumbnailHref = document.createElement('a');
      blogThumbnailHref.classList.add('text-decoration-none', 'text-dark');
      blogThumbnailHref.href = 'post/index.html?blog-post-id=' + post.id;
      // blogThumbnailHref.target = '_blank';

      const postTitle = document.createElement('h6');
      postTitle.classList.add('fw-semibold');
      postTitle.textContent = post.title;
      blogThumbnailHref.appendChild(postTitle);

      if (post.media) {
        const postImage = document.createElement('img');
        postImage.classList.add('card-img-top', 'rounded', 'mb-2');
        postImage.src = post.media?.url || '';
        postImage.alt = post.media?.alt || '';
        blogThumbnailHref.appendChild(postImage);
      }

      const postContent = document.createElement('p');
      postContent.classList.add('card-text');
      postContent.textContent =
        post.body?.split(/\s+/).slice(0, 50).join(' ') || '';
      blogThumbnailHref.appendChild(postContent);

      const postReadMore = document.createElement('p');
      postReadMore.classList.add('text-primary', 'fw-semibold');
      postReadMore.textContent = 'Read more...';
      blogThumbnailHref.appendChild(postReadMore);
      blogThumbnailDiv.appendChild(blogThumbnailHref);

      blogThumbnail.appendChild(blogThumbnailDiv);
      // Append the product box to the container
      blogPostsThumbnail.appendChild(blogThumbnail);
    });
    const errorMessageDiv = document.createElement('div');
    errorMessageDiv.classList.add('row');
    const errorMessageP = document.createElement('p');
    errorMessageP.classList.add('alert', 'alert-danger', 'mt-4', 'd-none');
    errorMessageP.id = 'errorMessage';
    errorMessageDiv.appendChild(errorMessageP);
    blogPostsThumbnail.appendChild(errorMessageDiv);
  }
});
