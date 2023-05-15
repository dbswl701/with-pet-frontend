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
  const [petsitterList, setPetsitterList] = useState([]);
  useEffect(() => {
    axios.get('https://withpet.site/api/v1/show-applicants', { withCredentials: true })
      .then((res) => {
        setApplicantList(res.data.result);
        console.log(res.data.result);
        console.log(applicantList);
      });
    axios.get('https://withpet.site/api/v1/admin/show-petsitters', { withCredentials: true })
      .then((res) => {
        setPetsitterList(res.data.result);
        console.log(res.data.result);
        console.log(petsitterList);
      });
  }, []);

  const handleApprove = (row) => {
    console.log(row);
    const temp = {
      applicantId: row.applicant_id,
      applicantStatus: 'APPROVE',
      applicant_userId: row.applicant_user_id,
    };
    console.log(temp);
    console.log(row.applicant_id);
    // setList(list.filter((item2) => (item2.serviceId !== item.serviceId)));

    axios.post('https://withpet.site/api/v1/admin/accept-petsitter', temp, { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        setApplicantList(applicantList.filter((item2) => (item2.applicant_user_id !== row.applicant_user_id)));
        setPetsitterList(petsitterList.concat(res.data.result));
      })
      .catch(() => {});
  };
  console.log(petsitterList);
  const handleCancle = (row) => {
    const temp = {
      applicantId: row.applicant_id,
      applicantStatus: 'APPROVE',
      applicant_userId: row.applicant_user_id,
    };
    console.log(temp);
    axios.post('https://withpet.site/api/v1/admin/refuse-applicant', temp, { withCredentials: true })
      .then((res) => {
        setApplicantList(applicantList.filter((item2) => (item2.applicant_user_id !== row.applicant_user_id)));
        console.log(res.data);
      })
      .catch(() => {});
  };
  return (
    <>
      {/* <Container>관리자 페이지의 메인페이지</Container> */}
      {/* 펫시터 리스트 */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Orders2 rows={petsitterList} />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Orders rows={applicantList} handleApprove={handleApprove} handleCancle={handleCancle} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AdminMainPage;
