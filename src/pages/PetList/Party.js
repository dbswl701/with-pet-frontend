import React from 'react';

function UserItem({ user }) {
  return (
    <div>
      <img src={user.profileImg} alt="유저 이미지" style={{ border: '1px solid black' }} />
      <p>{user.userName}</p>
    </div>
  );
}

function Party({ group }) {
  console.log(group);
  return (
    <>
      <div>
        <p>그룹이름: {group.partyName}</p>
        <div>
          <img src={group.leaderImg} alt="유저 이미지" style={{ border: '1px solid red' }} />
          <p>{group.leaderName}</p>
        </div>
        { group.userPartyList && group.userPartyList.map((user) => <UserItem key={user.userId} user={user} />)}
        <p>그룹 코드 : {group.partyIsbn}</p>
      </div>
    </>
  );
}

export default Party;
