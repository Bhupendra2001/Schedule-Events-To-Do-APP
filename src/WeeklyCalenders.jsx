import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import EventModal from "./EventModel";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdDone } from "react-icons/md";

const Title = styled.p`
  font-size: 22px;
  text-align: center;
  color: red;
  border-bottom: 2px solid gray;
`;

const Container = styled.div`
  border: 1px solid blue;
  width: 1200px;
  padding: 50px;
  margin: auto;
`;

const Wrapper = styled.div`
  margin: auto;
  width: auto;
`;

const WeekdaysHeader = styled.div`
  display: flex;
  width: 1100px;
`;

const Weekday = styled.div`
  flex: 1;
  padding: 10px;
  background-color: #f0f0f0;
  text-align: center;
  color: teal;
`;

const WeekDatesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 1100px;
`;

const WeekDate = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  font-size: ${(props) => (props.isCurrentDate ? "23px" : "18px")};
  cursor: pointer;
  color: ${(props) => (props.isCurrentDate ? "orange" : "")};
  border-radius: 10px;
  background-color: ${(props) =>
    props.isCurrentDate ? "blue" : "transparent"};
`;

const Event = styled.div`
  background-color: ${(props) => (props.completed ? "green" : "transparent")};

  padding: 10px 6px 10px 5px;
  margin: 0px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  margin-top: 10px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const EventTitle = styled.div`
  flex: 1;
  margin-right: 10px;
  font-size: 15px;
  color: black;
  flex-wrap: wrap;
`;

const EventDIvider = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const EddEvent = styled.div`
  font-size: 20px;
  color: #b5f416;
  border: 2px solid #b5f416;
  background-color: #fff;
  padding: 5px 10px 5px 10px;
  margin-top: 10px;
`;
const ChangeWeek = styled.div`
  text-align: center;
`;
const Button = styled.button`
  background-color: #fff;
  padding: 8px;
  cursor: pointer;
  border: 1px solid gray;
  margin: 20px;
  border-radius: 5px;
  color: gray;
`;

const WeeklyCalendars = () => {
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.log(error));
  };

  const saveEvents = () => {
    fetch("./events.json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(events),
    })
      .then(() => console.log("Events saved successfully"))
      .catch((error) => console.log(error));
  };

  const addEvent = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const createEvent = () => {
    const newEvent = {
      id: Date.now().toString(),
      date: selectedDate,
      title: newEventTitle,
      completed: false,
    };
    setEvents([...events, newEvent]);
    setShowModal(false);
    setNewEventTitle("");
    saveEvents();
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    saveEvents();
  };

  const completeEvent = (id) => {
    const updatedEvents = events.map((event) => {
      if (event.id === id) {
        return {
          ...event,
          completed: !event.completed,
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    saveEvents();
  };

  const handleEventTitleChange = (event) => {
    setNewEventTitle(event.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewEventTitle("");
  };

  const weekdays = moment.weekdaysShort();
  const weekDates = getWeekDates(currentWeek);

  function getWeekDates(week) {
    const startOfWeek = week.clone().startOf("week");
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.clone().add(i, "days");
      weekDates.push(date.format("D"));
    }

    return weekDates;
  }

  function goToPrevWeek() {
    setCurrentWeek(currentWeek.clone().subtract(1, "week"));
  }

  function goToNextWeek() {
    setCurrentWeek(currentWeek.clone().add(1, "week"));
  }

  return (
    <Container>
      <Wrapper>
        <Title>AWESOME DO DO APP</Title>
        <ChangeWeek>
          <Button onClick={goToPrevWeek}>Prev Week</Button>
          <Button onClick={goToNextWeek}>Next Week</Button>
        </ChangeWeek>

        <WeekdaysHeader>
          {weekdays.map((day) => (
            <Weekday key={day}>{day}</Weekday>
          ))}
        </WeekdaysHeader>

        <WeekDatesContainer>
          {weekDates.map((date) => {
            const eventsForDate = events.filter((event) => event.date === date);
           
            const isCurrentDate = date === moment().format("D");
            return (
              <WeekDate key={date} isCurrentDate={isCurrentDate}>
                {date}
                <EddEvent onClick={() => addEvent(date)}>Add Event</EddEvent>
                {eventsForDate.map((event) => (
                  <Event key={event.id} completed={event.completed}>
                    <EventTitle>{event.title}</EventTitle>
                    <EventDIvider>
                      {!event.completed && (
                        <RiDeleteBin2Line
                          style={{ color: "red", fontSize: "25px" }}
                          onClick={() => deleteEvent(event.id)}
                        />
                      )}
                      {!event.completed && (
                        <MdDone
                          style={{
                            color: "green",
                            fontSize: "18px",
                            border: "2px solid green",
                            borderRadius: "20px",
                          }}
                          onClick={() => completeEvent(event.id)}
                        />
                      )}
                    </EventDIvider>
                  </Event>
                ))}
              </WeekDate>
            );
          })}
        </WeekDatesContainer>
      </Wrapper>

      {showModal && (
        <EventModal
          title={newEventTitle}
          onTitleChange={handleEventTitleChange}
          onSave={createEvent}
          onClose={handleModalClose}
        />
      )}
    </Container>
  );
};

export default WeeklyCalendars;
