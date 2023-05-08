import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://withpet.site/api/v1/users/my-info';

function EditProfile() {
  const [imageSrc, setImageSrc] = useState('');
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };
  const [modifyInfo, setModifyInfo] = useState({});
  useEffect(() => {
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        console.log(response.data.result.address.zipcode);
        const info = response.data.result;
        setModifyInfo({
          detailAdr: info.address.detailAdr,
          streetAdr: info.address.streetAdr,
          zipcode: info.address.zipcode,
          phoneNum: info.phoneNum,
          profileImg: info.profileImg,
          userEmail: info.userEmail,
          userId: info.userId,
          userName: info.userName,
        });
      })
      .catch((error) => {
        console.log(error);
        console.log('Editprofile error');
      });
  }, []);

  // 회원정보를 수정하기 위해 입력받을 새로운 상태값
  // const [newPassword, setNewPassword] = useState('');
  // const [newName, setNewName] = useState('');
  // const [newPhone, setNewPhone] = useState('');
  // const [newAddressPost, setNewAddressPost] = useState('');
  // const [newAddressRoad, setNewAddressRoad] = useState('');
  // const [newAddressDtail, setNewAddressDtail] = useState('');
  // const [newEmail, setNewEmail] = useState('');

  const onChange = (e) => {
    const { value, name } = e.target;
    setModifyInfo({
      ...modifyInfo,
      [name]: value,
    });
  };
  // 현재 회원정보를 불러와 폼에 미리 채워놓는 기능

  // 입력한 회원정보를 서버로 보내어 수정하는 기능
  const handleSubmit = (event) => {
    event.preventDefault();
    // 서버로 수정된 회원정보를 보내는 코드

    const info = {
      address: {
        detailAdr: modifyInfo.detailAdr,
        streetAdr: modifyInfo.streetAdr,
        zipcode: modifyInfo.zipcode,
      },
      phoneNum: modifyInfo.phoneNum,
      profileImg: modifyInfo.profileImg,
      userEmail: modifyInfo.userEmail,
      userName: modifyInfo.userName,
      userPassword: 'ajounice1234!',
    };
    console.log(info);

    axios
      .put(url, info, { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const print = (
    <form onSubmit={handleSubmit}>
      <h1>회원정보 수정</h1>
      <div className="preview">
        {imageSrc && <img src={imageSrc} alt="preview-img" />}
      </div>
      <input
        type="file"
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
        }}
      />
      <br />
      <label>
        이름:
        <input
          type="text"
          value={modifyInfo.userName || ''}
          onChange={onChange}
          name="userName"
        />
      </label>
      <br />
      <label>
        전화번호:
        <input
          type="tel"
          value={modifyInfo.phoneNum || ''}
          onChange={onChange}
          name="phoneNum"
        />
      </label>
      <br />
      <label>
        우편번호:
        <input
          type="text"
          value={modifyInfo.zipcode || ''}
          onChange={onChange}
          name="zipcode"
        />
      </label>
      <br />
      <label>
        도로명주소:
        <input
          type="text"
          value={modifyInfo.streetAdr || ''}
          onChange={onChange}
          name="streetAdr"
        />
      </label>
      <br />
      <label>
        상세주소:
        <input
          type="text"
          value={modifyInfo.detailAdr || ''}
          onChange={onChange}
          name="detailAdr"
        />
      </label>
      <br />
      <label>
        이메일:
        <input
          type="email"
          value={modifyInfo.userEmail || ''}
          onChange={onChange}
          name="email"
        />
      </label>
      <br />
      <button type="submit">Update Profile</button>
    </form>
  );

  return (
    <>
      { print }
    </>
  );
}
export default EditProfile;
