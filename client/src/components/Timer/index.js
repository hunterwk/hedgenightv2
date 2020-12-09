import React, { useState, useEffect } from "react";
import { useAuth } from "../../util/authContext";
import "../HomePage/styles.css";
import API from "../../util/API";

//using this package will allow us to store the seconds state as a number when it is added to the database for easier usage later
const TimeFormat = require("hh-mm-ss");

const Timer = (props) => {
  const { isLoggedIn } = useAuth();
  const [seconds, setSeconds] = useState(props.useTimer.duration);
  const [isActive, setIsActive] = useState(false);
  const [notes, setNotes] = useState(props.useTimer.notes);
  const [title, setTitle] = useState(props.useTimer.name);

  //essentially creates a start and pause button instead of making 2 buttons
  function toggle() {
    setIsActive(!isActive);
  }
  function helper() {
    if (isActive === true) {
      setIsActive(false);
    } else if (isActive === false) {
      return;
    }
  }

  //will be the save to database functionality
  async function handleSaveTask(evt) {
    evt.preventDefault();
    helper();
    try {
      API.createTasks({ name: title, notes: notes, duration: seconds });
      console.log({
        name: title,
        notes: notes,
        duration: seconds,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    //clearing the interval out at the end
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div id="timer-card">
        <div className="app enable-rounded container">
          
            <h1>
              <div className="time mx-auto">
                <span className="timer-span">
                  {TimeFormat.fromS(seconds, "hh:mm:ss")}
                </span>
              </div>
            </h1>
          
          <br />
          <div className='startTimeBtn'>
            <button
            id="timer-button"
              className={`button button-primary button-primary-${
                isActive ? "active" : "inactive"
                }`}
              onClick={toggle}
            >
              {isActive ? "Pause" : "Start Timer"}
            </button>
            <br />
          </div>
        </div>
        <br />
        <div className="container mx-auto">
          <form>
            < br/>
            <section>
              <section className="sessionTitle">
                <label htmlFor="name header">Session Title:</label>
                <br />
                <input
                  type="text"
                  value={title}
                  onChange={(evt) => setTitle(evt.target.value)}
                ></input>
              </section>
              <article className="sessionNotes">
                <br />
                <label htmlFor="notes">Session Notes:</label>
                <br />
                <textarea
                  className="notesBox"
                  value={notes}
                  type="text"
                  rows="6"
                  width="100%"
                  onChange={(evt) => setNotes(evt.target.value)}
                ></textarea>
                <br />
              </article>
              <article className="saveTimeBtn">
                {isLoggedIn ? (
                  <button
                    className={`button button-secondary`}
                    onClick={handleSaveTask}
                  >
                    Save
                  </button>
                ) : (
                    <p className="text-muted">
                      Log in or create an account if you would like to save a
                      session.
                    </p>
                  )}
              </article>
              <br />
            </section>
          </form>
        </div>
    </div >
  );
};

export default Timer;
