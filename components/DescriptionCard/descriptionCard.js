'use client'

import { useState } from 'react';
import Image from "next/image";
import styles from "./descriptionCard.module.css";
import Modal from '@mui/material/Modal';
import Form from '../Form/form';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  width: {
      xs: '90%', // width on extra-small screens and up
      sm: '90%',  // width on small screens and up
      md: '420px',  // width on medium screens and up
    },
};

export default function DescriptionCard({ name, photo}) {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open)
  }
  
  return (
    <>
      <div className={styles.descriptionCard} onClick={handleModal} aria-label='Відрити вікно запису'>
        <p className={styles.descriptionCardName}>{name}</p>
        <div className={styles.descriptionCardPhotoCover}>
          <Image
          className={styles.photo}
          src={`/${photo}`}
          quality={100}
          fill
          alt={name}
        />
        </div>
      </div>
      <Modal
              open={open}
              onClose={handleModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style} >
                  <Form/>
              </Box>
          </Modal>
      </>
  );
}
