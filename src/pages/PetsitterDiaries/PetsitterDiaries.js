import React, { useState } from 'react';
import Diary from './Diary';
import DiaryAdd from './DiaryAdd';

function PetsitterDiaries() {
  const [toggle, setToggle] = useState('simple');

  const list = [
    {
      id: 1,
      name: '강아지',
      date: '2023-05-23',
      img: 'img',
      category: '산책',
      title: '산책다녀왔어요~',
      content: '오늘은 귀여운 칭구랑 같이 산책을 다녀왔어요~',
    },
    {
      id: 2,
      name: '강아지2',
      date: '2023-05-24',
      img: 'img',
      category: '산책2',
      title: '산책다녀왔어요~',
      content: '오늘은 귀여운 칭구랑 같이 산책을 다녀왔어요~~!',
    },
    {
      id: 3,
      name: '강아지3',
      date: '2023-05-25',
      img: 'img',
      category: '산책3',
      title: '산책다녀왔어요~',
      content: '오늘은 귀여운 칭구랑 같이 산책을 다녀왔어요~!!!',
    },
  ];

  return (
    <>
      {/* 강아지 A 에 대한 리스트 보여줌 */}
      <div style={{ background: 'orange' }}>
        <DiaryAdd />
        {list.map((item) => {
          return <Diary item={item} setToggle={setToggle} />;
        })}
      </div>
    </>
  );
}

export default PetsitterDiaries;
