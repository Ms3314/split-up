import { useState } from 'react';
import './App.css';


const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ onClick , children}) {
  return <button className='button' onClick={onClick}>{children}</button>
}

function App() {
  const [selectFriend , setSelectedFriend] = useState(null)
  const [friends , setFriends ] = useState(initialFriends)
  const [ShowAddFriend , setShowAddFriend] = useState(false)

  function handleShowAddFriend () {
    setShowAddFriend(show => !show)
  }

  function handleSelection (friend) {
    if (selectFriend) {
      if (selectFriend.id === friend.id )
        {
          setSelectedFriend(null)
        }
      else {
        setSelectedFriend(friend)
      }
    } else setSelectedFriend(friend)
    setShowAddFriend(false)
  }

  function handleSplit(val) {
    setFriends(friends=> friends.map(friend => friend.id === selectFriend.id ? {...friend , balance : friend.balance +  val} : friend) )
    setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className='sidebar'>
        <FriendList friend={friends} onSelection = {handleSelection} onSelectFriend={selectFriend} />

        { ShowAddFriend && <FormAddFriend friend={friends} AddFriend = {setFriends} setShowAddFriend={setShowAddFriend} />
        }
        <Button onClick={handleShowAddFriend}>{!ShowAddFriend ? 'Add Friend' : 'Hide Form' }</Button>
      </div>
      { selectFriend &&
        <FormSplitBill handleSplit={handleSplit} selectFriend={selectFriend}  />
      }
    </div>
  );
}

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

function FriendList({friend , onSelection , onSelectFriend}) {

  return (
    <ul>
      {friend.map(friend => (
        <Friend onSelection = {onSelection} friend={friend} key={friend.id} onSelectFriend={onSelectFriend}/>
      ))}
    </ul>
  )
  
}

// function Friend ({friend , onSelection , onSelectFriend}) {
 
//   console.log(friend.id === onSelectFriend.id);
//   //const isSelected = onSelectFriend.id === friend.id ; 

//   return(
//     <>
//   <li >
//     <img src={friend.image} alt={friend.name} />
//     <h3>{friend.name}</h3>
//     {friend.balance < 0 ? <p className='red' >You owe {friend.name} {Math.abs(friend.balance)}</p> : friend.balance > 0 ? <p className='green'>{friend.name} owes you {friend.balance}$ </p> : <p>You and {friend.name} are even</p> }
// {/* yaha pe ye hora ki tumarku friend toh map karke mil jara jab uspe tum click karre tumara dosre state mein bhi yehi friend chale jana  */}
//     <Button onClick={()=> onSelection(friend)} >Select</Button>
//   </li>
//   </> 
//   )
// }

function Friend({ friend, onSelection, onSelectFriend }) {
  // so hum logo ko ye selected friend milra when we click on the button here 
  // toh jab click nai karte humlogo toh humko jab tak id bhi nai milti aur null milta aur error milta so in the initially hum log check karre ki kya humme onSelectFriend mila ya nai its , bass chalra aisa 
  const isSelected = onSelectFriend && onSelectFriend.id === friend.id;
  // YAHA jab we talk about the friend we talk about the particular component in it 

  return (
    <>
      <li className={isSelected ? 'selected' : ''}>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance < 0 ? (
          <p className='red'>You owe {friend.name} {Math.abs(friend.balance)}$ </p>
        ) : friend.balance > 0 ? (
          <p className='green'>{friend.name} owes you {friend.balance}$</p>
        ) : (
          <p>You and {friend.name} are even</p>
        )}
        {/* Make sure to check if onSelectFriend exists before accessing its properties */}
         <Button onClick={() => onSelection(friend)}>{ isSelected ?  'Close' : 'Select'}</Button>
      </li>
    </>
  );
}




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
  





export default App;
