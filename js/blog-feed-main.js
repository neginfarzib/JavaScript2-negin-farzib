import {allPosts, searchPostAPI} from "./manage-all-post.js";
const base_url = "https://v2.api.noroff.dev";
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' , minute: 'numeric', hour12: false};

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

        const inputSearchPostsDiv = document.createElement('div');
        inputSearchPostsDiv.classList.add('search-blog-thumbnail');

        const inputBtnSearchPostsDiv = document.createElement('div');
        inputBtnSearchPostsDiv.classList.add('search-blog-thumbnail-input-btn');
        const inputSearchPosts = document.createElement('input');
        inputSearchPosts.type = 'text';
        inputSearchPosts.id = 'searchPosts';
        inputSearchPosts.placeholder = 'Search all posts ...'
        inputBtnSearchPostsDiv.appendChild(inputSearchPosts);
        const searchPostsBtn = document.createElement('button');
        searchPostsBtn.classList.add('search-blog-thumbnail-btn')
        searchPostsBtn.textContent = 'Search';
        searchPostsBtn.addEventListener('click', async function (e) {
            e.preventDefault();
            const searchInput = document.getElementById('searchPosts').value.trim()
            const searchPostsList = await searchPostAPI(searchInput);
            displayPosts(searchPostsList);
        })
        inputBtnSearchPostsDiv.appendChild(searchPostsBtn);
        inputSearchPostsDiv.appendChild(inputBtnSearchPostsDiv);

        const editLineSeperator = document.createElement('div');
        editLineSeperator.classList.add("edit-line-separator");
        inputSearchPostsDiv.appendChild(editLineSeperator);

        blogPostsThumbnail.appendChild(inputSearchPostsDiv);


        
        const maxPosts = posts.length;
        const postToShow = posts.slice(0, maxPosts);

        postToShow.forEach(post =>{
            const blogThumbnail = document.createElement('div');
            blogThumbnail.classList.add('blog-thumbnail');

            if(post.author){
                const authorHref = document.createElement('a');
                authorHref.href = 'post/user-posts.html?name-of-user=' + post.author.name;

                const author = document.createElement('div');

                const postAuthorIcon = document.createElement('img');
                postAuthorIcon.src = 'assets/person-icon.svg';
                postAuthorIcon.alt = 'author-icon'
                author.appendChild(postAuthorIcon);

                const postAuthor = document.createElement('h4');
                postAuthor.textContent = post.author.name;
                author.appendChild(postAuthor)

                authorHref.appendChild(author)
                blogThumbnail.appendChild(authorHref);
            }

            const postCreatedTime = document.createElement('p');
            postCreatedTime.classList.add('blog-thumbnail-created-time-p')
            const date = new Date(post.created)
            postCreatedTime.textContent = date.toLocaleDateString('en-US', options);
            blogThumbnail.appendChild(postCreatedTime);

            const blogThumbnailHref = document.createElement('a');
            blogThumbnailHref.href = 'post/index.html?blog-post-id='+post.id;
            // blogThumbnailHref.target = '_blank';

            const postTitle = document.createElement('h6');
            postTitle.textContent = post.title;
            blogThumbnailHref.appendChild(postTitle)
            blogThumbnail.appendChild(blogThumbnailHref);

            if(post.media){
                const postImage = document.createElement('img');
                postImage.classList.add('blog-thumbnail-img')
                postImage.src = post.media?.url || '';
                postImage.alt = post.media?.alt || '';
                blogThumbnailHref.appendChild(postImage)
                blogThumbnail.appendChild(blogThumbnailHref);
            }

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
