import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../../styles/sidebar/SidebarStyle';

function PetsitterInfoModifySidebar({ setMenu, menu }) {
  const navigate = useNavigate();
  return (
    <S.SideBar>
      <S.Button check={menu === 'house'} onClick={() => setMenu('house')}>집사진</S.Button>
      <S.Button check={menu === 'hashtag'} onClick={() => setMenu('hashtag')}>해시태그</S.Button>
      <S.Button check={menu === 'intro'} onClick={() => setMenu('intro')}>소개글</S.Button>
      <S.Button check={menu === 'license'} onClick={() => setMenu('license')}>자격증</S.Button>
      <S.Button check={menu === 'service'} onClick={() => setMenu('service')}>이용가능서비스</S.Button>
      <S.Button check={menu === 'criticalService'} onClick={() => setMenu('criticalService')}>필수서비스</S.Button>
      <S.Button id="back" onClick={() => navigate('../petsitterShowInfo')}>돌아가기</S.Button>
    </S.SideBar>
  );
}

export default PetsitterInfoModifySidebar;
