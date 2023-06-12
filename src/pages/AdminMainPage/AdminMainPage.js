import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import axios from 'axios';
import Orders from './Orders';
import Orders2 from './Orders2';

function AdminMainPage() {
  const [applicantList, setApplicantList] = useState([]);
  const [petsitterList, setPetsitterList] = useState([]);
  useEffect(() => {
    axios.get('https://withpet.site/api/v1/show-applicants', { withCredentials: true })
      .then((res) => {
        setApplicantList(res.data.result);
      });
    axios.get('https://withpet.site/api/v1/admin/show-petsitters', { withCredentials: true })
      .then((res) => {
        setPetsitterList(res.data.result);
      });
  }, []);

  const handleApprove = (row) => {
    const temp = {
      userId: row.applicant_user_id,
    };

    axios.post('https://withpet.site/api/v1/admin/accept-petsitter', temp, { withCredentials: true })
      .then((res) => {
        setApplicantList(applicantList.filter((item2) => (item2.applicant_user_id !== row.applicant_user_id)));
        setPetsitterList(petsitterList.concat(res.data.result));
      })
      .catch(() => {});
  };
  const handleCancle = (row) => {
    const temp = {
      userId: row.applicant_user_id,
    };
    axios.post('https://withpet.site/api/v1/admin/refuse-applicant', temp, { withCredentials: true })
      .then(() => {
        setApplicantList(applicantList.filter((item2) => (item2.applicant_user_id !== row.applicant_user_id)));
      })
      .catch(() => {});
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Orders2 rows={petsitterList} />
            </Paper>
          </Grid>
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
