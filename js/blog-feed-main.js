import {allPosts} from "./manage-all-post.js";
const base_url = "https://v2.api.noroff.dev";

/**
 * Fetching all posts. Then sort them by date
 *
 * @return {Promise<object[]>} A promise that resolves to an array of post objects sorted by date.
* */
export async function dateSortedAllPosts(){
    let posts = await allPosts();
    let sortedAllPosts = posts.data.sort((a, b) => new Date(b.created) - new Date(a.created));
    return sortedAllPosts;
}

document.addEventListener('DOMContentLoaded',async () => {
    const blogPostsThumbnail = document.getElementById('blog-post-container');
    const errorMessageElement = document.getElementById('errorMessage');

    const posts = await dateSortedAllPosts();
    console.log(posts.length)
    displayPosts(posts);

    function displayPosts(posts){
        blogPostsThumbnail.innerHTML = '';

        const maxPosts = posts.length;
        const postToShow = posts.slice(0, maxPosts);

        postToShow.forEach(post =>{
            const blogThumbnail = document.createElement('div');
            blogThumbnail.classList.add('blog-thumbnail');

            const blogThumbnailHref = document.createElement('a');
            blogThumbnailHref.href = 'post/index.html?blog-post-id='+post.id;
            blogThumbnailHref.target = '_blank';

            const author = document.createElement('div');

            const postAuthorIcon = document.createElement('img');
            postAuthorIcon.src = 'assets/person-icon.svg';
            postAuthorIcon.alt = 'author-icon'
            author.appendChild(postAuthorIcon);

            const postAuthor = document.createElement('h4');
            postAuthor.textContent = post.author.name;
            author.appendChild(postAuthor)

            blogThumbnailHref.appendChild(author)
            blogThumbnail.appendChild(blogThumbnailHref);

            const postTitle = document.createElement('h6');
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


            // Append the product box to the container
            blogPostsThumbnail.appendChild(blogThumbnail);
        });
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.classList.add('row');
        const errorMessageP = document.createElement('p');
        errorMessageP.id='errorMessage';
        errorMessageDiv.appendChild(errorMessageP);
        blogPostsThumbnail.appendChild(errorMessageDiv);

    }
})
