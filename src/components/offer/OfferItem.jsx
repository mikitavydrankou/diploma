import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const OfferItem = ({ offer, currentTime }) => {
    const calculateTimeLeft = () => {
        const expirationDate = new Date(offer.expiresAt);
        const diff = expirationDate - currentTime;

        if (diff <= 0) return "Left";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        return `${hours}ч ${minutes.toString().padStart(2, "0")}м`;
    };

    const user = useAuthStore((s) => s.user);

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 300,
                minWidth: 140,
                margin: "0 auto",
                height: 0,
                paddingTop: "100%",
                position: "relative",
            }}
        >
            <Card
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                    },
                }}
            >
                <CardContent
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        p: 2,
                        overflow: "hidden",
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mb={1}
                        minHeight={24}
                    >
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                            sx={{ maxWidth: "60%" }}
                        >
                            {offer.user.username}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {calculateTimeLeft()}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body1"
                        sx={{
                            flexGrow: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            fontSize: "0.9rem",
                            lineHeight: 1.3,
                            mb: 1,
                        }}
                    >
                        {offer.title}
                    </Typography>

                    <Button
                        component={Link}
                        to={user ? `/offer/${offer.id}` : "/signin"}
                        variant="contained"
                        size="small"
                        sx={{
                            mt: "auto",
                            py: 0.5,
                            fontSize: "0.75rem",
                        }}
                    >
                        Napisać
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default OfferItem;
