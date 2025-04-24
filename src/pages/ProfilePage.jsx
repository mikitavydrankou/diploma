import { useAuthStore } from "../store/authStore.js";

const ProfilePage = () => {
    const { user, isLoading } = useAuthStore();
    const link = user?.link;

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

            <p>A to jest mail który wprowadziłeś:</p>
            <p>
                <strong>{user.email}</strong>
            </p>

            <div className="social-link">
                <p>Twój Facebook</p>
                <a href={user.link} target="_blank" rel="noopener noreferrer">
                    Facebook
                </a>
            </div>

            <button
                onClick={() => navigator.clipboard.writeText(user.link)}
                title="Скопировать ссылку"
            >
                📋
            </button>
        </div>
    );
};

export default ProfilePage;
