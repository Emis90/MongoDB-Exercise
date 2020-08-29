import React, {useState} from 'react'
import Messages from './Messages'
import axios from 'axios'

const Main = () => {
 const [message, setMessage] = useState({})
 const [pass, setPass] = useState(null)
 const [total, setTotal] = useState(0)
  const change = (event) => {
      if ([event.target.name] === 'pass') {
        setPass({...pass, [e.target.name]: event.target.value})
      } else {
        setMessage({...message, 
            [event.target.name]: event.target.value
           })
      }
   }

  const submit = async(e) => {
    e.preventDefault()
    try {
      await axios.post('/', message)
      setTotal(total + 1)
    } catch (error) {
      alert('wrong credentials', error)
    }
     setMessage(null)
     setPass(null)
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
          <Messages total={total}/>
      </div>
      </div>
      )
}


export default  Main