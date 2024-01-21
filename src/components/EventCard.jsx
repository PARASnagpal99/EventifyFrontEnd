import React from "react";
import styled from "styled-components";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { FcMusic } from "react-icons/fc";
import { FcStart } from "react-icons/fc";
import { useNavigate } from "react-router-dom";



const CardContainer = styled.div`
  width: 800px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: ${(props) => (props.noBorder ? "none" : "1px solid #ddd")};
`;

const AvatarContainer = styled.div`
  margin-right: 10px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
`;

const RegisterButton = styled(Button)`
  margin-left: auto;
`;

const EventCard = ({ event_id, avatarSrc, title, description,isRegister }) => {
  const navigate = useNavigate();
  const onRegisterClick = ()=>{
    navigate(`/event/register/isregister=/${isRegister}/${event_id}`);
  } 

  return (
    <CardContainer>
      <Row>
        <AvatarContainer>
        <FcStart style={{fontSize:"2rem",border:"1px solid",borderRadius:"5px"}} />
        </AvatarContainer>
        <Title>{title}</Title>
      </Row>
      <Row>
        <Description>
          {description}
        </Description>
      </Row>
      <Row noBorder>
      <h3>Registered By 20+ people</h3>
        <RegisterButton
          label={isRegister?"Already Registered":"Register"}
          icon="pi pi-check"
          onClick={onRegisterClick}
          // disabled={isRegister?true:false}
        />
      </Row>
    </CardContainer>
  );
};

export default EventCard;
