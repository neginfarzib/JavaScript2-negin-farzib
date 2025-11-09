import { allUsersPosts } from './manage-all-post.js';
import {
  fetchListOfFollowing,
  followUser,
  unFollowUser,
} from './user-posts.js';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};
let nameOfUser = '';

document.addEventListener('DOMContentLoaded', async () => {
  const editPostsThumbnail = document.getElementById('user-posts-thumbnail');

  checkUserIsFollowed();

  showSkeletons(editPostsThumbnail);

  const params = new URLSearchParams(window.location.search);
  nameOfUser = params.get('name-of-user');
  const posts = await allUsersPosts(nameOfUser);

  document.getElementById(
    'user-all-post-title'
  ).textContent = `${nameOfUser}'s All Posts`;

  displayPosts(posts.data);

  function displayPosts(posts) {
    editPostsThumbnail.innerHTML = '';
    posts.forEach((post) => {
      const blogThumbnail = document.createElement('div');
      blogThumbnail.classList.add('card', 'w-75', 'mx-auto', 'shadow', 'mb-4');

      const blogThumbnailDiv = document.createElement('div');
      blogThumbnailDiv.classList.add('card-body');

      const blogThumbnailHref = document.createElement('a');
      blogThumbnailHref.classList.add(
        'text-decoration-none',
        'text-dark',
        'align-items-center',
        'mb-2'
      );
      blogThumbnailHref.href = '../post/index.html?blog-post-id=' + post.id;

      const postTitle = document.createElement('h4');
      postTitle.classList.add('card-title', 'mb-0');
      postTitle.textContent = post.title;
      blogThumbnailHref.appendChild(postTitle);

      const postCreatedTime = document.createElement('p');
      postCreatedTime.classList.add('text-muted', 'small', 'mb-3');
      const date = new Date(post.created);
      postCreatedTime.textContent = date.toLocaleDateString('en-US', options);
      blogThumbnailHref.appendChild(postCreatedTime);

      const postImage = document.createElement('img');
      postImage.classList.add('card-img-top', 'rounded', 'mb-2');
      postImage.src = post.media?.url || '';
      postImage.alt = post.media?.alt || '';
      blogThumbnailHref.appendChild(postImage);

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
      editPostsThumbnail.appendChild(blogThumbnail);
    });
    const errorMessageDiv = document.createElement('div');
    errorMessageDiv.classList.add('row');
    const errorMessageP = document.createElement('p');
    errorMessageP.id = 'errorMessage';
    errorMessageDiv.appendChild(errorMessageP);
    editPostsThumbnail.appendChild(errorMessageDiv);
  }

  const userAllPostsFollow = document.getElementById(
    'user-all-posts-follow-btn'
  );
  if (userAllPostsFollow) {
    document
      .getElementById('user-all-posts-follow-btn')
      .addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.setItem(
          'callbackLocation',
          `../post/user-posts.html?name-of-user=${nameOfUser}`
        );

        const token = localStorage.getItem('accessToken');

        if (!token || token === 'undefined' || token === 'null') {
          alert('You must be logged in to view this page.');
          window.location.href = '../account/login.html';
        } else {
          handlingFollowButton(nameOfUser);
        }
      });
  }
});

function showSkeletons(container, count = 3) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const skeletonCard = document.createElement('div');
    skeletonCard.classList.add('card', 'w-75', 'mx-auto', 'shadow', 'mb-4');
    skeletonCard.innerHTML = `
      <div class="card-body">
        <!-- Author placeholder -->
        <div class="d-flex align-items-center mb-2 placeholder-glow">
          <span class="placeholder rounded-circle me-2" style="width:32px; height:32px;"></span>
          <span class="placeholder col-4 mb-0"></span>
        </div>

        <!-- Date placeholder -->
        <p class="text-muted small mb-3 placeholder-glow">
          <span class="placeholder col-3"></span>
        </p>

        <!-- Title placeholder -->
        <h6 class="fw-semibold placeholder-glow">
          <span class="placeholder col-6"></span>
        </h6>

        <!-- Image placeholder -->
        <div class="placeholder-glow mb-2">
          <span class="placeholder col-12" style="height: 200px; display:block; border-radius:0.25rem;"></span>
        </div>

        <!-- Content placeholder -->
        <p class="card-text placeholder-glow">
          <span class="placeholder col-12 mb-1"></span>
          <span class="placeholder col-12 mb-1"></span>
          <span class="placeholder col-10"></span>
        </p>

        <!-- Read more placeholder -->
        <p class="text-primary fw-semibold placeholder-glow">
          <span class="placeholder col-3"></span>
        </p>
      </div>
    `;
    container.appendChild(skeletonCard);
  }
}
async function checkUserIsFollowed() {
  const token = localStorage.getItem('accessToken');

  if (!token || token === 'undefined' || token === 'null') {
  } else {
    const profileAndFollowing = await fetchListOfFollowing();
    profileAndFollowing.following.forEach((follow) => {
      if (nameOfUser === follow.name) {
        const btn = document.getElementById('user-all-posts-follow-btn');
        if (btn) {
          btn.textContent = 'Unfollow';
          btn.style.backgroundColor = '#5b90e5';
          return;
        }
      }
    });
  }
}

/**
 * Handling follow logic
 * @param {string} name - name of the user
 * */
function handlingFollowButton(name) {
  const btn = document.getElementById('user-all-posts-follow-btn');
  if (btn) {
    if (btn.textContent === 'Follow') {
      followUser(name);
      btn.textContent = 'Unfollow';
      btn.style.backgroundColor = '#5b90e5';
    } else if (btn.textContent === 'Unfollow') {
      unFollowUser(name);
      btn.textContent = 'Follow';
      btn.style.backgroundColor = '#f3f2f2';
    }
  }
}
