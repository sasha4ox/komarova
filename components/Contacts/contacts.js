'use client'
import { useMemo, useState } from 'react';
import styles from "./contacts.module.css";
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

export default function Contacts() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={styles.whereWeMaCallWrapper}>
        <h1 className={styles.sectionName}>Контакти</h1>
        <section>
          <p className={styles.whereWeMaCallHeader}>Де проходять зустрічі?</p>
          {/* <p>Онлайн сесії в:</p> */}
          {/* <p className={styles.whereWeMaCallApps}>Zoom;<br/> Google Meet;<br/> Telegram;<br/>Де Вам зручно!</p> */}
          <p>Онлайн-сесії проходять у зручному для Вас форматі. Ви можете обрати будь-яку платформу — Zoom, Google Meet або Telegram.
            Ми підлаштовуємося під Ваші можливості та вподобання, щоб консультація проходила комфортно, без зайвого стресу та з максимальною користю.
            Де Вам зручно — там і працюємо.
          </p>
          <button className={styles.whereWeMaCallButton} onClick={handleOpen}>Записатися</button>
        </section>
        {/* <section>
          <p>Онлайн сесії</p>
          <p>Zoom; Google Meet; Telegram;Де Вам зручно!</p>
        </section> */}
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
    </div>
  );
}


