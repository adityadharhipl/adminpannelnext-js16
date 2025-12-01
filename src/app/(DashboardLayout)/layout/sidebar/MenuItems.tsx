import {
  IconAperture,
  IconBook2,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUser,
  IconUserPlus,
  IconTag,
  IconPoint,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },           

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },

  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  {
    id: uniqueId(),
    title: "User Management",
    icon: IconUser,
    href: "/sample-page",
  },
  {
    id: uniqueId(),
    title: "Role Management",
    icon: IconTag,
    href: "/role-user",
    children: [
      {
        id: uniqueId(),
        title: "Role Management",
        icon: IconPoint,
        href: "/roles",
      },
      {
        id: uniqueId(),
        title: "User",
        icon: IconPoint,
        href: "/",
      },
    ],
  },


  // {
  //   navlabel: true,
  //   subheader: "AUTH",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: " EXTRA",
  // },


];

export default Menuitems;


