const base_url = "https://v2.api.noroff.dev";
const options = { year: 'numeric', month: 'long', day: 'numeric' };

/**
 *  Fetching a blog post by ID
 *  @param {number} blogPostId - ID of the blog post want to fetch from API-server
 *  @return {Promise<object>} post - a post object
* */
export async function getBlogPost(blogPostId) {
    try {
        const url = `${base_url}/social/posts/${blogPostId}?_author=true`;

        const options = {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmVnaW4iLCJlbWFpbCI6Im5lZ2ZhcjQ5NzkxQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzU4ODgyOTk2fQ.G8SDRfET-9DE5XjOSWjDm2wZCRGwErGQnNPaiXgpWjs',
                "X-Noroff-API-Key": '4f20fb44-3b03-4fc3-bc21-5a7fb98d9816'
            }
        }

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching data:", error);

        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerHTML = error;

    }
}

