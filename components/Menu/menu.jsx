'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import QuizIcon from '@mui/icons-material/Quiz';
import PaymentsIcon from '@mui/icons-material/Payments';
import { scrollToContent } from '../../helpers/scrollTo'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import styles from './menu.module.css'

export default function Menu() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
          <ListItem disablePadding>
            <ListItemButton onClick={(event) => scrollToContent(event, 'offers')}>
              <ListItemIcon>
                <PermContactCalendarIcon/>
              </ListItemIcon>
              <ListItemText primary={'Послуги'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={(event) => scrollToContent(event, 'contacts')}>
              <ListItemIcon>
                <PermContactCalendarIcon/>
              </ListItemIcon>
              <ListItemText primary={'Контакти'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={(event) => scrollToContent(event, 'price')}>
              <ListItemIcon>
                <PaymentsIcon />
              </ListItemIcon>
              <ListItemText primary={'Ціни'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={(event) => scrollToContent(event, 'faq')}>
              <ListItemIcon>
                <QuizIcon />
              </ListItemIcon>
              <ListItemText primary={'Часті питання'} />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <button className={styles.whereWeMaCallButton} onClick={handleOpen}></button>
              </ListItemIcon>
              <ListItemText primary={'Записатися'} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <>
        <div className={styles.mobileMenu}>
            {open ? <MenuOpenIcon />: <MenuIcon onClick={toggleDrawer(true)}/>}
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
        <div className={styles.menu}>
            <a onClick={(event) => scrollToContent(event, 'offers')} className={styles.hoverunderlineanimation} href='#ofers'> Послуги</a>
            <a onClick={(event) => scrollToContent(event, 'contacts')} className={styles.hoverunderlineanimation} href='#Contats'> Контакти</a>
            <a onClick={(event) => scrollToContent(event, 'price')} className={styles.hoverunderlineanimation} href='#price'> Ціни</a>
            <a onClick={(event) => scrollToContent(event, 'faq')} className={styles.hoverunderlineanimation} href='#faq'> Часті питання</a>
        </div>
    </>
  );
}