import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import WithPetServices from './WithPetServices';

export default function Orders() {
  const nextId = useRef(5);
  const [list, setList] = useState([]);
  const [data, setData] = useState({
    serviceName: '',
    serviceImg: '',
    serviceIntro: '',
  });
  const [criticalList, setCriticalList] = useState([]);

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/show-services', { withCredentials: true })
      .then((res) => {
        setList(res.data.result);
      });
    axios.get('https://withpet.site/api/v1/show-criticalservices', { withCredentials: true })
      .then((res) => {
        setCriticalList(res.data.result);
      });
  }, []);

  const handleImageUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios.post('https://withpet.site/api/v1/file/upload', formData, config)
      .then((res) => {
        setData({
          ...data,
          serviceImg: res.data.result[0],
        });
      });
  };

  const onChange = (e) => {
    if (e.target.files) {
      handleImageUpload(e);
    } else {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const onSubmit = (e, listName) => { // 하나 등록 시
    e.preventDefault();
    nextId.current += 1;
    axios.post(`https://withpet.site/api/v1/admin/add-${listName}`, data, { withCredentials: true })
      .then((res) => {
        if (listName === 'service') {
          setList(list.concat(res.data.result));
        } else if (listName === 'criticalservice') {
          setCriticalList(criticalList.concat(res.data.result));
        }
      })
      .catch(() => {
      });
    setData({
      serviceName: '',
      serviceImg: '',
      serviceIntro: '',
    });
  };

  const onSubmitModify = (modifyPetInfo, listName) => {
    axios.put(`https://withpet.site/api/v1/admin/${listName}`, modifyPetInfo, { withCredentials: true })
      .then((res) => {
        if (listName === 'service') {
          const updatedList = list.map((item) => {
            if (item.serviceId === modifyPetInfo.serviceId) {
              return res.data.result;
            }
            return item;
          });
          setList(updatedList);
        } else {
          const updatedList = criticalList.map((item) => {
            if (item.serviceId === modifyPetInfo.serviceId) {
              return res.data.result;
            }
            return item;
          });
          setCriticalList(updatedList);
        }
      })
      .catch(() => {
      });
  };

  const onDelete = (item) => {
    setList(list.filter((item2) => (item2.serviceId !== item.serviceId)));

    axios.post('https://withpet.site/api/v1/admin/service', item, { withCredentials: true })
      .then(() => {
        setList(list.filter((item2) => (item2.serviceId !== item.serviceId)));
      });
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <WithPetServices listName="service" list={list} data={data} onChange={onChange} onSubmit={onSubmit} onSubmitModify={onSubmitModify} onDelete={onDelete} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <WithPetServices listName="criticalservice" list={criticalList} data={data} onChange={onChange} onSubmit={onSubmit} onSubmitModify={onSubmitModify} onDelete={onDelete} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
