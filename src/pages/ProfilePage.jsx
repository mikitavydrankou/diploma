import { useAuthStore } from "../store/authStore.js";

const ProfilePage = () => {
    const { user, isLoading } = useAuthStore();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your profile</div>;
    }

    return (
        <div>
            <h1>Twój profile</h1>
            <p>Hej, twój nickname to:</p>
            <p>
                <strong>{user.username}</strong>
            </p>
            <p>To jest link do twojego Facebooku:</p>
            <p>
                <strong>{user.link}</strong>
            </p>
            <p>A to jest mail który wprowadziłeś:</p>
            <p>
                <strong>{user.email}</strong>
            </p>
        </div>
    );
};

export default ProfilePage;
