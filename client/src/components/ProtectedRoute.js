export const ProtectedRoute = ({ children }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        return children;
    } else {
        // navigate to /login
        window.location.href = '/login';
    }
};