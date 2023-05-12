import React from 'react';
// import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import PetsitterInfo from './PetsitterInfo.json';

function AvailableDate() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
        <DemoItem>
          <DateCalendar views={['day']} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
// import styled from 'styled-components';

// const ChargeTable = styled.div`
// `;
// const ChargeWrapper = styled.div`
// `;

function ReserveInfo() {
//   cosnt[petsitterInfo, setPetsitterInfo] = useState([]);

  //   axios.get('/api/v1/petsitter/{petsitterId}')
  //     .then((response) => {
  //       setPetsitterInfo(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //     if (petsitterInfo.length > 0) {
  //         return (
  //             <div>
  //                 {petsitterInfo}
  //             </div>
  //         )
  //     }

  //   return (
  //     <div>
  //         {PetsitterInfo.charge}
  //         {console.log(PetsitterInfo)}
  //     </div>
  //   );

  return (
    <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 30 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>이용 요금</TableCell>
                    <TableCell align="right">1박당 케어</TableCell>
                    <TableCell align="right">데이 케어</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>소형견
                    <TableCell align="right">{PetsitterInfo.charge[0]}</TableCell>
                    <TableCell align="right">{PetsitterInfo.charge[1]}</TableCell>
                    </TableRow>
                    <TableRow>중형견
                    <TableCell align="right">{PetsitterInfo.charge[2]}</TableCell>
                    <TableCell align="right">{PetsitterInfo.charge[3]}</TableCell>
                    </TableRow>
                    <TableRow>대형견
                    <TableCell align="right">예약 불가</TableCell>
                    <TableCell align="right">예약 불가</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <div>
            <AvailableDate />
        </div>
    </>
  );
}

export default ReserveInfo;
