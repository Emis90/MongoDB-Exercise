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
console.log(total)

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
          name: message.from,
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
     setMessage(null)
  }

  return(
      <div id="container">
        <h2>Send an email yo your friends!</h2>
      <form className='form' onChange={(e)=> change(e)} onSubmit={(e) => submit(e)}>
      <input className='mail' type="email" name="from" placeholder='from'required/>
      <input className='mail' type="email" name="to" placeholder='to' required/>
      <input className='mail' type="text" name="subject" placeholder='subject' required/>
      <textarea className='fields' rows="5" type="text" name="body" placeholder='message'/>
      <input className='mail' type="password" name="pass" placeholder='email password' required/>
      <input className='button' type="submit" value="Submit" id='submit'/> 
      </form>
      <div>
        {allMessages ? <Messages allMessages={allMessages}/> : null}
      </div>
      </div>
      )
}


export default  Main