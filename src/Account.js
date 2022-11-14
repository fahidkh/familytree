import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import "./Account.css"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import db from './firebase';


function Account(props) {

  const [users, setUsers] = useState([]);
  const [families, setFamilies] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [newfam, setNewfam] = useState("");
  const [newfamid, setNewfamid] = useState("");
  const [family, setFamily] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
      db.collection("Families").onSnapshot((snapshot) =>
          setFamilies(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
      db.collection("usertoken").where("email", "==", localStorage.getItem("email")).onSnapshot((snapshot) =>
          setUsers(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  users.map((user) => (
    localStorage.setItem("family", user.data.familyuid)
))

users.map((user) => (
  localStorage.setItem("verified", "true")
))

function handleAddEvent() {
  db.collection("Families").doc(newfamid).set({
    Name: newfam,
    uid: newfamid,
});
setOpen(false);
}

const handleClose = () => {
  setOpen(false);
};

const handleClickOpen = () => {
  setOpen(true);
};

const handleNameChange = (event) => {
  setName(event.target.value);
};

const handleAgeChange = (event) => {
  setAge(event.target.value);
};

const handleNewfamChange = (event) => {
  setNewfam(event.target.value);
};

const handleNewfamidChange = (event) => {
  setNewfamid(event.target.value);
};

const CreateAccount = () => {
  db.collection("Families").doc(family).collection("Users").add({
    Email: localStorage.getItem("email"),
    Familyuid: family,
    Name: name,
    Userid: localStorage.getItem("uid"),
    Birthdate: age
  });

  db.collection("usertoken").add({
    email: localStorage.getItem("email"),
    familyuid: family
  });

    
    props.onChange.onChange(true);

  localStorage.setItem("verified", "true")
  localStorage.setItem("family", family)

  setName("");
  setFamily("");
}

users.map((user) => (
  props.onChange.onChange(true)
))


  return (
    <div className='account'>
        <div className="account__fields">

        <TextField
          disabled
          defaultValue={localStorage.getItem("email")}
          label= "Email"
        />

        <TextField
          required
          label="Name"
          value={name}
          onChange={handleNameChange}
          helperText="Please enter your name"
        />

        <TextField
          required
          label="Birthdate"
          type="number"
          value={age}
          onChange={handleAgeChange}
          helperText="Please enter your year of birth example: 2001"
        />
        <div className="famss">
        <Autocomplete
        options={families.map((fam) => (
          fam.id
      ))}
        value={family}
        onChange={(event, newFamily) => {
          setFamily(newFamily);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Family" />}
        />
        <Button startIcon={<AddIcon />} variant="outlined" onClick={handleClickOpen}>
        Add New Family
      </Button>
      </div>
        <Dialog
      fullWidth={true}
      maxWidth="xl"
       open={open} onClose={handleClose}
       scroll="body">
        <DialogTitle>Add a New Family!</DialogTitle>
        <DialogContent>
          <TextField
          required
          label="Add a Family"
          value={newfam}
          onChange={handleNewfamChange}
          helperText="Please enter the name of the family"
        />
        <TextField
          required
          label="Add Family username"
          value={newfamid}
          onChange={handleNewfamidChange}
          helperText="Please enter the unique ID of the family"
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEvent}>
                    Add Family
                </Button>
        </DialogActions>
      </Dialog>
        </div>

        <Button type="submit" onClick={CreateAccount}>
          Create Account
        </Button>
        <Button type="submit" onClick={() => {localStorage.clear(); window.location.reload(false);}}>
          Back
        </Button>
    </div>
  )
}

export default Account