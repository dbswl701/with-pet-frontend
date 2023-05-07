import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const url = 'http://ec2-3-39-193-176.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/my-info';

function EditProfile() {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        axios.get(url)
          .then((response) => {
            setUserInfo(response.data);
          })
          .catch((error) => {
            console.log(error);
            console.log("Editprofile error");
          });
      }, []);
    // 회원정보를 수정하기 위해 입력받을 새로운 상태값
    const [newPassword, setNewPassword] = useState(userInfo.password);
    const [newName, setNewName] = useState(userInfo.name);
    const [newPhone, setNewPhone] = useState(userInfo.phone);
    const [newAddressPost, setNewAddressPost] = useState(userInfo.zipcode);
    const [newAddressRoad, setNewAddressRoad] = useState(userInfo.streetAdr);
    const [newAddressDtail, setNewAddressDtail] = useState(userInfo.detailAdr);
    const [newEmail, setNewEmail] = useState(userInfo.email);

    // 현재 회원정보를 불러와 폼에 미리 채워놓는 기능
    useEffect(() => {
        setNewPassword(newPassword);
        setNewName(newName);
        setNewPhone(newPhone);
        setNewAddressPost(newAddressPost);
        setNewAddressRoad(newAddressRoad);
        setNewAddressDtail(newAddressDtail);
        setNewEmail(newEmail);
    }, []);

    // 입력한 회원정보를 서버로 보내어 수정하는 기능
    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedProfile = {
            password: newPassword,
            name: newName,
            phone: newPhone,
            zipcode: newAddressPost,
            streetAdr: newAddressRoad,
            detailAdr: newAddressDtail,
            email: newEmail,
        };
        // 서버로 수정된 회원정보를 보내는 코드
        axios.put(url, updatedProfile)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (

        <form onSubmit={handleSubmit}>
            <h1>Edit Profile</h1>

            <label>
                비밀번호:
                <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
            </label>
            <br />
            <label>
                이름:
                <input
                    type="text"
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                />
            </label>
            <br />
            <label>
                전화번호:
                <input
                    type="tel"
                    value={newPhone}
                    onChange={(event) => setNewPhone(event.target.value)}
                />
            </label>
            <br />
            <label>
                우편번호:
                <input
                    type="text"
                    value={newAddressPost}
                    onChange={(event) => setNewAddressPost(event.target.value)}
                />
            </label>
            <br />
            <label>
                도로명주소:
                <input
                    type="text"
                    value={newAddressRoad}
                    onChange={(event) => setNewAddressRoad(event.target.value)}
                />
            </label>
            <br />
            <label>
                상세주소:
                <input
                    type="text"
                    value={newAddressDtail}
                    onChange={(event) => setNewAddressDtail(event.target.value)}
                />
            </label>
            <br />
            <label>
                이메일:
                <input
                    type="email"
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)}
                />
            </label>
            <br />
            <button type="submit">Update Profile</button>
        </form>
    );
}
export default EditProfile;