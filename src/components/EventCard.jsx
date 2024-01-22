import React, { useContext } from "react";
import styled from "styled-components";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { FcMusic } from "react-icons/fc";
import { FcStart } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import ContextProvider from "../context/ContextProvider";



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
  text-align: justify;
  a {
    color: #007bff; /* Link color */
    text-decoration: none; /* Remove underline */
    font-weight: bold; /* Optional: Make the link bold */
    margin-left: 5px; /* Optional: Add some spacing between the text and the link */
  }

  a:hover {
    text-decoration: underline; /* Add underline on hover */
  }
`;

const RegisterButton = styled(Button)`
  margin-left: auto;
`;

const EventCard = ({ event_id, avatarSrc, title, description,isRegister,categoryId }) => {
  const navigate = useNavigate();
  const {setIsRegister} = useContext(ContextProvider);

  const onRegisterClick = ()=>{
    setIsRegister(isRegister);
    console.log(isRegister)
    navigate(`/event/register/${event_id}`);
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
          {description.substring(0,250).concat('')}<Link to={`/event/register/${event_id}`}>...View Event</Link>
        </Description>
      </Row>
      <Row noBorder>
      <h3>Interest : {categoryId}</h3>
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
