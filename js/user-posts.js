const base_url = "https://v2.api.noroff.dev";
/**
 * updating API-server to follow a user
 * @param {string} name - name of user want to follow
 * */
export async function followUser(name) {
    try {
        let url = `${base_url}/social/profiles/${name}/follow`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                "X-Noroff-API-Key": '4f20fb44-3b03-4fc3-bc21-5a7fb98d9816'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);

        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerHTML = error;
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

}

/**
 * updating API-server to unfollow a user
 * @param {string} name - name of user want to unfollow
 * */
export async function unFollowUser(name) {
    try {
        let url = `${base_url}/social/profiles/${name}/unfollow`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                "X-Noroff-API-Key": '4f20fb44-3b03-4fc3-bc21-5a7fb98d9816'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);

        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerHTML = error;
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}


/**
 * Fetch list of all following of authenticated user
 * @return{promise<profile>}
 * */
export async function fetchListOfFollowing() {
    try {
        const nameUser =localStorage.getItem('name');
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                "X-Noroff-API-Key": '4f20fb44-3b03-4fc3-bc21-5a7fb98d9816'
            }
        }
        let url = `${base_url}/social/profiles/${nameUser}?_following=true`;


        const response = await fetch(url, option);

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
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

}