  'use client'

  import Divider from '@mui/material/Divider';
  import Paper from '@mui/material/Paper';
  import Stack from '@mui/material/Stack';
  import styled from './header.module.css'

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: (theme.vars ?? theme).palette.text.secondary,
  //   ...theme.applyStyles('dark', {
  //     backgroundColor: '#1A2027',
  //   }),
  // }));

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
            <a> Link 1</a>
          </section>
        
        </Stack>
      </>
    );
  }
