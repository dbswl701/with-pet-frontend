import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';

function UserDiaryList() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [diaries, setDiaries] = useState([]);

    const categoryId = 0;
    const day = '2021-10-10';
    const dogId = 0;

    const diary = {
        categoryId: 0,
        day: '2021-10-10',
        dogId: 0,
    };

    useEffect(() => {
        axios.get(`https://withpet.site/api/v1/userdiaries/day?categoryId=${categoryId}&day=${day}&dogId=${dogId}`, { withCredentials: true })
            .then((res) => {
                setDiaries(res.data.result);
                console.log(res.data.result);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <Button variant='contained' onClick={handleOpen}>작성</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    width: 800,
                    height: 'flex',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    margin: 'auto',
                    p: 2,
                }}
                >
                    <div className="diary_container">
                        {diaries.map((diary) => {
                            return (
                                diary.content
                            );
                        })}
                    </div>
                    <Button type='button' onClick={handleClose}>닫기</Button>
                </Box>
            </Modal>
        </div>

    );
}

export default UserDiaryList;
