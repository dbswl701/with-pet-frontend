import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import axios from 'axios';
import { getPetsitterApplicantList, getPetsitterList } from '../../services/admin';
import PetssiterList from './Components/PetssiterList';
import ApplicantList from './Components/ApplicantList';

function AdminMainPage() {
  const [applicantList, setApplicantList] = useState([]);
  const [petsitterList, setPetsitterList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resApplicant = await getPetsitterApplicantList();
        setApplicantList(resApplicant.data.result);
        const resPetsitter = await getPetsitterList();
        setPetsitterList(resPetsitter.data.result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleApprove = (row) => {
    const temp = {
      userId: row.applicantId,
    };

    axios.post('https://withpet.site/api/v1/admin/accept-petsitter', temp, { withCredentials: true })
      .then((res) => {
        setApplicantList(applicantList.filter((item2) => (item2.applicantId !== row.applicantId)));
        setPetsitterList(petsitterList.concat(res.data.result));
      })
      .catch(() => {});
  };
  const handleCancle = (row) => {
    const temp = {
      userId: row.applicantId,
    };
    axios.post('https://withpet.site/api/v1/admin/refuse-applicant', temp, { withCredentials: true })
      .then(() => {
        setApplicantList(applicantList.filter((item2) => (item2.applicantId !== row.applicantId)));
      })
      .catch(() => {});
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <PetssiterList rows={petsitterList} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <ApplicantList rows={applicantList} handleApprove={handleApprove} handleCancle={handleCancle} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AdminMainPage;
