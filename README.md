# JavaScript2-negin-farzib
## Technical feature
- plain javascript. No Javascript framework
- ES6
- HTML  
- plain CSS. No CSS lib or framework 
## Run the project
No need for any special way to run since it is plain JavaScript + HTML + CSS.
Just either can run it with VS Code live server
- Live Server , By Ritwick Dey
- Simply open pages by a browser
## Usage instruction 
- Home
  - Here you can see all users posts. No need for authentication
  - Each post has two hyperlinks
    - **Author** of each post is provided at the top of each post. Also is it clickable and will open 
    a page with the author all posts which can be **follow/unfollow**
      - To be able to follow/ubfollow need the user to be authenticated
      - If not authenticated will redirect to login page for authentication then back to this page
    - The whole post is clickable and will open the post in page with details
    - 
- All My posts
  - List of all of my posts
  - Possibility to 
    - Edit
    - View
    - Delete
  - The user need to be authenticated
- Sign in
  - For those pages need authentication, it will change to the username
    - By clicking on the username, it will redirect to profile page for the authenticated user
      - In the profile page user can update limited information
        - name ❌
        - email ❌
        - password ❌
        - bio ✅ 
        - avatar url ✅ 
        - avatar alt ✅
        - banner url ✅
        - banner alt ✅
- Register
- User's page, 
  - navigate there by
    - clicking on author name on posts on Home 
    - clicking on a post then from there, author name
  - In this page can 
    - View all user's posts
    - Follow / Unfollow
