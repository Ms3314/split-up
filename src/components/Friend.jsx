import React from 'react'
import Button from './Button';

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

export default Friend
