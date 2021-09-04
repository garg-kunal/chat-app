
import { connect } from 'react-redux';import socketIOClient from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'
import './App.css';
import React from 'react';

function App () {
  
  const [wel, setwel] = useState('')
  const [msg, setmsg] = useState('')
  const [arr,setarr]=useState([])
  const [id,setid]=useState('')
  const messageEnd=useRef(null)
  
  useEffect(() => {
    const socket = socketIOClient('http://localhost:4000', {
      transports: ['websocket']
    })
    socket.on('connect', () => {
       console.log(socket.id)
       setid(socket.id)
    })
    socket.on('new', data => {
      setwel(data.message)
    })
    socket.on('newUser', data => {
      console.log(data)
    })
    socket.on('disconnect', () => {
      console.log('you are disconnected')
    })
    socket.on('message', data => {
    setarr(arr=>[...arr,data])
     
    })
   
  }, [])
  useEffect(()=>{
 scroll();
  },[arr])

  const scroll=()=>{
    messageEnd.current.scrollIntoView({behaviour:'smooth'})
  }
 
  
  const send = e => {
    e.preventDefault()
    const socket = socketIOClient('http://localhost:4000', {
      transports: ['websocket']
    })
    socket.emit(
      'newMessage',
      {
        message: msg,
        id:id
        
      },
      data => {
        // alert(data)
      }
    )
    setmsg('')
  }

  return (
    <div className='App'>
     
      <header className='App-header container-fluid'>
    <h2 className="text-center">Chat App</h2>
        <p className='text-center'>{wel}</p>
        <div className="" >
          {arr.map((item,key)=><p className={item.id===id?"right-bubble":"left-bubble"}>{item.message}</p>)}
        <div ref={messageEnd}/>
        </div>
      
        <div className='container fixed-bottom pb-4'>
          <div className='d-flex flex-row'>
            <input
            id="form"
              className='form-control'
              type='text'
              placeholder='Enter your message'
              value={msg}
              onChange={e => {
                setmsg(e.target.value)
              }}
            />
            <button className='btn btn-primary' onClick={e => send(e)}>
              Send
            </button>
          </div>
        </div>
        <br/><br/>
      </header>
    </div>
  )
}

export default App
