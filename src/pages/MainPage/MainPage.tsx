import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import OptionList from "./Components/OptionList";
import RenderGroup from "./Components/Region";
import MediaCardGrid from "./Components/MediaCardGrid";
import CheckDate from "./Components/CheckDate";
import PetSize from "./Components/PetSize";
import {
  Background,
  Content,
  SelectContainer,
} from "../../styles/main/MainPageStyle";
import baseUrl from "../../services/api";
import { useGetPetsitters } from "../../hooks/useMainPageMutation";
import { IOptions } from "../PetList/types/main";
import { useGetAdminServices } from "../../hooks/useAdminMutation";
import { IAdminServiceRes } from "../../types/admin.types";
import * as S from "./MainPage.styles";
import MediaCard from "./Components/MediaCardGrid";
import { IPetsitterList } from "../PetList/types/petsitter";
// const baseUrl = 'https://withpet.site/api/v1/';
// const baseUrl = 'http://ec2-13-125-250-89.ap-northeast-2.compute.amazonaws.com:8080/'
const Button = styled.button`
  border: none;
  border-radius: 50%;
  padding: 8px;
  margin: 0;
  background: white;
  color: gray;
  font-size: 1rem;

  &:hover {
    color: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }
`;

const NumButton = styled.div`
  border: 1px solid gray;
  border-radius: 50%;
  padding: 8px;
  margin: 0;
  background: white;
  color: gray;
  font-size: 1rem;

  &:hover {
    background-color: #caa969;
    cursor: pointer;
    transform: translateY(-2px);
  }
`;

function MainPage() {
  // const baseUrl = ''https://withpet.site';

  const [petsitterList, setPetsitterList] = useState<IPetsitterList>(); // []
  const [serviceList, setServiceList] = useState<IAdminServiceRes[]>([]);
  const [options, setOptions] = useState<IOptions>({
    size: [],
    services: [],
    region: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useGetPetsitters(options, currentPage);
  useEffect(() => {
    if (data) {
      setPetsitterList(data);
    }
  }, [data]);
  // 서비스 목록 불러오기
  const { data: serviceData } = useGetAdminServices();
  useEffect(() => {
    if (serviceData) {
      setServiceList(serviceData);
    }
  }, [serviceData]);

  const handleClick = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handlePrevious = () => {
    if (currentPage === 0) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (
      petsitterList?.totalPages &&
      currentPage === petsitterList.totalPages - 1
    )
      return;
    setCurrentPage((prev) => prev + 1);
  };

  const renderButtons = () => {
    const buttons: JSX.Element[] = [];
    if (petsitterList?.totalPages) {
      for (let i = 1; i <= petsitterList.totalPages; i++) {
        buttons.push(
          <NumButton key={i} onClick={() => handleClick(i)}>
            <button style={{ border: "none", backgroundColor: "transparent" }}>
              {i}
            </button>
          </NumButton>
        );
      }
    }

    return buttons;
  };

  const onClick = () => {
    axios
      .get(
        `${baseUrl}/v1/show-petsitter?address=${options.region}&dogSize=${options.size}&service=${options.services !== undefined ? options.services : ""}&page=${currentPage}`,
        { withCredentials: true }
      )
      .then((res) => {
        setPetsitterList(res.data.result);
      });
  };

  return (
    <Background>
      <Content>
        <SelectContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "1200px",
            }}
          >
            <PetSize setOptions={setOptions} options={options} />
            <CheckDate setOptions={setOptions} options={options} />
            <OptionList
              services={serviceList}
              setOptions={setOptions}
              options={options}
            />
            <RenderGroup setOptions={setOptions} options={options} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: "20px",
            }}
          >
            <SearchIcon fontSize="large" onClick={onClick} />
          </div>
        </SelectContainer>
        {/* <MediaCardGrid cards={petsitterList.content} /> */}
        <S.ContentWrapper>
          {petsitterList?.content?.map((card) => (
            <MediaCard key={card.petSitterId} data={card} />
          ))}
        </S.ContentWrapper>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button onClick={handlePrevious}> &lt; </Button>
          {renderButtons()}
          <Button onClick={handleNext}> &gt; </Button>
        </div>
      </Content>
    </Background>
  );
}

export default MainPage;
