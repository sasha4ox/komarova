  'use client'
import Image from "next/image";
import styles from "./card.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";

  export default function Card({ name, price, photo, checkName, items}) {
    return (
      <>
        <div className={styles.offerCard}>
            <div className={styles.offerHeader}>
              <span>{name}</span>
              <span>{price}</span>
            </div>
            <div className={styles.offersPhoto}>
              <Image
                className={styles.photo}
                src={`/${photo}`}
                quality={100}
                fill
                alt={`Фото для ${name}`}
              />
            </div>
            <div>
              <span className={styles.offerCheckHeader}>{checkName}</span>
                <List>
                    {items && items.map(item => {
                        return (
                             
                               <ListItem disablePadding key={item}>
                                <ListItemButton>
                                    <ListItemIcon classes={{root: styles.offerChecks}}>
                                    <CheckIcon sx={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                                </ListItem> 
                            
                        )
                           
                    })}
                </List>
            </div>
          </div>
      </>
    );
  }
