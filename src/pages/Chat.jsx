import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts  from "../components/Contacts"
import Welcome from "../components/Welcome";
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client"

const Chat = () => {

  const socket = useRef()

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [ currentUser , setCurrentUser ] = useState(undefined)
  const [currentChat, setCurrentChat ] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        const savedUser = JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUser(savedUser);
        setIsLoaded(true)
      }
    };
  
    fetchUserData();
  }, []);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])
  
  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(response.data);
        } else {
          navigate('/setAvatar');
        }
      }
    };
  
    fetchContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }
  
  return (
    <Container>
      <div className="container">
        <Contacts 
          contacts={contacts} 
          currentUser={currentUser} 
          changeChat={handleChatChange} 
        />
        {
          isLoaded && currentChat === undefined ? (
          <Welcome 
            currentUser={currentUser} 
          /> 
          ) : (
            <ChatContainer 
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )
        }
      </div>
    </Container>
  )
}


const Container = styled.div `
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: cursive;
  gap: 1rem;
  align-items: center;
  background-color: #0D0D3E;

  .container {
    height: 85vh;
    width: 85vw;
    background-color:#00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat