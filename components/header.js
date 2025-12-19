  'use client'

  import Divider from '@mui/material/Divider';
  import Stack from '@mui/material/Stack';
  import styled from './header.module.css'
  import { scrollToContent } from '../helpers/scrollTo'
  import Menu from '../components/Menu/menu'

  export default function HeaderComponent() {
    return (
      <>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <section>
            <p>Ірина Комарова</p>
            <p>Психолог для дорослих</p>
          </section>
          <section className={styled.linkWrapper}>
            <Menu />
          </section>
       
        </Stack>
      </>
    );
  }
