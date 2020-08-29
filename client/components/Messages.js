import React, {useEffect, useState} from 'react'
import axios from 'axios'


const Messages = ({total}) => {
  const [allMessages, setAll] = useState(null)
  
  const fetchData = async() => {
    const {data} = await axios.get('/messages')
    setAll(data)
   }

  useEffect(()=> {
      fetchData()
  }, [total])


  return(
   <div>
     <h1>All previous messages</h1>
      {allMessages && allMessages ? allMessages.map(el => {
        return (
        <div key={el._id}>
        <h1>{el.name}</h1>
        <h3>Message: {el.content}</h3>
        </div>
        )
      })
    : <h1>...loading</h1>}
   </div>
  )
}


export default Messages