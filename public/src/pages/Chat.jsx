import React , { userState, useEffect, useRef} from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { allUsersRoute, host } from '../utils/APIRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client';
const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState()
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')) {
    navigate('/login')
    } else { 
      const setuser = () => {
        return new Promise(async(resolve, reject) => {
          let user = await JSON.parse(localStorage.getItem('chat-app-user'))
          setCurrentUser(user, resolve())
        })
      }
      setuser();
    }
  },[])
  useEffect(() => {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id)
    }
  })

  useEffect(() => {
    if(currentUser) {
      if(currentUser.isAvatarImageSet) {
        (async () => {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          console.log("data",data.data, "current user : ",currentUser)
          setContacts(data.data)
        })()
      } else {
        navigate('/setAvatar')
      }
    }

    const onlineStatus = navigator.onLine;
    console.log(onlineStatus)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentUser])
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
    console.log(currentChat)
  }
return <Container>
    <div className="container">
      <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
      {
        currentChat === undefined 
        ? <Welcome/> 
        : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
      }
    </div>
  </Container>
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`

export default Chat