import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../PetsitterInfoManage.styles";

function InitPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "500px",
        height: "200px",
        border: "1px solid gray",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "150px",
        borderRadius: "5px",
      }}
    >
      <div style={{ alignItems: "center", textAlign: "center" }}>
        <p>등록된 정보가 없습니다.</p>
        <p>등록하기를 눌러 정보를 등록해주세요.</p>
      </div>
      <div>
        <Button
          style={{ margin: "auto" }}
          className="init"
          onClick={() => navigate("../petsitterInfoManage")}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}

export default InitPage;
