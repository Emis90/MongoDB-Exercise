import React from 'react'
import { print } from 'graphql'
import gql from 'graphql-tag'
import axios from 'axios'

const DELETE_MESSAGE = gql`
  mutation deleteMessage($id: ID!){
    deleteMessage(id: $id) {
      id
      name
      content
    }
  }
`
const Messages = ({allMessages, total, setTotal}) => {
  const deleteMessage = async(e, id) => {
    e.preventDefault()
   const {data} = await axios.post('/graphql', {
      query: print(DELETE_MESSAGE),
      variables: {
        id
      }
    })
   console.log(data)
   setTotal(total - 1)
  }
  return(
   <div id="messages">
     <div class='title'>
     <h3>Your past emails</h3>
     </div>
     <div class='scroll'>
      {allMessages.map(el => {
        return (
        <div class='message-div' key={el.id}>
        <div class='del'>
          <button class='delInput' onClick={(e)=> deleteMessage(e, el.id)}>X</button>
          </div>
        <h4>To : {el.name}</h4> 
        <br/>
        <p>{el.content}</p>
        </div>
        )
      }).reverse()}
      </div>
   </div>
  )
}


export default Messages