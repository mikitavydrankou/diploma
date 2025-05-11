import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const BottomNavbar = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999,
            }}
        >
            <BottomNavigation showLabels>
                {user
                    ? // Явный массив элементов для авторизованного пользователя
                      [
                          <BottomNavigationAction
                              key="profile"
                              component={Link}
                              to="/profile"
                              label="Profile"
                              icon={<PersonIcon />}
                          />,
                          <BottomNavigationAction
                              key="home"
                              component={Link}
                              to="/"
                              label="Offers"
                              icon={<HomeIcon />}
                          />,
                          <BottomNavigationAction
                              key="logout"
                              label="Logout"
                              icon={<ExitToAppIcon />}
                              onClick={handleLogout}
                          />,
                      ]
                    : // Массив с одним элементом для неавторизованного
                      [
                          <BottomNavigationAction
                              key="signin"
                              component={Link}
                              to="/signin"
                              label="Signin"
                          />,
                      ]}
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNavbar;
