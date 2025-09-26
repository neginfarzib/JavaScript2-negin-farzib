import {deleteBlogPost} from "./manage-all-post.js";
const base_url = "https://v2.api.noroff.dev";
let postId = '';

/**
 * Edit blog post
 * @param {string} title - blog post title
 * @param {string} body - blog post content
 * @param {string} url - blog post url
 * @param {string} alt - blog post alt attribute
 * @param {string} tags - blog post tags
 * @param {number} postId - blog post ID
 * @return {void}
 *
* */
export async function editBlogPost(title, body, url, alt, tags,postId) {
    const postData = {
        title: title
    };

    if (body) {
        postData.body = body;
    }

    if (tags && tags.length > 0) {
        postData.tags = [tags.trim()];
    }

    if (alt || url) {
        postData.media = {
            alt: alt,
            url: url
        };
    }

    try {
        let url = `${base_url}/social/posts/${postId}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                "X-Noroff-API-Key": '4f20fb44-3b03-4fc3-bc21-5a7fb98d9816'
            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            const result = await response.json();
            window.location.href = '../post/manage-all-post.html';
        } else {

            const error = await response.json();
            console.log('error.length:' + error.length + 'error ' +  error);


            let messages = '';
            for (let i = 0; i < error.errors.length; i++) {
                messages += error.errors[i].message + '<br>';
            }

            messages = (!messages || messages.length === 0) ? "An error occurred. Please try again " : messages;

            const errorMessageElement = document.getElementById('errorMessage');
            errorMessageElement.style.display = 'block';
            errorMessageElement.innerHTML = messages;
        }
    } catch (err) {
        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerHTML = err;

        console.error('An error occurred:', err);
    }
}