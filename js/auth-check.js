/**
 * Check if user is logged in.
 * Redirects to login page if not.
 */
export function checkIfAuthenticated(){
    if (!localStorage.getItem('accessToken')) {
        alert('You must be logged in to view this page.');
        window.location.href = '../account/login.html';
    }
}