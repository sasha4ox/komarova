'use client'
import * as React from 'react';
import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Link from 'next/link'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import QuizIcon from '@mui/icons-material/Quiz';
import PaymentsIcon from '@mui/icons-material/Payments';
import { scrollToContent } from '../../helpers/scrollTo'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PolicyIcon from '@mui/icons-material/Policy';
import FeedIcon from '@mui/icons-material/Feed';
import styles from './menu.module.css';
import { useOnClickOutside } from '../../helpers/useOnClickOutside'

const style = {
  position: 'absolute',
  top: '0',
  left: '0',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  width: {
      xs: '90%', // width on extra-small screens and up
      sm: '90%',  // width on small screens and up
      md: '420px',  // width on medium screens and up
    },
};

export default function Menu() {
  const [open, setOpen] = React.useState(false);
  const modalRef = useRef(null);
  const toggleDrawer = () => {
    console.log("toggleDrawer", open)
    setOpen(!open);
  };


  const ref = useRef(null);

  useOnClickOutside(ref, () => toggleDrawer());

  useEffect(()=> {
    if(open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open])

  const DrawerList = (
    <Box sx={{ width: 250, position: 'fixed', left: '0', top: 0, background: 'white', height: '100vh' }} role="presentation" onClick={() => toggleDrawer()}>
      <List>
          <ListItem disablePadding>
            <ListItemButton  component={Link} href="/#offers">
              <ListItemIcon>
                <PermContactCalendarIcon/>
              </ListItemIcon>
              <ListItemText primary={'Послуги'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  component={Link} href="/#contacts">
              <ListItemIcon>
                <PermContactCalendarIcon/>
              </ListItemIcon>
              <ListItemText primary={'Контакти'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  component={Link} href="/#price">
              <ListItemIcon>
                <PaymentsIcon />
              </ListItemIcon>
              <ListItemText primary={'Вартість'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  component={Link} href="/#faq">
              <ListItemIcon>
                <QuizIcon />
              </ListItemIcon>
              <ListItemText primary={'Часті питання'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
                component={Link}
                href="/polityka-konfidentsiynosti"
              >
                <ListItemIcon>
                  <PolicyIcon />
                </ListItemIcon>
                <ListItemText primary={'Політика конфіденційності'} />
              </ListItemButton>
          </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/oferta"
              >
                <ListItemIcon>
                  <FeedIcon />
                </ListItemIcon>
                <ListItemText primary={'Публічна оферта'} />
              </ListItemButton>
          </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
        <div className={styles.mobileMenu} >
            {open ? <MenuOpenIcon onClick={() => toggleDrawer()}/>: <MenuIcon onClick={() => toggleDrawer()}/>}
            {open ? DrawerList : null}
        </div>
        <div className={styles.menu}>
            <Link className={styles.hoverunderlineanimation} href='/#ofers'> Послуги</Link>
            <Link className={styles.hoverunderlineanimation} href='/#contacts'> Контакти</Link>
            <Link className={styles.hoverunderlineanimation} href='/#price'> Вартість</Link>
            <Link className={styles.hoverunderlineanimation} href='/#faq'> Часті питання</Link>
            <Link href="/polityka-konfidentsiynosti" className={styles.hoverunderlineanimation}>Політика конфіденційності</Link>
            <Link href="/oferta" className={styles.hoverunderlineanimation}>Публічна оферта</Link>
        </div>
    </>
  );
}