import React from 'react'
import Friend from './Friend'

function FriendList({friend , onSelection , onSelectFriend}) {

    return (
      <ul>
        {friend.map(friend => (
          <Friend onSelection = {onSelection} friend={friend} key={friend.id} onSelectFriend={onSelectFriend}/>
        ))}
      </ul>
    )
    
  }

export default FriendList
