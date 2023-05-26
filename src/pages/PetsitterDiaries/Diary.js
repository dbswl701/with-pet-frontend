import React from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

function Diary({ item, setToggle }) {
  return (
    <div style={{ border: '1px solid black' }}>
      <p>item</p>
      <p>{item.name}</p>
      <p>{item.date}</p>
      <p>{item.category}</p>
      <p>{item.title}</p>
      <ExpandCircleDownIcon className="down-icon" fontSize="large" onClick={() => setToggle('detail')} />
    </div>
  );
}

export default Diary;
