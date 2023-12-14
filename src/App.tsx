import './App.css'

import { FormEvent, useEffect, useState } from 'react'

// firebase 
import { firebaseConfig } from './fb.config'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { addDoc, collection, query, onSnapshot,  } from 'firebase/firestore'
import { signInWithPopup, getAuth, GoogleAuthProvider, signOut } from 'firebase/auth'

// components 
import Messages from './Messages'
import Form from './Form'
import Header from './Header'

export type Message = {
  messageID: string
  message: string
  userID: string,
  timeStamp: number,
  photoUrl: string
}

function App() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth(app)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[] | null>(null)
  const [isLogin, setIsLogin] = useState(false)

  async function handleSubmit(e: FormEvent){
      try {
        e.preventDefault()
        if(message == ''){
          alert('wala kang nilagay bonak')
          return
        }
        await addDoc(collection(db, 'messages'), {userID: auth.currentUser?.uid, message: message, timeStamp: Date.now(), photoUrl: auth.currentUser?.photoURL})
        setMessage('')
      } catch (error) {
        alert(error)
      }
  }

  async function signIn(){
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
      setIsLogin(true)
    } catch (error) {
      alert(error)
    }
  }

  async function logOut(){
    try{
      await signOut(auth)
      setIsLogin(false)
    }catch(error){
      alert(error)
    }
  }
  
  function displayMessages (){
    const q = query(collection(db, 'messages'))
    // get realtime messages 
    onSnapshot(q, (docSnapshot)=>{
      const data : Message[] = []
      docSnapshot.forEach(doc => {
        data.push({...doc.data(), messageID: doc.id} as Message)
      })
      // sort messages 
      data.sort((a, b) => b.timeStamp - a.timeStamp)
      // limit to 25 messages only 
      const sliced = data.slice(0, 25)
      setMessages(sliced)
    })
  }

  useEffect(()=>{
    displayMessages()
  },[isLogin])

  return (

    <div className='flex justify-center h-screen bg-dark '>
      <div className="w-[100vw] lg:w-[778px] border relative ">

        <Header signIn={signIn} isLogin={isLogin} logOut={logOut} />
        
        <Messages messages={messages} auth={auth} />
        
        {isLogin ?

        // render if user login 
        <Form handleSubmit={handleSubmit} message={message} setMessage={setMessage}  /> : 
        
        // render if not login 
        (
          <div className="absolute bottom-0 w-full bg-dark">
              <div className='border border-slate-500 flex justify-center rounded w-full font-semibold text-white items-center h-16 text-3xl '>
                <h3 className='text-1xl'>Login to send message</h3>
              </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default App
