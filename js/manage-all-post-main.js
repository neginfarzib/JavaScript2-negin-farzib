import {deleteBlogPost, allUsersPosts} from "./manage-all-post.js";
import {checkIfAuthenticated} from "./auth-check.js";

checkIfAuthenticated();

document.addEventListener('DOMContentLoaded',async () => {
    const editPostsThumbnail = document.getElementById('edit-posts-thumbnail');

    const nameUser =localStorage.getItem('name');
    const posts = await allUsersPosts(nameUser);
    displayPosts(posts.data);

    function displayPosts(posts){
        editPostsThumbnail.innerHTML = '';
        posts.forEach((post) => {
            const blogThumbnail = document.createElement('div');
            blogThumbnail.classList.add('blog-thumbnail');

            const blogThumbnailHref = document.createElement('a');
            blogThumbnailHref.href = '../post/index.html?blog-post-id='+post.id;
            // blogThumbnailHref.target = '_blank';

            const postTitle = document.createElement('h4');
            postTitle.textContent = post.title;
            blogThumbnailHref.appendChild(postTitle)
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

            /* banner */
            const createPostThumbnailBannerDiv = document.createElement('div');
            createPostThumbnailBannerDiv.classList.add('creat-post-thumbnail-banner')

            const postBannerHrefEdit = document.createElement('a');
            postBannerHrefEdit.href = '../post/edit.html?blog-post-id='+post.id;
            const postImageBannerEdit = document.createElement('img');
            postImageBannerEdit.classList.add('creat-post-thumbnail-banner-img')
            postImageBannerEdit.src = '../assets/pen.svg';
            postImageBannerEdit.alt = 'edit';
            postBannerHrefEdit.appendChild(postImageBannerEdit);
            createPostThumbnailBannerDiv.appendChild(postBannerHrefEdit);

            const postBannerHrefView = document.createElement('a');
            postBannerHrefView.href = '../post/index.html?blog-post-id='+post.id;
            // postBannerHrefView.target = '_blank';
            const postImageBannerView = document.createElement('img');
            postImageBannerView.classList.add('creat-post-thumbnail-banner-img')
            postImageBannerView.src = '../assets/eye.svg';
            postImageBannerView.alt = 'view';
            postBannerHrefView.appendChild(postImageBannerView);
            createPostThumbnailBannerDiv.appendChild(postBannerHrefView);

            const postBannerHrefDelete = document.createElement('a');
            postBannerHrefDelete.href = '#rr';
            postBannerHrefDelete.onclick = function(event) {
                event.preventDefault();
                deleteBlogPost(post.id);
            };
            const postImageBannerDelete = document.createElement('img');
            postImageBannerDelete.classList.add('creat-post-thumbnail-banner-img')
            postImageBannerDelete.src = '../assets/bin.svg';
            postImageBannerDelete.alt = 'delete';
            postBannerHrefDelete.appendChild(postImageBannerDelete);
            createPostThumbnailBannerDiv.appendChild(postBannerHrefDelete);

            blogThumbnail.appendChild(createPostThumbnailBannerDiv);


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
})