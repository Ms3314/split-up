import React from 'react'
import { useState} from 'react';
import Button from './Button';

function FormAddFriend({friend , AddFriend ,setShowAddFriend }) {

    const [name , setName] = useState("")
    const [image , setImage] = useState("https://i.pravatar.cc/48")
    
      function handleAddFriend(e) {
        e.preventDefault(); // Prevents the default form submission behavior
        // const formData = new FormData(e.target); // Get form data
        // console.log(formData);
        // const friendName = formData.get('friendName');
        // const imageURL = formData.get('imageURL');
        // console.log('Friend Name:', friendName);
        // console.log('Image URL:', imageURL);
  
        if (!name || !image) return;
  
        const id = crypto.randomUUID() 
        const newFriend = {
          name , 
          // image : `${image}?=${id}` , 
          image,
          balance : 0,
          id ,
        }
        AddFriend(friend => [...friend , newFriend])
        console.log(newFriend);
        setShowAddFriend(false)
        setName("");
        setImage("https://i.pravatar.cc/48")
      }
    
      return (
        <form className='form-add-friend' onSubmit={handleAddFriend}>
          <label>🧑‍🤝‍🧑Friend name</label>
          <input type='text' value={name} onChange={e => setName(e.target.value)} name='friendName' />
    
          <label>👾 Image URL</label>
          <input type='text' value={image} onChange={e => setImage(e.target.value)} name='imageURL' />
          <Button type='submit'>Add</Button>
        </form>
      );
    }

export default FormAddFriend
