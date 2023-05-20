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
    // id: '',
    serviceName: '',
    serviceImg: '',
    serviceIntroduction: '',
  });
  const [criticalList, setCriticalList] = useState([]);

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/show-services', { withCredentials: true })
      .then((res) => {
        setList(res.data.result);
        console.log(res.data.result);
      });
    axios.get('https://withpet.site/api/v1/show-criticalservices', { withCredentials: true })
      .then((res) => {
        setCriticalList(res.data.result);
        console.log(res.data.result);
      });
  }, []);

  const onChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setData({
          ...data,
          serviceImg: reader.result,
        });
      };
    } else {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value,
      });
    }
  };
  console.log(data);

  const onSubmit = (e, listName) => { // 하나 등록 시
    e.preventDefault();
    // setList(list.concat({ ...data, id: nextId.current }));
    nextId.current += 1;
    // console.log({ ...data, id: nextId.current });
    // data.serviceImg = '123';
    console.log(data);
    axios.post(`https://withpet.site/api/v1/admin/add-${listName}`, data, { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        if (listName === 'service') {
          setList(list.concat(res.data.result));
        } else {
          setCriticalList(list.concat(res.data.result));
        }
      })
      .catch(() => {
      });
    setData({
      serviceName: '',
      serviceImg: '',
      serviceIntroduction: '',
    });
  };

  const onSubmitModify = (modifyPetInfo, listName) => {
    // setList(list.map((pet) => (pet.id === id ? modifyPetInfo : pet)));
    console.log(modifyPetInfo);
    console.log(`https://withpet.site/api/v1/admin/${listName}`);
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
    console.log(item);
    setList(list.filter((item2) => (item2.serviceId !== item.serviceId)));

    axios.post('https://withpet.site/api/v1/admin/service', item, { withCredentials: true })
      .then(() => {
        console.log(item);
        setList(list.filter((item2) => (item2.serviceId !== item.serviceId)));
      });
  };
  console.log(list);
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <WithPetServices listName="service" list={list} data={setData} onChange={onChange} onSubmit={onSubmit} onSubmitModify={onSubmitModify} onDelete={onDelete} />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <WithPetServices listName="criticalservice" list={criticalList} data={setData} onChange={onChange} onSubmit={onSubmit} onSubmitModify={onSubmitModify} onDelete={onDelete} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
