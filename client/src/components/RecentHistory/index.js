import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import API from "../../util/API";
import "../HomePage/styles.css";
import "./styles.css";

const TimeFormat = require("hh-mm-ss");

function resumeSession() {
  
}

function RecentHistory(props) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    API.findTasks().then(({ data }) => {
      let newData = data.slice(Math.max(data.length - 2, 0));
      setData(newData);
      console.log(newData);
      console.log(data[data.length - 2]);
    });
  }, []);

  

  return (
    <div className="HistoryCard container mx-auto card">
      <h3 className="text-align-center about-title"> Recent Sessions:</h3>
      <Link to="/protected/history" className="text-align-center">View all previous sessions</Link>
      <div className="row">
        {data.length === 0 ? (
          <h4 className="text-center">You dont have any previous sessions!</h4>
        ) : (
          data.map((tasks) => (
            <div className="col-12" key={tasks._id.toString()}>
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Title: {tasks.name}</h4>
                  <h5 className="card-text">
                    Duration: {TimeFormat.fromS(tasks.duration)}
                  </h5>
                  <p className="card-text">
                    Notes:
                    <br />
                    {tasks.notes}
                  </p>
                  <button onClick={resumeSession}></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentHistory;
