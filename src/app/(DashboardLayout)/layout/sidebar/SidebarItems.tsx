'use client';
import React from "react";
import Menuitems from "./MenuItems";
import { Box, Typography, useTheme } from "@mui/material";
import {
  Logo,
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconPoint } from '@tabler/icons-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upgrade } from "./Updrade";
import { useAppSelector } from '@/store/hooks';


const renderMenuItems = (items: any, pathDirect: any) => {

  return items.map((item: any) => {

    const Icon = item.icon ? item.icon : IconPoint;

    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      // Display Subheader
      return (
        <Menu
          subHeading={item.subheader}
          key={item.subheader}
        />
      );
    }

    //If the item has children (submenu)
    if (item.children) {
      const isChildActive = item.children.some((child: any) => child.href === pathDirect || (child.href !== '/' && pathDirect.startsWith(child.href)));
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius='7px'
          // Prevent parent highlight if library supports it, or rely on CSS
          // We want the parent to be open but not "selected" in the same way as the leaf
          defaultOpen={isChildActive}
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem

    return (
      <Box px={3} key={item.id}>
        <MenuItem
          key={item.id}
          isSelected={pathDirect === item?.href || (item?.href !== '/' && pathDirect.startsWith(item?.href))}
          borderRadius='8px'
          icon={itemIcon}
          link={item.href}
          component={Link}
        >
          {item.title}
        </MenuItem >
      </Box>

    );
  });
};


const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const theme = useTheme();
  const { user } = useAppSelector((state) => state.auth);

  const filteredItems = Menuitems.filter((item: any) => {
    if (item.roles) {
      return item.roles.includes(user?.role);
    }
    return true;
  });

  // Theme-aware colors
  const themeColor = theme.palette.mode === 'dark' ? '#6366f1' : '#5D87FF';
  const themeSecondaryColor = theme.palette.mode === 'dark' ? '#ec4899' : '#49beff';
  const logoSrc = theme.palette.mode === 'dark' ? '/images/logos/light-logo.svg' : '/images/logos/dark-logo.svg';

  return (
    <Box sx={{
      "& .MuiTypography-root": {
        color: theme.palette.text.primary,
        fontWeight: 500, // Better font weight
      },
      "& .MuiListItemIcon-root": {
        color: theme.palette.text.primary,
      },
      // Target the active item specifically
      "& .Mui-selected": {
        backgroundColor: `${themeColor} !important`,
        color: '#fff !important',
        "& .MuiTypography-root": {
          color: '#fff !important',
          fontWeight: 600,
        },
        "& .MuiListItemIcon-root": {
          color: '#fff !important',
        },
        "& svg": {
          color: '#fff !important',
        }
      },
      // Fix parent submenu highlight - ensure it doesn't get the same strong highlight if it's just a container
      // Note: This depends on how react-mui-sidebar renders the submenu header. 
      // If it uses Mui-selected on the header when a child is active, we might need to override it.
      // Assuming the library might NOT add Mui-selected to the header automatically, but if it does:
      "& .MuiCollapse-root .Mui-selected": {
        // This targets the CHILD item when selected
        backgroundColor: `${themeColor} !important`,
      },

      "& .MuiButtonBase-root": {
        color: theme.palette.text.primary,
        marginBottom: '4px', // Add spacing between items
        "&:hover": {
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        }
      },
      // Fix for unselected icons
      "& svg": {
        color: theme.palette.text.primary,
      }
    }}>
      <MUI_Sidebar
        width={"100%"}
        showProfile={false}
        themeColor={themeColor}
        themeSecondaryColor={themeSecondaryColor}
      >

        <Logo img={logoSrc} component={Link} to="/" >My Admin</Logo>

        {renderMenuItems(filteredItems, pathDirect)}
        <Box px={2}>
          {/* <Upgrade /> */}
        </Box>
      </MUI_Sidebar>

    </Box>
  );
};
export default SidebarItems;
