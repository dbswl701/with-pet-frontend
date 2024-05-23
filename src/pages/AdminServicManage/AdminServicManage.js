import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import WithPetServices from './WithPetServices';
import {
  getAdminCriticalServices, getAdminServices, postAdminService, deleteAdminService,
  putAdminService,
  putAdminCriticalService,
  postAdminCriticalService,
} from '../../services/admin';
import PostFileUpload from '../../services/upload';

export default function Orders() {
  const [list, setList] = useState([]);
  const [criticalList, setCriticalList] = useState([]);
  const [data, setData] = useState({
    serviceName: '',
    serviceImg: '',
    serviceIntro: '',
  });
  const [cridicalData, setCriticalData] = useState({
    serviceName: '',
    serviceImg: '',
    serviceIntro: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceRes = await getAdminServices();
        setList(serviceRes.data.result);
        const criticalServiceRes = await getAdminCriticalServices();
        setCriticalList(criticalServiceRes.data.result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = async (e, listName) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);
    try {
      const res = await PostFileUpload(formData);
      if (listName === 'service') {
        setData({
          ...data,
          serviceImg: res.data.result[0],
        });
      } else {
        setCriticalData({
          ...cridicalData,
          serviceImg: res.data.result[0],
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const onChange = (e) => {
    if (e.target.files) {
      handleImageUpload(e, 'service');
    } else {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const onCriticalChange = (e) => {
    if (e.target.files) {
      handleImageUpload(e, 'criticalservice');
    } else {
      const { name, value } = e.target;
      setCriticalData({
        ...cridicalData,
        [name]: value,
      });
    }
  };

  const onSubmit = async (e, listName) => { // 하나 등록 시
    e.preventDefault();
    const body = listName === 'service' ? data : cridicalData;

    try {
      if (listName === 'service') {
        const res = await postAdminService(body);
        setList(list.concat(res.data.result));
      } else if (listName === 'criticalservice') {
        const res = await postAdminCriticalService(body);
        setCriticalList(criticalList.concat(res.data.result));
      }
    } catch (err) {
      console.error(err);
    }
    setData({
      serviceName: '',
      serviceImg: '',
      serviceIntro: '',
    });
    setCriticalData({
      serviceName: '',
      serviceImg: '',
      serviceIntro: '',
    });
  };

  const onSubmitModify = async (modifyPetInfo, listName) => {
    try {
      if (listName === 'service') {
        const res = await putAdminService(modifyPetInfo);
        const updatedList = list.map((item) => {
          if (item.serviceId === modifyPetInfo.serviceId) {
            return res.data.result;
          }
          return item;
        });
        setList(updatedList);
      } else {
        const res = await putAdminCriticalService(modifyPetInfo);
        const updatedList = criticalList.map((item) => {
          if (item.serviceId === modifyPetInfo.serviceId) {
            return res.data.result;
          }
          return item;
        });
        setCriticalList(updatedList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async (item) => {
    try {
      await deleteAdminService(item.serviceId);
      setList(list.filter((item2) => (item2.serviceId !== item.serviceId)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>서비스 리스트</Typography>
              <WithPetServices listName="service" list={list} data={data} onChange={onChange} onSubmit={onSubmit} onSubmitModify={onSubmitModify} onDelete={onDelete} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>필수 서비스 리스트</Typography>
              <WithPetServices listName="criticalservice" list={criticalList} data={cridicalData} onChange={onCriticalChange} onSubmit={onSubmit} onSubmitModify={onSubmitModify} onDelete={onDelete} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
