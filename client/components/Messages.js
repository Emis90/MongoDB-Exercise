import React, {useEffect, useState} from 'react'
import axios from 'axios'


const Messages = ({allMessages}) => {

  return(
   <div>
     <h1>All previous messages</h1>
      {allMessages.map(el => {
        return (
        <div key={el._id}>
        <h1>{el.name}</h1>
        <h3>Message: {el.content}</h3>
        </div>
        )
      })}
   </div>
  )
}


export default Messages