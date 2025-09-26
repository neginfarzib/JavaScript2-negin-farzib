const base_url = "https://v2.api.noroff.dev";

/**
 * Creating blog post
 * @param {string} title - blog post title
 * @param {string} body - blog post content
 * @param {string} url - blog post url
 * @param {string} alt - blog post alt attribute
 * @param {string} tags - blog post tags
 *
* */
export async function createBlogPost(title, body, url, alt, tags) {
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
        const nameUser =localStorage.getItem('name');
        let url = `${base_url}/blog/posts/${nameUser}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
