import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, SideBar } from '../../styles/sidebar/SidebarStyle';

function PetsitterInfoModifySidebar({ setMenu }) {
  const navigate = useNavigate();
  return (
    <SideBar>
      <Button onClick={() => setMenu('house')}>집사진</Button>
      <Button onClick={() => setMenu('hashtag')}>해시태그</Button>
      <Button onClick={() => setMenu('intro')}>소개글</Button>
      <Button onClick={() => setMenu('license')}>자격증</Button>
      <Button onClick={() => setMenu('service')}>이용가능서비스</Button>
      <Button onClick={() => setMenu('criticalService')}>필수서비스</Button>
      <Button id="back" onClick={() => navigate('../petsitterShowInfo')}>돌아가기</Button>
    </SideBar>
  );
}

export default PetsitterInfoModifySidebar;
