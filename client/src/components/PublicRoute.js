export const PublicRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        window.location.href = '/dashboard';
    } else {
        return children
    }
}