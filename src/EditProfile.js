import React, { useState, useEffect } from "react";

function EditProfile({ password, name, phone, address, email }) {
    // 회원정보를 수정하기 위해 입력받을 새로운 상태값
    const [newPassword, setNewPassword] = useState(password);
    const [newName, setNewName] = useState(name);
    const [newPhone, setNewPhone] = useState(phone);
    const [newAddress, setNewAddress] = useState(address);
    const [newEmail, setNewEmail] = useState(email);

    // 현재 회원정보를 불러와 폼에 미리 채워놓는 기능
    useEffect(() => {
        setNewPassword(password);
        setNewName(name);
        setNewPhone(phone);
        setNewAddress(address);
        setNewEmail(email);
    }, [password, name, phone, address, email]);

    // 입력한 회원정보를 서버로 보내어 수정하는 기능
    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedProfile = {
            password: newPassword,
            name: newName,
            phone: newPhone,
            address: newAddress,
            email: newEmail,
        };
        // 서버로 수정된 회원정보를 보내는 코드
    };

    return (

        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>

            <label>
                Password:
                <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
            </label>
            <br />
            <label>
                Name:
                <input
                    type="text"
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                />
            </label>
            <br />
            <label>
                Phone:
                <input
                    type="tel"
                    value={newPhone}
                    onChange={(event) => setNewPhone(event.target.value)}
                />
            </label>
            <br />
            <label>
                Address:
                <input
                    type="text"
                    value={newAddress}
                    onChange={(event) => setNewAddress(event.target.value)}
                />
            </label>
            <br />
            <label>
                Email:
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