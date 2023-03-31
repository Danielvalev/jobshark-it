import DefaultLayout from "./DefaultLayout";

export const ProtectedRoute = ({ children }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        return <DefaultLayout>{ children }</DefaultLayout>;
    } else {
        // navigate to /login
        window.location.href = '/login';
    }
};