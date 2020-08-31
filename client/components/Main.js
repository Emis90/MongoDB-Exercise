import React, {useState, useEffect} from 'react'
import Messages from './Messages'
import axios from 'axios'
import { print } from 'graphql'
import gql from 'graphql-tag'

const GET_MESSAGES = gql`
  query getAllMessages {
    getAllMessages {
      id
      name
      content
    }
  }
`
const SEND_MESSAGE = gql`
   mutation createNewMessage($name: String!, $content: String!, $from: String!, $to: String!,$subject: String!, $pass: String!){
     createNewMessage(name: $name, content: $content, from: $from, to: $to, subject: $subject, pass: $pass) {
       id
       name
       content
     }
   }
`

const Main = () => {
 const [message, setMessage] = useState({})
 const [total, setTotal] = useState(0)
 const [allMessages, setAll] = useState(null)

  const fetchData = async() => {
  const { data } = await axios.post('/graphql', {
    query: print(GET_MESSAGES)
  })
   setAll(data.data.getAllMessages)
 }
  useEffect(()=> {
  fetchData()
  }, [total])

  const change = (event) => {
    setMessage({...message, 
      [event.target.name]: event.target.value
    })
   }

  const submit = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/graphql', {
        query: print(SEND_MESSAGE),
        variables: {
          name: message.to,
          content: message.body,
          subject: message.subject,
          from: message.from,
          to: message.to,
          pass: message.pass
        }
      })
      console.log(data)
      setTotal(total + 1)
    } catch (error) {
      alert('wrong credentials', error)
    }
     
  }

  return(
  <div id="outer-container">
    <div>
    <h1 class="title">MESSAGE BOARD! SEND YOUR EMAIL! 🚀 </h1>
    </div>
    <div id="inner-container">
    <div id="main">
    <div class='title'>
    <h3>Send an email to your friends!</h3>
    </div>
    <div>
    </div>
        <form class='form' onChange={(e)=> change(e)} onSubmit={(e) => submit(e)}>
          <div id="from-to">
          <input class='mail' type="email" name="from" placeholder='from (email)'required/>
          <input class='mail' type="email" name="to" placeholder='to (email)' required/>
          </div>
          <div id='email-subject'>
          <input class='mail' type="text" name="subject" placeholder='subject' required/>
          <textarea class='fields' rows="5" type="text" name="body" placeholder='...message'/>
          </div>
          <div id="submit">
          <input class='pass' type="password" name="pass" placeholder='your email password' required/>
          <input class='button' type="submit" value="Submit" id='submit'/> 
          </div>
        </form>
    </div>
    
        {allMessages ? <Messages allMessages={allMessages} total={total} setTotal={setTotal} /> : null}
    </div>
  </div>
      )
}


export default  Main