import * as React from 'react';
import { useNavigate } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export default function Orders({ rows }) {
  const navigate = useNavigate();

  const onClick = (id) => {
    navigate(`./detail/${id}`);
  };

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>지원자 리스트</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>사진</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>계정</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell>상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.applicantId} onClick={() => onClick(row.applicantId)}>
              <TableCell>{row.applicantId}</TableCell>
              <TableCell><img src={row.applicantImg} alt="img" style={{ width: '50px', borderRadius: '50%' }} /></TableCell>
              <TableCell>{row.applicantName}</TableCell>
              <TableCell>{row.applicantEmail}</TableCell>
              <TableCell>{row.applicantPhone}</TableCell>
              <TableCell>{row.applicantStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
