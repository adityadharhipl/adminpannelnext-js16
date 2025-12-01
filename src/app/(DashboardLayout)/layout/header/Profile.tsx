// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   Avatar,
//   Box,
//   Menu,
//   Button,
//   IconButton,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";

// import { IconListCheck, IconMail, IconUser, IconLogin, IconUserPlus } from "@tabler/icons-react";

// const Profile = () => {
//   const [anchorEl2, setAnchorEl2] = useState(null);
//   const handleClick2 = (event: any) => {
//     setAnchorEl2(event.currentTarget);
//   };
//   const handleClose2 = () => {
//     setAnchorEl2(null);
//   };

//   return (
//     <Box>
//       <IconButton
//         size="large"
//         aria-label="show 11 new notifications"
//         color="inherit"
//         aria-controls="msgs-menu"
//         aria-haspopup="true"
//         sx={{
//           ...(typeof anchorEl2 === "object" && {
//             color: "primary.main",
//           }),
//         }}
//         onClick={handleClick2}
//       >
//         <Avatar
//           src="/images/profile/user-1.jpg"
//           alt="image"
//           sx={{
//             width: 35,
//             height: 35,
//           }}
//         />
//       </IconButton>
//       {/* ------------------------------------------- */}
//       {/* Message Dropdown */}
//       {/* ------------------------------------------- */}
//       <Menu
//         id="msgs-menu"
//         anchorEl={anchorEl2}
//         keepMounted
//         open={Boolean(anchorEl2)}
//         onClose={handleClose2}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         sx={{
//           "& .MuiMenu-paper": {
//             width: "200px",
//           },
//         }}
//       >
//         <MenuItem>
//           <ListItemIcon>
//             <IconUser width={20} />
//           </ListItemIcon>
//           <ListItemText>My Profile</ListItemText>
//         </MenuItem>
//         <MenuItem component={Link} href="/authentication/login">
//           <ListItemIcon>
//             <IconLogin width={20} />
//           </ListItemIcon>
//           <ListItemText>Login</ListItemText>
//         </MenuItem>
//         <MenuItem component={Link} href="/authentication/register">
//           <ListItemIcon>
//             <IconUserPlus width={20} />
//           </ListItemIcon>
//           <ListItemText>Register</ListItemText>
//         </MenuItem>


//         <Box mt={1} py={1} px={2}>
//           <Button
//             href="/authentication/login"
//             variant="outlined"
//             color="primary"
//             component={Link}
//             fullWidth
//           >
//             Logout
//           </Button>
//         </Box>
//       </Menu>
//     </Box>
//   );
// };

// export default Profile;



"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";

import {
  IconUser,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on component load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect
    window.location.href = "/authentication/login";
  };

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="profile"
          sx={{ width: 35, height: 35 }}
        />
      </IconButton>

      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ "& .MuiMenu-paper": { width: "200px" } }}
      >
        {/* ---------------------- SHOW ONLY WHEN LOGGED IN ---------------------- */}
        {isLoggedIn && (
          <MenuItem>
            <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
        )}

        {/* ---------------------- SHOW ONLY WHEN LOGGED OUT ---------------------- */}
        {!isLoggedIn && (
          <MenuItem component={Link} href="/authentication/login">
            <ListItemIcon>
              <IconLogin width={20} />
            </ListItemIcon>
            <ListItemText>Login</ListItemText>
          </MenuItem>
        )}

        {!isLoggedIn && (
          <MenuItem component={Link} href="/authentication/register">
            <ListItemIcon>
              <IconUserPlus width={20} />
            </ListItemIcon>
            <ListItemText>Register</ListItemText>
          </MenuItem>
        )}

        {/* ---------------------- LOGOUT BUTTON ---------------------- */}
        {isLoggedIn && (
          <Box mt={1} py={1} px={2}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default Profile;

