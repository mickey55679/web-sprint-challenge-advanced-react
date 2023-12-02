import React, { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [index, setIndex] = useState(initialIndex); // slice of state
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let x; //initializing x with no value
    let y; //initalizing y with no value
    if (index === 0) {
      x = 1;
      y = 1;
    } else if (index === 1) {
      x = 2;
      y = 1;
    } else if (index === 2) {
      x = 3;
      y = 1;
    } else if (index === 3) {
      x = 1;
      y = 2;
    } else if (index === 4) {
      x = 2;
      y = 2;
    } else if (index === 5) {
      x = 3;
      y = 2;
    } else if (index === 6) {
      x = 1;
      y = 3;
    } else if (index === 7) {
      x = 2;
      y = 3;
    } else if (index === 8) {
      x = 3;
      y = 3;
    }

    return [x, y];
  }

  function getXYMessage() {
    const [x, y] = getXY();
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const message = `(${x}, ${y})`;
    return message;
  }
  // console.log(getXYMessage())

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setMessage(initialMessage);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    // in a 3 column grid, indices 0, 3, 6 represent the left edge, and indices 2, 5 and 8 represent the right edge
    if (direction === "left" && index % 3 !== 0) {
      // check if direction is left, and ensures that moving left is possible
      // because if index is 0, 3 or 6.. % 3 will be 0
      return index - 1;
    } else if (direction === "right" && (index + 1) % 3 !== 0) {
      return index + 1;
    } else if (direction === "up" && index >= 3) {
      return index - 3;
    } else if (direction === "down" && index < 6) {
      return index + 3;
    } else {
      return index;
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);
    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setMessage(initialMessage);
    } else {
      setMessage(`You can't go ${direction}`);
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { id, value } = evt.target;
    if (id === "email") {
      setEmail(value);
    }
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const [x, y] = getXY()
    axios.post(`http://localhost:9000/api/result`, 
       {x: x, y: y, steps: steps, email: email}
    )
    .then(res => setMessage(res.data.message))
    .then(() => setEmail(initialEmail))
    .catch(error => setMessage(error.response.data.message))
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? "time" : "times"}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
