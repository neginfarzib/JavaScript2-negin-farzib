import { deleteBlogPost, allUsersPosts } from './manage-all-post.js';
import { checkIfAuthenticated } from './auth-check.js';

checkIfAuthenticated();

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

document.addEventListener('DOMContentLoaded', async () => {
  const editPostsThumbnail = document.getElementById('edit-posts-thumbnail');

  const nameUser = localStorage.getItem('name');

  showSkeletons(editPostsThumbnail);

  const posts = await allUsersPosts(nameUser);
  displayPosts(posts.data);

  function displayPosts(posts) {
    editPostsThumbnail.innerHTML = '';
    posts.forEach((post) => {
      const blogThumbnail = document.createElement('div');
      blogThumbnail.classList.add('card', 'w-75', 'mx-auto', 'shadow', 'mb-4');

      const blogThumbnailDiv = document.createElement('div');
      blogThumbnailDiv.classList.add('card-body');

      const blogThumbnailHref = document.createElement('a');
      blogThumbnailHref.href = '../post/index.html?blog-post-id=' + post.id;
      blogThumbnailHref.classList.add('text-decoration-none', 'text-dark');
      // blogThumbnailHref.target = '_blank';

      const postTitle = document.createElement('h4');
      postTitle.classList.add('card-title');
      postTitle.textContent = post.title;
      blogThumbnailHref.appendChild(postTitle);

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

      /* banner */
      const createPostThumbnailBannerDiv = document.createElement('div');
      createPostThumbnailBannerDiv.classList.add(
        'd-flex',
        'justify-content-between',
        'align-items-center',
        'gap-3',
        'p-2',
        'rounded'
      );
      createPostThumbnailBannerDiv.style.backgroundColor = '#cc7eb5';

      const postBannerHrefEdit = document.createElement('a');
      postBannerHrefEdit.href = '../post/edit.html?blog-post-id=' + post.id;
      postBannerHrefEdit.classList.add(
        'btn',
        'btn-outline-secondary',
        'btn-sm',
        'p-2'
      );
      const postImageBannerEdit = document.createElement('img');
      postImageBannerEdit.classList.add('creat-post-thumbnail-banner-img');
      postImageBannerEdit.src = '../assets/pen.svg';
      postImageBannerEdit.alt = 'edit';
      postImageBannerEdit.width = '20';
      postImageBannerEdit.height = '20';
      postBannerHrefEdit.appendChild(postImageBannerEdit);
      createPostThumbnailBannerDiv.appendChild(postBannerHrefEdit);

      const postBannerHrefView = document.createElement('a');
      postBannerHrefView.href = '../post/index.html?blog-post-id=' + post.id;
      postBannerHrefView.classList.add(
        'btn',
        'btn-outline-secondary',
        'btn-sm',
        'p-2'
      );
      // postBannerHrefView.target = '_blank';
      const postImageBannerView = document.createElement('img');
      postImageBannerView.classList.add('creat-post-thumbnail-banner-img');
      postImageBannerView.src = '../assets/eye.svg';
      postImageBannerView.alt = 'view';
      postImageBannerView.width = '20';
      postImageBannerView.height = '20';
      postBannerHrefView.appendChild(postImageBannerView);
      createPostThumbnailBannerDiv.appendChild(postBannerHrefView);

      const postBannerHrefDelete = document.createElement('a');
      postBannerHrefDelete.classList.add(
        'btn',
        'btn-outline-secondary',
        'btn-sm',
        'p-2'
      );
      postBannerHrefDelete.href = '#rr';
      postBannerHrefDelete.onclick = function (event) {
        event.preventDefault();

        deleteBlogPost(post.id);
      };
      const postImageBannerDelete = document.createElement('img');
      postImageBannerDelete.classList.add('creat-post-thumbnail-banner-img');
      postImageBannerDelete.src = '../assets/bin.svg';
      postImageBannerDelete.alt = 'delete';
      postImageBannerDelete.width = '20';
      postImageBannerDelete.height = '20';
      postBannerHrefDelete.appendChild(postImageBannerDelete);
      createPostThumbnailBannerDiv.appendChild(postBannerHrefDelete);

      blogThumbnail.appendChild(createPostThumbnailBannerDiv);

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
});
