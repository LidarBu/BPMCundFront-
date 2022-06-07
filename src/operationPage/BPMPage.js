import conf from "../Assests/Configuration.json";
import React, { useState } from "react";
import "./BPMPage.css";
import Popup from "reactjs-popup";
import { ClipLoader, FadeLoader, ClockLoader } from "react-spinners";
import { css } from "@emotion/react";

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

async function StopBpm(bpm) {
  var url = new URL(conf.BACKEND_SERVER + "/stopbpm");
  const requestOptions = {
    method: "PUT",
  };
  var params = { bpm: bpm };
  url.search = new URLSearchParams(params).toString();
  console.log("stop bpm func:" + bpm);
  console.log(url.toString());
  const response = await fetch(url, requestOptions)
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

async function StartBpm(bpm) {
  var url = new URL(conf.BACKEND_SERVER + "/startbpm");
  var params = { bpm: bpm };
  const requestOptions = {
    method: "PUT",
  };
  url.search = new URLSearchParams(params).toString();
  console.log("stop bpm func:" + bpm);
  console.log(url.toString());
  const response = await fetch(url, requestOptions)
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
      <span> {message} </span>
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
          <p className="logs">{data}</p>
        </div>
      </Popup>
    </>
  );
};

const StartButton = (props) => {
  const [state, setState] = React.useState(false);
  const [data, setData] = React.useState([[]]);
  const onClickHandler = () => {
    StartBpm(props.value)
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
        Start
      </button>
      {state ? OpenPopup(data, setState) : null}
    </>
  );
};

const StopButton = (props) => {
  const [state, setState] = React.useState(false);
  const [data, setData] = React.useState([[]]);
  const onClickHandler = () => {
    StopBpm(props.value)
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
        Stop
      </button>
      {state ? OpenPopup(data, setState) : null}
    </>
  );
};
//bpm line q
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
    // <div>
    //   <div className={stateClass(state)} />
    //   <p className="inline">{name}</p>
    //   <p className="inline">Port: {port}</p>
    //   <p className="inline">Desc: {description}</p>

    //   <LogButton value={trimedName} className="inline" />
    //   <StartButton value={trimedName} className="inline" />
    //   <StopButton value={trimedName} className="inline" />
    // </div>
    <tr>
      <td className={stateClass(state)} />
      <td className="inline">{name}</td>
      <td className="inline">Port: {port}</td>
      <td className="inline">Desc: {description}</td>
      <td>
        <LogButton value={trimedName} className="inline" />
      </td>
      <td>
        <StartButton value={trimedName} className="inline" />
      </td>
      <td>
        <StopButton value={trimedName} className="inline" />
      </td>
    </tr>
  );
}

function filter(word, bpms, descriptor, setFiltered) {
  setFiltered([]);
  bpms.forEach((element) => {
    // if (element[descriptor].includes(word))
    if (
      element["name"].includes(word) ||
      element["port"].toString().includes(word) ||
      element["description"].includes(word)
    )
      setFiltered((prev) => [...prev, element]);
  });
}

function BPMPage() {
  const [bpms, setObj] = React.useState([]);
  const [filteredBpms, setFiltered] = React.useState([]);
  const [loader, setLoader] = React.useState(true);

  const override = css`
    position: fixed;
    top: 35%;
    left: 50%;
  `;

  React.useEffect(() => {
    fetch(conf.BACKEND_SERVER + "/getall")
      .then((response) => {
        response
          .json()
          .then((res) => {
            try {
              res.data.forEach((element) => {
                setObj((prev) => [...prev, element]);
                setFiltered((prev) => [...prev, element]);
              });
              setLoader(false);
            } catch (e) {
              console.log(e);
            }
            // console.log(element);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log);
  }, []);

  return (
    <div>
      <div className="filter">
        Filter:{" "}
        <input
          onChange={(input) => {
            filter(input.target.value, bpms, "description", setFiltered);
            console.log(filteredBpms);
          }}
        />
      </div>
      <table className="container">
        <tbody>
          {filteredBpms.map((elem) => {
            return <BPMQuery key={elem.name} bpm={elem}></BPMQuery>;
          })}
        </tbody>
      </table>
      <FadeLoader
        css={override}
        loading={loader}
        height={45}
        width={15}
        margin={25}
        color="#88adbd"
      ></FadeLoader>
    </div>
  );
}

export default BPMPage;
