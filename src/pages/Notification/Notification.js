// import React, { useEffect, useState } from 'react';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import { useNavigate } from 'react-router';

// /* eslint-disable no-console */
// const Alert = React.forwardRef((props, ref) => {
//   // eslint-disable-next-line react/jsx-props-no-spreading
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
// function NotificationComponent() {
//   const [open, setOpen] = useState(false);
//   const [noti, setNoti] = useState({});
//   const navigate = useNavigate();
//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };
//   const handleClick = () => {
//     navigate(noti.url);
//   };

//   useEffect(() => {
//     const eventSource = new EventSource('https://withpet.site/api/v1/notifications/subscribe', { withCredentials: true });

//     eventSource.addEventListener('sse', (event) => {
//       console.log(event.data);
//       setOpen(true);
//       const newNotification = JSON.parse(event.data);
//       console.log(newNotification);
//       setNoti(newNotification);
//     });

//     const handleOpen = () => {
//       console.log('연결!!');
//       console.log(new Date());
//     };

//     const handleMessage = (event) => {
//       console.log('알람!!!');
//       setOpen(true);
//       const newNotification = JSON.parse(event.data);
//       console.log(newNotification);
//       setNoti(newNotification);
//     };

//     const handleError = () => {
//       console.log('연결 종료');
//       console.log(new Date());
//       eventSource.close();
//     };

//     eventSource.addEventListener('open', handleOpen);
//     eventSource.addEventListener('message', handleMessage);
//     eventSource.addEventListener('error', handleError);

//     return () => {
//       eventSource.close();
//     };
//   }, []);

//   return (
//     <>
//       <Snackbar onClick={handleClick} open={open} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//           <p>{noti.notificationType}</p>
//           <p>{noti.content}</p>
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

// export default NotificationComponent;
