import { useAuthStore } from "../store/authStore.js";
import { Container, Box, Typography, Button, Chip, Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ProfilePage = () => {
    const { user, isLoading } = useAuthStore();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your profile</div>;
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Stack alignItems="center">
                <Typography variant="h4" gutterBottom>
                    Masz na imię: {user.username}
                    <br />
                    <br />
                </Typography>
            </Stack>

            <Stack spacing={3} alignItems="center">
                <Button
                    href={user?.link}
                    target="_blank"
                    variant="outlined"
                    sx={{ mt: 1 }}
                    fullWidth
                >
                    Profil Facebook
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => navigator.clipboard.writeText(user.link)}
                    fullWidth
                >
                    Skopiuj link
                </Button>
            </Stack>
        </Container>
    );
};

export default ProfilePage;
