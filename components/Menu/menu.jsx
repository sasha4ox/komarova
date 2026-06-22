"use client";

import * as React from "react";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import QuizIcon from "@mui/icons-material/Quiz";
import PaymentsIcon from "@mui/icons-material/Payments";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PolicyIcon from "@mui/icons-material/Policy";
import FeedIcon from "@mui/icons-material/Feed";
import styles from "./menu.module.css";
import { useOnClickOutside } from "../../helpers/useOnClickOutside";

export default function Menu() {
  const t = useTranslations("nav");
  const [open, setOpen] = React.useState(false);
  const ref = useRef(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useOnClickOutside(ref, () => {
    if (open) setOpen(false);
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const navItems = [
    { href: "/#offers", label: t("services"), icon: <PermContactCalendarIcon /> },
    { href: "/#contacts", label: t("contacts"), icon: <PermContactCalendarIcon /> },
    { href: "/#price", label: t("price"), icon: <PaymentsIcon /> },
    { href: "/#faq", label: t("faq"), icon: <QuizIcon /> },
    {
      href: "/polityka-konfidentsiynosti",
      label: t("privacy"),
      icon: <PolicyIcon />,
    },
    { href: "/oferta", label: t("oferta"), icon: <FeedIcon /> },
  ];

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        position: "fixed",
        left: "0",
        top: 0,
        background: "white",
        height: "100vh",
      }}
      role="presentation"
      onClick={() => toggleDrawer()}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton component={Link} href={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <div className={styles.mobileMenu} ref={ref}>
        {open ? (
          <MenuOpenIcon onClick={() => toggleDrawer()} />
        ) : (
          <MenuIcon onClick={() => toggleDrawer()} />
        )}
        {open ? DrawerList : null}
      </div>
      <div className={styles.menu}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            className={styles.hoverunderlineanimation}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
