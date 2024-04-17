import {react,useState} from 'react';
import './Journal.css';
import Gojo from '../images/GojoChibi.jpg'
import { Textarea} from '@chakra-ui/react'
import { Box, Heading, Input, Button, Text, VStack, Divider } from '@chakra-ui/react';
import Calendar from 'react-calendar';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";




const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newTask.title || !newTask.description) {
      alert('Please enter a title and description for the task.');
      return;
    }

    setTasks([...tasks, newTask]);
    setNewTask({ title: '', description: '' });
  };
  const [date, setDate] = useState(new Date());
  const onChange = (newDate) => {
    setDate(newDate);
  };
  const [events, setEvents] = useState([
    {
      title: 'Meeting',
      date: '2024-04-20',
      allDay: true,
    },
    {
      title: 'Deadline',
      date: '2024-04-25',
      start: '10:00:00',
      end: '11:00:00',
    },
  ]);

  const handleEventClick = (event) => {
    // Handle clicking an event (optional)
    console.log('Event clicked:', event);
  };


  return (
    <>
    <div class="container">
    <div class="side-column">
      <div>
      <img src={Gojo} alt="Gojo" style={{ height: '250px', marginRight: '10px' }} />
      
      </div>
      <h2>Aditya Bhadauria</h2>
      <p>Content for the left side column.</p>
    </div>
    <div className="main-content">
    <div className="Calender">
    <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="90vh"
        
        events={events}
        eventClick={handleEventClick} // Optional: Handle event click
      />
    </div>
    </div>
  </div>
  
  </>
  );
};

export default TaskManagement;







