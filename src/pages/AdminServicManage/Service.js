import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
import Modify from './Modify';

function Service({ item, onModify, onDelete }) {
  const [toggle, setToggle] = useState(false);
  const basic = (
    <TableRow key={item.id}>
      <TableCell>{item.id}</TableCell>
      <TableCell><img src={item.img} alt="img" style={{ width: '50px' }} /></TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.intro}</TableCell>
      <TableCell>
        <button onClick={() => setToggle(!toggle)}>수정</button>
        <button onClick={() => onDelete(item.id)}>삭제</button>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      { toggle === false ? basic : <Modify item={item} onSubmit={onModify} onToggle={setToggle} onDelete={onDelete} /> }
    </>
  );
}

export default Service;
