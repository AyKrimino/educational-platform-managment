import quizroomLogo from "../assets/images/quizroom_hub_logo.png";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ProfilePictureContext from "../context/ProfilePictureContext";

const settings = ["Account", "Home", "Classrooms", "Logout"];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { logout } = useContext(AuthContext);
  const { profilePicture } = useContext(ProfilePictureContext);
  const navigate = useNavigate();

  const handleAccount = () => {
    navigate("/account");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleClassrooms = () => {
    navigate("/classrooms");
  }

  const settingsHandlers = {
    Account: handleAccount,
    Home: handleHome,
    Logout: handleLogout,
    Classrooms: handleClassrooms,
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <header className="flex justify-between w-full h-[8%] bg-blue-600 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex items-center justify-center gap-4 cursor-pointer">
        <Link
          to="/home"
          className="flex items-center justify-center gap-4 cursor-pointer"
        >
          <img src={quizroomLogo} alt="quizroom logo" className="w-10 h-10" />
          <p className="font-semibold font-mono tracking-wider text-xl text-gray-100">
            QuizRoom Hub
          </p>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  className="cursor-pointer"
                  alt="user profile picture"
                  src={profilePicture}
                />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => {
                  settingsHandlers[setting]();
                  handleCloseUserMenu();
                }}
              >
                <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
    </header>
  );
};

export default Header;
