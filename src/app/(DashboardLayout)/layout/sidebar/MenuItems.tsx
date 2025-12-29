import {
  IconLayoutDashboard,
  IconUser,
  IconTag,
  IconPoint,
  IconUserCircle,
  IconSettings,
  IconCreditCard,
  IconShield,
  IconShieldLock,
  IconNews,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  // {
  //   navlabel: true,
  //   subheader: "HOME",
  // },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUserCircle,
    href: "/profile",
  },
  {
    id: uniqueId(),
    title: "Settings",
    icon: IconSettings,
    href: "/settings",
  },
   {
    id: uniqueId(),
    title: "Blog",
    icon: IconNews,
    href: "/cms/blog",
  },  
  {
    id: uniqueId(),
    title: "Subscription",
    icon: IconCreditCard,
    href: "/subscription",
  },
  // {
  //   // navlabel: true,
  //   // subheader: "ADMINISTRATION",
  // },
  {
    id: uniqueId(),
    title: "Admin Dashboard",
    icon: IconShield,
    href: "/admin/dashboard",
    roles: ['admin', 'superadmin'],
  },
  {
    id: uniqueId(),
    title: "Super Admin",
    icon: IconShieldLock,
    href: "/superadmin/dashboard",
    roles: ['superadmin'],
  },
  {
    id: uniqueId(),
    title: "Role Management",
    icon: IconTag,
    href: "/role-management",
    roles: ['admin', 'superadmin'],
    children: [
      {
        id: uniqueId(),
        title: "Manage Roles",
        icon: IconPoint,
        href: "/role-management/roles",
      },
      {
        id: uniqueId(),
        title: "Manage Users",
        icon: IconPoint,
        href: "/role-management/users",
      },
    ],
  },
];

export default Menuitems;
