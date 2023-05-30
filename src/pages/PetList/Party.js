import React from 'react';
import crown from '../../assets/crown.png';

function UserItem({ user }) {
  console.log(user);
  return (
    <div style={{
      display: 'flex', marginLeft: '30px', alignItems: 'center', border: '1px solid rgb(200, 200, 200)', height: '40px', borderRadius: '5px', padding: '0px 10px',
    }}
    >
      <img
        src={user.profileImg}
        alt="유저 이미지"
        style={{
          border: '1px solid black', width: '28px', height: '28px', borderRadius: '50%', marginRight: '10px',
        }}
      />
      <p>{user.userName}</p>
    </div>
  );
}

function Party({ group }) {
  console.log(group);
  return (
    <>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 20px', marginTop: '30px', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px', height: '60px',
      }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1>{group.partyName}</h1>
            <div style={{
              display: 'flex', marginLeft: '30px', alignItems: 'center', border: '1px solid rgb(200, 200, 200)', height: '40px', borderRadius: '5px', padding: '0px 10px',
            }}
            >
              <img
                src={group.leaderImg}
                alt="유저 이미지"
                style={{
                  border: '1px solid black', width: '28px', height: '28px', borderRadius: '50%', marginRight: '10px',
                }}
              />
              <p>{group.leaderName}</p>
              <img src={crown} alt="왕관" style={{ width: '20px', height: '20px' }} />

            </div>
          </div>
          { group.userPartyList && group.userPartyList.map((user) => <UserItem key={user.userId} user={user} />)}
        </div>
        <p>그룹 코드 : {group.partyIsbn}</p>
      </div>
    </>
  );
}

export default Party;
