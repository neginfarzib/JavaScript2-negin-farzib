import {getBlogPost} from "./post-details.js";
const options = { year: 'numeric', month: 'long', day: 'numeric' };

document.addEventListener('DOMContentLoaded',async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("blog-post-id");

    const blogPost = await getBlogPost(postId);

    const blogPostDetailsTitle = document.getElementById('blog-post-details-title');
    blogPostDetailsTitle.innerHTML = '';
    blogPostDetailsTitle.textContent = blogPost.title;

    const blogPostDetailsImg = document.getElementById('blog-post-details-img');
    blogPostDetailsImg.src = blogPost.media.url || '';
    blogPostDetailsImg.alt = blogPost.media?.alt || '';

    const blogPostDetailsBody = document.getElementById('blog-post-details-body');
    blogPostDetailsBody.textContent = blogPost.body;

    const blogPostDetailsAuthor = document.getElementById('blog-post-details-author');
    blogPostDetailsAuthor.textContent = blogPost.author.name;

    const blogPostDetailsPublishDate = document.getElementById('blog-post-details-publish-date');
    const date = new Date(blogPost.created)
    blogPostDetailsPublishDate.textContent = date.toLocaleDateString('en-US', options);


})
