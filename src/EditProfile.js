import React, { useState, useEffect } from "react";
import axios from "axios";

const url =
  "https://d45162fd-d516-4456-83d9-d3b784b62ec2.mock.pstmn.io/api/v1/users/my-info"; // 현재 목업 데이터를 사용하고 있습니다.

function EditProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [imageSrc, setImageSrc] = useState("");

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

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Editprofile error");
      });
  }, []);

  // 회원정보를 수정하기 위해 입력받을 새로운 상태값
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddressPost, setNewAddressPost] = useState("");
  const [newAddressRoad, setNewAddressRoad] = useState("");
  const [newAddressDtail, setNewAddressDtail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // 현재 회원정보를 불러와 폼에 미리 채워놓는 기능

  // 입력한 회원정보를 서버로 보내어 수정하는 기능
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProfile = {
      password: newPassword,
      userName: newName,
      phoneNum: newPhone,
      zipcode: newAddressPost,
      streetAdr: newAddressRoad,
      detailAdr: newAddressDtail,
      userEmail: newEmail
    };
    // 서버로 수정된 회원정보를 보내는 코드
    axios
      .put(url, updatedProfile)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
        비밀번호:
        <input
          type="password" placeholder="비밀번호를 입력해주세요."
          // value (newPassword가 비어있을 때, userInfo 객체가 존재하고 그 안에 password 속성이 있으면 해당 값을 사용하도록 설정)
          value={newPassword || (userInfo && userInfo.password) || ""}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        이름:
        <input
          type="text" placeholder="ex) 홍길동"
          value={newName || (userInfo && userInfo.userName) || ""}
          onChange={(event) => setNewName(event.target.value)}
        />
      </label>
      <br />
      <label>
        전화번호:
        <input
          type="tel" placeholder="ex) 010-0000-0000"
          value={newPhone || (userInfo && userInfo.phoneNum) || ""}
          onChange={(event) => setNewPhone(event.target.value)}
        />
      </label>
      <br />
      <label>
        우편번호:
        <input
          type="text"
          value={newAddressPost || (userInfo && userInfo.zipcode) || ""}
          onChange={(event) => setNewAddressPost(event.target.value)}
        />
      </label>
      <br />
      <label>
        도로명주소:
        <input
          type="text"
          value={newAddressRoad || (userInfo && userInfo.streetAdr) || ""}
          onChange={(event) => setNewAddressRoad(event.target.value)}
        />
      </label>
      <br />
      <label>
        상세주소:
        <input
          type="text" placeholder="ex) 건물명 / 동 / 호"
          value={newAddressDtail || (userInfo && userInfo.detailAdr) || ""}
          onChange={(event) => setNewAddressDtail(event.target.value)}
        />
      </label>
      <br />
      <label>
        이메일:
        <input
          type="email" placeholder="ex) someone@mail.com"
          value={newEmail || (userInfo && userInfo.userEmail) || ""}
          onChange={(event) => setNewEmail(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Update Profile</button>
    </form>
  );
}
export default EditProfile;
