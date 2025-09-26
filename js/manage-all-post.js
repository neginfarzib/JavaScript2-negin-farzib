const base_url = "https://v2.api.noroff.dev";

/**
 * API call for deleting blog post from the API-server
 * @param {number} blogPostId - ID of the blogPost which should be deleted
 * @return {void}
* */
export async function deleteBlogPostServer(blogPostId) {
    try {
        const url = `${base_url}/social/posts/${blogPostId}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
                "X-Noroff-API-Key": '4f20fb44-3b03-4fc3-bc21-5a7fb98d9816'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }else {
            window.location.href = "../post/manage-all-post.html";
        }
    } catch (error) {
        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerHTML = error;

        console.error("Error fetching data:", error);
    }
}

/**
* Getting confirmation from the user then calling delete API call
 * @param {number} blogPostId - ID of the blog post which should be deleted
* */
export async function deleteBlogPost(blogPostId){
    if(confirm('Are you sure you want to delete?')){
        await deleteBlogPostServer(blogPostId);
    }
}
/**
 * Fetching all blog posts from API-sever
 * @return {Promise<object[]>} array of post fetched from API-server
* */
export async function allPosts() {
    try {
        const options = {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmVnaW4iLCJlbWFpbCI6Im5lZ2ZhcjQ5NzkxQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzU4ODgyOTk2fQ.G8SDRfET-9DE5XjOSWjDm2wZCRGwErGQnNPaiXgpWjs',
                "X-Noroff-API-Key": '4f20fb44-3b03-4fc3-bc21-5a7fb98d9816'
            }
        }
        const url = `${base_url}/social/posts?_author=true`;
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerHTML = error;

        console.error("Error fetching data:", error);
    }
}

/**
 * Fetching all blog posts belonging to me from API-sever
 * @return {Promise<object[]>} array of post fetched from API-server
* */
export async function allMyPosts() {
    try {
        const options = {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmVnaW4iLCJlbWFpbCI6Im5lZ2ZhcjQ5NzkxQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzU4ODgyOTk2fQ.G8SDRfET-9DE5XjOSWjDm2wZCRGwErGQnNPaiXgpWjs',
                "X-Noroff-API-Key": '4f20fb44-3b03-4fc3-bc21-5a7fb98d9816'
            }
        }
        const nameUser =localStorage.getItem('name');
        const url = `${base_url}/social/profiles/${name}/posts`;
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerHTML = error;

        console.error("Error fetching data:", error);
    }
}

