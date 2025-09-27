import {allUsersPosts} from "./manage-all-post.js";
import {fetchListOfFollowing, followUser, unFollowUser} from "./user-posts.js";

const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' , minute: 'numeric', hour12: false};
let nameOfUser = "";

document.addEventListener('DOMContentLoaded',async () => {
    const editPostsThumbnail = document.getElementById('user-posts-thumbnail');

    checkUserIsFollowed();
    const params = new URLSearchParams(window.location.search);
    nameOfUser = params.get("name-of-user");
    const posts = await allUsersPosts(nameOfUser);

    document.getElementById('user-all-post-title').textContent=`${nameOfUser}'s All Posts`;

    displayPosts(posts.data);

    function displayPosts(posts){
        editPostsThumbnail.innerHTML = '';
        posts.forEach((post) => {
            const blogThumbnail = document.createElement('div');
            blogThumbnail.classList.add('blog-thumbnail');

            const blogThumbnailHref = document.createElement('a');
            blogThumbnailHref.href = '../post/index.html?blog-post-id='+post.id;

            const postTitle = document.createElement('h4');
            postTitle.textContent = post.title;
            blogThumbnailHref.appendChild(postTitle)
            blogThumbnail.appendChild(blogThumbnailHref);

            const postCreatedTime = document.createElement('p');
            const date = new Date(post.created)
            postCreatedTime.textContent = date.toLocaleDateString('en-US', options);
            blogThumbnailHref.appendChild(postCreatedTime)
            blogThumbnail.appendChild(blogThumbnailHref);

            const postImage = document.createElement('img');
            postImage.classList.add('blog-thumbnail-img')
            postImage.src = post.media?.url || '';
            postImage.alt = post.media?.alt || '';
            blogThumbnailHref.appendChild(postImage)
            blogThumbnail.appendChild(blogThumbnailHref);

            const postContent = document.createElement('p');
            postContent.textContent = post.body?.split(/\s+/).slice(0, 50).join(' ') || '';
            blogThumbnailHref.appendChild(postContent);
            blogThumbnail.appendChild(blogThumbnailHref);

            const postReadMore = document.createElement('p');
            postReadMore.textContent = 'Read more...';
            blogThumbnailHref.appendChild(postReadMore);
            blogThumbnail.appendChild(blogThumbnailHref);


            // Append the product box to the container
            editPostsThumbnail.appendChild(blogThumbnail);
        });
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.classList.add('row');
        const errorMessageP = document.createElement('p');
        errorMessageP.id='errorMessage';
        errorMessageDiv.appendChild(errorMessageP);
        editPostsThumbnail.appendChild(errorMessageDiv);

    }

    const userAllPostsFollow = document.getElementById('user-all-posts-follow-btn');
    if (userAllPostsFollow) {
        document.getElementById('user-all-posts-follow-btn').addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.setItem("callbackLocation", `/post/user-posts.html?name-of-user=${nameOfUser}`);

            const token = localStorage.getItem('accessToken');

            if (!token || token === 'undefined' || token === 'null') {
                alert('You must be logged in to view this page.');
                window.location.href = '../account/login.html';
            }else {
                handlingFollowButton(nameOfUser);
            }

        });
    }
});

async function checkUserIsFollowed(){
    const token = localStorage.getItem('accessToken');

    if (!token || token === 'undefined' || token === 'null') {

    }else {
        const profileAndFollowing = await fetchListOfFollowing();
        profileAndFollowing.following.forEach(follow =>{
            if (nameOfUser === follow.name){
                const btn = document.getElementById("user-all-posts-follow-btn");
                if (btn) {
                    btn.textContent = "Unfollow";
                    btn.style.backgroundColor = "#5b90e5";
                    return;
                }
            }
        })
    }
}

/**
 * Handling follow logic
 * @param {string} name - name of the user
* */
function handlingFollowButton(name) {
    const btn = document.getElementById("user-all-posts-follow-btn");
    if (btn) {
        if(btn.textContent === "Follow"){
            followUser(name);
            btn.textContent = "Unfollow";
            btn.style.backgroundColor = "#5b90e5";
        }else if(btn.textContent === "Unfollow"){
            unFollowUser(name);
            btn.textContent = "Follow";
            btn.style.backgroundColor = "#f3f2f2";
        }
    }
}

