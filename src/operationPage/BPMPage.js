import conf from "../Assests/Configuration.json";
import React, { useState } from "react";
import "./BPMPage.css";
import Popup from "reactjs-popup";

async function FetchLog(bpm) {
  var url = new URL(conf.BACKEND_SERVER + "/getlogs");
  var params = { bpm: bpm };
  url.search = new URLSearchParams(params).toString();
  console.log("fetch func:" + bpm);
  console.log(url.toString());
  const response = await fetch(url)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      return { data: [], error: err };
    });

  return response;
}

function OpenPopup(message, func1, func2) {
  console.log("message pop " + message);
  var state = true;
  return (
    <Popup
      open={state}
      modal
      closeOnDocumentClick
      onClose={() => {
        func1(false);
        func2(false);
      }}
    >
      <span> messagegee mf </span>
    </Popup>
  );
}

const LogButton = (props) => {
  const [state, setState] = React.useState(false);
  const [data, setData] = React.useState([[]]);

  const onClickHandler = () => {
    FetchLog(props.value)
      .then((res) => res.data)
      .then((res) => {
        setData(res);
      })
      .then(setState(true));
  };

  return (
    <>
      <button
        id={props.value}
        className="button_a button_b"
        onClick={() => onClickHandler()}
      >
        Last Logs
      </button>
      <Popup
        open={state}
        modal
        closeOnDocumentClick
        onClose={() => setState(false)}
      >
        <div className="popup-content">
          {/* {data.map((elem) => {
            console.log(elem);
            return <p className="logs">{elem.query}</p>;
          })} */}
          {data}
        </div>
      </Popup>
    </>
  );
};

const StartButton = (props) => {
  const [state, setState] = React.useState(false);
  return (
    <>
      <button
        id={props.value}
        className="button_a button_b"
        onClick={() => {
          console.log("restart clicked");
          setState(!state);
        }}
      >
        Start
      </button>
      {state ? OpenPopup("Start", setState) : null}
    </>
  );
};

const StopButton = (props) => {
  const [state, setState] = React.useState(false);
  return (
    <>
      <button
        id={props.value}
        className="button_a button_b"
        onClick={() => {
          console.log("restart clicked");
          setState(!state);
        }}
      >
        Stop
      </button>
      {state ? OpenPopup("Stop", setState) : null}
    </>
  );
};

function BPMQuery(props) {
  const { name, port, description, state } = props.bpm;
  const trimedName = name.substring(3, 6); //trim the bpm num only.
  const stateClass = (state) => {
    if (state.trim() === "true") {
      return "green_state";
    } else {
      return "red_state";
    }
  };

  return (
    <div>
      <div className={stateClass(state)} />
      <p className="inline">{name}</p>
      <p className="inline">Port: {port}</p>
      <p className="inline">Desc: {description}</p>

      <LogButton value={trimedName} className="inline" />
      <StartButton value={trimedName} className="inline" />
      <StopButton value={trimedName} className="inline" />
    </div>
  );
}

function BPMPage() {
  const [bpms, setObj] = React.useState([]);

  React.useEffect(() => {
    fetch(conf.BACKEND_SERVER + "/getall")
      .then((response) => {
        response.json().then((res) => {
          console.log(res);
          res.data.forEach((element) => {
            setObj((prev) => [...prev, element]);
            // console.log(element);
          });
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div class="container">
      {bpms.map((elem) => {
        return <BPMQuery key={elem.name} bpm={elem}></BPMQuery>;
      })}
    </div>
  );
}

export default BPMPage;
