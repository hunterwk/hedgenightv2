import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../../util/API";
import '../HomePage/styles.css';
import "./styles.css";

const TimeFormat = require("hh-mm-ss");

function HistoryPage(props) {
  const [data, setData] = useState([]);
  const history = useHistory()
  useEffect(() => {
    API.findTasks().then(({ data }) => {
      setData(data);
    });
  }, []);

  async function historyRedirect(tasks) {
    props.setTimer(tasks)
  }
  function redirectorHelper() {
    history.push("/")
  }
  async function clickDelete(id) {
    const resp = await fetch(`/api/users/tasks/${id}`, {
      method: "DELETE"
    });
    return resp;
  }

  return (
    <div className="HistoryCard container mx-auto">
      <div className="row">
        {data.length === 0 ? (
          <h3 className="text-center">You dont have any previous sessions!</h3>
        ) : (
          data.map((tasks) => (
            <div className="col-8"key={tasks._id.toString()}>
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
                <button onClick={() => historyRedirect(tasks).then(()=> redirectorHelper())}>Resume</button>
                <button onClick={() => clickDelete(tasks._id)}>Delete</button>
              </div>
            </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
