import React from 'react';
import styled from 'styled-components';
import profileImg from '../../assets/petsitter_profile.png';
// import axios from 'axios';

const Box = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 70%;
  overflow: hidden;
  margin-top: -50%;
`;
const Profile = styled.img`
  width: 100%;
  heitht: 100%;
  object-fit: cover;
`;

function PetsitterProfile() {
  return (
        <>
        {/* <Container> */}
        <Box>
          <Profile src={profileImg} alt="profile" />
        </Box>
        {/* </Container> */}
        </>
  );
}

export default PetsitterProfile;
