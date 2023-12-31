import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import sendIcon from '../icons8-send-message-100.png'


export function DashBoard() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messageContainerRef = useRef();

  useEffect(() => {
    
    const socket = io('http://localhost:3001');

    socket.on('load messages', (messageHistory) => {
      messageHistory.forEach(message => {
        newMessages(message.text);
      });

    });

    socket.on('receive message', (newMessage) => {
      console.log('Received message:', newMessage);
      window.scrollTo(0, document.body.scrollHeight);
      setMessages([...messages, newMessage]);
      newMessages(newMessage);
      
    });

    return () => {
      socket.disconnect();
    };

  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages]);

  const newMessages = (message) => {
    const messagesList = document.getElementById('all-messages');
    const messageItem = document.createElement('p');
    messageItem.setAttribute('id', "messages");
    messageItem.textContent = message;
    messagesList.appendChild(messageItem);
  }
  

  const handleSendMessage = () => {
    console.log("i got here, trying to emit messages")
    if (text) {
      io('http://localhost:3001').emit('send message', {text});
      setText('');

    }
    
  };

  return (
    <div className='App'>
      <div className='header'>
        <p>ACE CLAN</p>
      </div>
      <div className='App-header'>
        <div className='all-messages'  id={"all-messages"} ref={messageContainerRef}>

        </div>
      </div>

      <div className='inputPlace'>
        <textarea
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='inputtingText'
        />
        <button onClick={handleSendMessage} id={"send-button"}><img src={sendIcon} alt='send'/></button>
      </div>
    </div>
  );
}
