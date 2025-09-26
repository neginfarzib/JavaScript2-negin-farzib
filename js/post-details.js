const base_url = "https://v2.api.noroff.dev";
const options = { year: 'numeric', month: 'long', day: 'numeric' };

/**
 *  Fetching a blog post by ID
 *  @param {number} blogPostId - ID of the blog post want to fetch from API-server
 *  @return {Promise<object>} post - a post object
* */
export async function getBlogPost(blogPostId) {
    try {
        const nameUser =localStorage.getItem('name');
        const url = `${base_url}/blog/posts/${nameUser}/${blogPostId}`;

        const response = await fetch(url);
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

