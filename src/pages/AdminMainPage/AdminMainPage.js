import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
// import styled from 'styled-components';
import axios from 'axios';
import Orders from './Orders';
import Orders2 from './Orders2';

function AdminMainPage() {
  // const Container = styled.div`
  //   background-color: #f5f5f5;
  // `;
  const [applicantList, setApplicantList] = useState([]);
  useEffect(() => {
    axios.get('https://withpet.site/api/v1/show-applicants', { withCredentials: true })
      .then((res) => {
        setApplicantList(res.data.result);
        console.log(res.data.result);
        console.log(applicantList);
      });
  }, []);
  return (
    <>
      {/* <Container>관리자 페이지의 메인페이지</Container> */}
      {/* 펫시터 리스트 */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Orders2 />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Orders rows={applicantList} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AdminMainPage;
