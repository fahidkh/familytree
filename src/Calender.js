import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from './Header'
import "./Calender.css"
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import db from "./firebase";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});




function Calender() {

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openev, setOpenev] = React.useState(false);
  const [selected, setSelected] = useState({title: "Event"});

const handleSelected = (event) => {
  setSelected(event);
  handleEVClickOpen();
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEVClickOpen = () => {
    setOpenev(true);
  };

  const handleEVClose = () => {
    setOpenev(false);
  };

  const handleEVDelete = () => {
    var query = db.collection('Events').where('title','==', selected.title);
    query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  });
});
    handleEVClose();
  };


    useEffect(() => {
        db.collection("Events").where("family", "==", localStorage.getItem("family")).onSnapshot((snapshot) =>
            setAllEvents(snapshot.docs.map((doc) => { return ({
              start: doc.data().start.toDate(),
              title: doc.data().title,
              end: doc.data().end.toDate(),
              username: doc.data().username,
            })})
            )
        );
    }, []);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
    db.collection("Events").add({
      title: newEvent.title,
      username: localStorage.getItem("name"),
      start: newEvent.start,
      end: newEvent.end
  });
  setOpen(false);
}

  return (
    <>
    <Header active="calender"/>
    <div className="calender">
    <div className="calender__input">
            <h1>Shared Family Calendar</h1>
            <Button startIcon={<AddIcon />} variant="outlined" onClick={handleClickOpen}>
        Add Event
      </Button>
      <Dialog
      fullWidth={true}
      maxWidth="xl"
       open={open} onClose={handleClose}
       scroll="body">
        <DialogTitle>Create New Event!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new event for all family members or add a note to self.
          </DialogContentText>
          <TextField placeholder="Add Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date"  selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEvent}>
                    Add Event
                </Button>
        </DialogActions>
      </Dialog>

      <Dialog
      fullWidth={true}
      maxWidth="xl"
       open={openev} onClose={handleEVClose}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Event Name: {selected.title}
          </DialogContentText>
          <DialogContentText>
            Created By: {selected.username}
          </DialogContentText>
          <DialogContentText>
            Start: {"" + selected.start}
          </DialogContentText>
          <DialogContentText>
            End: {"" + selected.end}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEVClose}>Back</Button>
          <Button onClick={handleEVDelete} color="error">Delete Event</Button>
        </DialogActions>
      </Dialog>
            </div>
            <Calendar localizer={localizer}
            selected={selected}
            onSelectEvent={handleSelected}
            events={allEvents} 
            startAccessor="start" 
            endAccessor="end" 
            style={{ height: 500, margin: "50px" }} />
        </div>
    </>
  )
}

export default Calender