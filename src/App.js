import { useState } from 'react';
import './App.css';
import Button from './components/Button';
import FormSplitBill from './components/FormSpiltBill';
import FriendList from './components/FriendList';
import FormAddFriend from './components/FordAddFriend';


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

export default App;
