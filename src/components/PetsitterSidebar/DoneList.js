import React from 'react';
import styled from 'styled-components';
import DoneListItem from './DoneListItem';

const Title = styled.p`
  display: flex;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  // width: 100%;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
`;

function DoneList({ doneReservations, setPrintBody }) {
  // const [currentList, setCurrentList] = useState([]);

  // useEffect(() => {
  //   axios.get('https://d45162fd-d516-4456-83d9-d3b784b62ec2.mock.pstmn.io/api/v1/reservation/1')
  //     .then((res) => {
  //       setCurrentList(res.data);
  //       console.log(res.data);
  //     })
  //     .catch(() => {
  //     });
  // }, []);

  return (
    <Container>
      <Title>이용 완료 목록</Title>

      <Item>
        {doneReservations.map((currentItem) => {
          return <DoneListItem key={currentItem.reservationId} item={currentItem} setPrintBody={setPrintBody} />;
        })}
      </Item>

    </Container>
  );
}

export default DoneList;
