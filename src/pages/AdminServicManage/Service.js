import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Modify from './Modify';

function Service({
  listName, item, onModify, onDelete,
}) {
  const [toggle, setToggle] = useState(false);
  const basic = (
    <TableRow>
      <TableCell>{item.serviceId}</TableCell>
      <TableCell><img src={item.serviceImg} alt="img" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></TableCell>
      <TableCell>{item.serviceName}</TableCell>
      <TableCell>{item.serviceIntroduction}</TableCell>
      <TableCell>
        <button onClick={() => setToggle(!toggle)}>수정</button>
        <button onClick={() => onDelete(item)}>삭제</button>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      { toggle === false ? basic : <Modify listName={listName} item={item} onSubmit={onModify} onToggle={setToggle} onDelete={onDelete} /> }
    </>
  );
}

export default Service;
