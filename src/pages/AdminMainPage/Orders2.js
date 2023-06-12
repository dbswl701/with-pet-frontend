import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export default function Orders({ rows }) {
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>펫시터 리스트</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>사진</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>계정</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell align="right">삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.petSitterId}>
              <TableCell>{row.petSitterId}</TableCell>
              <TableCell><img src={row.userProfileImg} alt="img" style={{ width: '50px', borderRadius: '50%' }} /></TableCell>
              <TableCell>{row.userName}</TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.userPhone}</TableCell>
              <TableCell align="right">
                <button>x</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
