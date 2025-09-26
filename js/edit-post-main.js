import {checkIfAuthenticated} from "./auth-check.js";
import {getBlogPost,editBlogPost} from "./edit-post.js";
import {deleteBlogPost} from "./manage-all-post.js";

checkIfAuthenticated();

document.addEventListener('DOMContentLoaded',async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("blog-post-id");

    const blogPost = await getBlogPost(postId);


    const blogPostDetailsTitle = document.getElementById('blog-post-edit-title');
    blogPostDetailsTitle.value = blogPost.title;

    const blogPostDetailsImgUrl = document.getElementById('blog-post-edit-img-url');
    blogPostDetailsImgUrl.value = blogPost.media?.url || '';

    const blogPostEditImgAlt = document.getElementById('blog-post-edit-img-alt');
    blogPostEditImgAlt.value = blogPost.media?.alt || '';

    const blogPostDetailsBody = document.getElementById('blog-post-edit-body');
    blogPostDetailsBody.textContent = blogPost.body;

    const blogPostEditTags = document.getElementById('blog-post-edit-tags');
    blogPostEditTags.value = blogPost.tags;

})

const editPostForm = document.getElementById('edit-post-form');
if (editPostForm) {
    document.getElementById('edit-post-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitter = e.submitter;

        if (submitter) {
            const action = submitter.value; // Retrieve the value of the clicked button

            if (action === 'save') {
                const postTitle = document.getElementById('blog-post-edit-title').value.trim();
                const postContent = document.getElementById('blog-post-edit-body').value.trim();
                const imageUrl = document.getElementById('blog-post-edit-img-url').value;
                const imageAltText = document.getElementById('blog-post-edit-img-alt').value;
                const tags = document.getElementById('blog-post-edit-tags').value;
                editBlogPost(postTitle, postContent, imageUrl, imageAltText, tags);

            } else if (action === 'delete') {
                await deleteBlogPost(postId);
            }
        }
    });
}
