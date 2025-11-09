import { getBlogPost } from './post-details.js';
const options = { year: 'numeric', month: 'long', day: 'numeric' };

function showPostDetailSkeleton(container) {
  container.innerHTML = `
    <div class="card shadow w-75 mx-auto my-5 p-4">
      <div class="placeholder-glow text-center mb-3">
        <!-- Title placeholder -->
        <h2 class="card-title mb-3">
          <span class="placeholder col-8"></span>
        </h2>
      </div>

      <!-- Image placeholder -->
      <div class="placeholder-glow mb-4">
        <span class="placeholder col-12" style="display:block; height:300px; border-radius:0.5rem;"></span>
      </div>

      <!-- Body text placeholder -->
      <div class="placeholder-glow mb-4">
        <p class="fs-5 mb-2">
          <span class="placeholder col-12 mb-1"></span>
          <span class="placeholder col-11 mb-1"></span>
          <span class="placeholder col-10 mb-1"></span>
          <span class="placeholder col-12 mb-1"></span>
          <span class="placeholder col-9"></span>
        </p>
      </div>

      <!-- Author and publish date placeholders -->
      <div class="d-flex justify-content-between mt-4 placeholder-glow">
        <div class="d-flex align-items-center">
          <span class="fw-bold me-1 fs-3">By:</span>
          <span class="placeholder col-3" style="height:1.5rem;"></span>
        </div>
        <div class="d-flex align-items-center">
          <span class="fw-bold me-1 fs-3">Published on:</span>
          <span class="placeholder col-4" style="height:1.5rem;"></span>
        </div>
      </div>
    </div>
  `;
}
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('blog-post-id');

  const blogPostContainer = document.getElementById('blog-post-container');

  // 🦴 Show skeleton immediately
  showPostDetailSkeleton(blogPostContainer);

  try {
    const blogPost = await getBlogPost(postId);

    // Replace skeleton with real content
    blogPostContainer.innerHTML = `
      <div class="card shadow w-75 mx-auto my-5 p-4">
        <h2 id="blog-post-details-title" class="card-title mb-3 text-center"></h2>
        <img id="blog-post-details-img" class="card-img-top rounded mb-4" src="" alt="">
        <div class="public-post-text-container">
          <pre class="fs-5" id="blog-post-details-body"></pre>
          <div class="d-flex justify-content-between mt-4">
            <div class="d-flex align-items-center">
              <span class="fw-bold me-1 fs-3">By:</span>
              <a id="blog-post-details-author-href" href="">
                <span id="blog-post-details-author" class="fs-5 text-dark"></span>
              </a>
            </div>
            <div class="d-flex align-items-center">
              <span class="fw-bold me-1 fs-3">Published on:</span>
              <span id="blog-post-details-publish-date" class="fs-5 text-secondary"></span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Fill data as before
    document.getElementById('blog-post-details-title').textContent =
      blogPost.title;

    if (blogPost.media) {
      const img = document.getElementById('blog-post-details-img');
      img.src = blogPost.media.url || '';
      img.alt = blogPost.media?.alt || '';
    }

    document.getElementById('blog-post-details-body').textContent =
      blogPost.body;
    document.getElementById('blog-post-details-author-href').href =
      './user-posts.html?name-of-user=' + blogPost.author.name;
    document.getElementById('blog-post-details-author').textContent =
      blogPost.author.name;

    const date = new Date(blogPost.created);
    document.getElementById('blog-post-details-publish-date').textContent =
      date.toLocaleDateString('en-US', options);
  } catch (error) {
    blogPostContainer.innerHTML = `<p class="alert alert-danger text-center">Failed to load post.</p>`;
  }
});
