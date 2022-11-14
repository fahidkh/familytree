import React, { useEffect, useState } from 'react'
import db from './firebase';
import Header from './Header'

function Familymembers() {

  const [User, setUsers] = useState([]);

  useEffect(() => {
    db.collection('Families').doc(localStorage.getItem("family")).collection("Users").onSnapshot((snapshot) => 
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    );
  }, []);
  return (
    <>
    <Header />
    <div>Family members</div>
    {User.map((user) => (
      <h4 id={user.id}>{user.data.Name}</h4>
    ))}
    </>
  )
}

export default Familymembers