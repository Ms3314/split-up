import React from 'react'
import Button from './Button'
import { useState } from 'react'


function FormSplitBill ({selectFriend , handleSplit }) {
    const [Amount , setAmount] = useState("")
    const [user ,setUser] = useState("")
    let [whoIsPaying , setWhoIsPaying] = useState("user")
    let mine = user ;
    let friAmount  = Amount ?  Number(Amount) - Number(mine) : ''
    console.log(friAmount);
    //function handleMineChng (e) {
      // mine = e.target.value
      // friAmount = Number(Amount) - Number(mine)
    //}
    function handleSubmit (e) {
        e.preventDefault()
        if (!Amount || !user) return ;
        handleSplit(whoIsPaying === 'user' ? friAmount : -user)
  
    }
    return (
    <form className='form-split-bill' onSubmit={handleSubmit} >
      <h2>Split a bill with {selectFriend.name}</h2>
      <label>💰 Bill Value</label>
      <input type='text' value={Amount} onChange={(e)=>setAmount((e.target.value))}/>
  
      <label>👨‍🦰 Your expense</label>
      <input type='text' value={user} onChange={(e)=>setUser((Number(e.target.value) > Amount) ? user : Number(e.target.value)  )}
     />
  
      <label> 🫂 {selectFriend.name}'s expense</label>
      <input type='text' disabled value={friAmount} />
  
      <label>😋 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{selectFriend.name}</option>
      </select>
  
      <Button>Split Bill </Button>
    </form>
    )
  }

export default FormSplitBill
