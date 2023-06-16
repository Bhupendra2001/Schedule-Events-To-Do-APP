import React from 'react';
import styled from 'styled-components';
import {FiDelete} from 'react-icons/fi';
import {MdEvent} from 'react-icons/md';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  
 
`;



const ModalContent = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 4px;

`;

const ModalTitle = styled.h2`
  margin-top: 0;
  color : blue;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  outline : none;

`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalButton = styled.button`
  margin-left: 10px;
  background-color : teal;
  padding : 10px;
  color : #fff;
  border : 1px solid yellow;
  border-radius : 5px;
  width : 80px;
`;

const Delete = styled.div`
display : flex;
padding : 10px;
justify-content : end;
font-size : 30px;
`

const EventModal = ({ title, onTitleChange, onSave, onClose }) => {
  return (
    <ModalOverlay>
  
      <ModalContent>
        <Delete><FiDelete onClick={onClose}/></Delete>
        <ModalTitle>Add Event</ModalTitle>
        <ModalInput
          type="text"
          placeholder="Enter event title"
          value={title}
          onChange={onTitleChange}
        />
        <ModalButtonContainer>
          
         <MdEvent onClick={onSave}  style={{color : "green" , fontSize : "30px"}}/>
        </ModalButtonContainer>
      </ModalContent>
   

    </ModalOverlay>
  );
};

export default EventModal;
