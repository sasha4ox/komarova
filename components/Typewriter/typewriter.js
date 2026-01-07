'use client'
import { useState } from 'react';
import Typewriter from 'typewriter-effect';
import styles from './typewriter.module.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Form from '../Form/form'
import CloseIcon from '@mui/icons-material/Close';

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

export default function TypeWriter() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <section className={styles.typeWriterWrapper}>
      <Typewriter
        options={{
          loop: true,
          changeDelay: 100
        }}
        onInit={(typewriter) => {
          typewriter.typeString('Налагодіть стосунки')  
            .pauseFor(1500)
            .deleteAll()
            .typeString('Вірте в себе')
            .pauseFor(1500)
            .deleteAll()
            .typeString('Змініть своє <strong>життя</strong>')
            .pauseFor(1500)
            .deleteChars(5)
            .typeString('<strong>ставлення до себе</strong>')
            .pauseFor(1500)
            .deleteChars(17)
            .typeString('<strong>внутрішнє налаштування</strong>')
            .pauseFor(1500)
            .deleteAll()
            .typeString('Живіть в гармонії')
            .pauseFor(1500)
            .start();
        }}
      />
      <button className={styles.typewriterButton} onClick={handleOpen}>Записатись на консультацію</button>
      <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title-card"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                  <CloseIcon onClick={handleClose} style={{position: 'absolute', right: '20px', top: '20px', cursor: 'pointer'}}/>
                    <Form/>
                </Box>
            </Modal>
        </div>
    </section>
  );
}

