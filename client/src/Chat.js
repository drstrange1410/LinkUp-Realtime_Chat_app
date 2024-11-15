import React , {useState, useEffect} from 'react';  
import ScrollToBottom from 'react-scroll-to-bottom';



function Chat({socket, username, room }){
    const [currentMessage, setCurrentMessage]=useState("");
    const [messageList, setMessageList]=useState([]);
//bheja backend ko
    const sendMessage = async () => {
        if (currentMessage !== "") {
          const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };
    
          await socket.emit("send_message", messageData);
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage("");
          
        }
      };
//mila backend se
      useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);


    return(
        <div className="chat-window">
            <div className="chat-header">
                <p>
                    Live Chat
                </p>
            </div>
            <div className="chat-body">
              <ScrollToBottom className="message-container">
              {
                messageList.map((messageContent)=>{
                  return( <div className="message"
                  id={username === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        {messageContent.message}
                      </div>
                      <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                        
                      </div>
                  </div>
                </div>
                  );  
              })}
              </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input 
                name="message"
                type="text" 
                value={currentMessage}
                onChange={ (event)=>{setCurrentMessage(event.target.value)}}
                placeholder="Enter Message"
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage() : null}
                />
                
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat;