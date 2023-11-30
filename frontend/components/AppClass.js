import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = {
      ...initialState, // this will make a copy of the initialState
    }
  }

  getXY = () => {
    let x; 
    let y; 
    const {index} = this.state; // in functional component this came from the useState
    // if x and y are in the 0th index.. .from the jsx then coordinates = 1, 1
    if (index === 0) {
      x = 1;
      y = 1;
    }
    else if (index === 1) {
      x = 2;
      y = 1;
    }
    else if (index === 2) {
      x = 3;
      y = 1;
    }
    else if (index === 3) {
      x = 1;
      y = 2;
    }
    else if (index === 4) {
      x = 2;
      y = 2;
    }
    else if (index === 5) {
      x = 3;
      y = 2;
    }
    else if (index === 6) {
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


   
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  getXYMessage = () => {
    const [x, y] = this.getXY();
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const message = `Coordinates ${x}, ${y}`;
    return message; 
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({...this.state, ...initialState})
    // (initialState)

  }

  getNextIndex = (direction) => {
    const {index} = this.state
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
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

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
     const direction = evt.target.id;
     const nextIndex = this.getNextIndex(direction);
     const {index, steps} = this.state
      nextIndex !== index
        ? this.setState({
            ...this.state,
            index: nextIndex,
            steps: steps + 1,
            message: initialMessage,
          })
        : this.setState({
            ...this.state,
            message: `you can't go ${direction}`,
          });
    //  if (nextIndex !== index) {
    //   this.setState({...this.state, index: nextIndex, steps: steps + 1, message: initialMessage  })
    //   //  setIndex(nextIndex);

    //   //  setSteps(steps + 1);
    //   //  setMessage(initialMessage);
    //  } else {
    //   this.setState( {...this.state, message: `you can't go ${direction}`});
    //  }
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const { id, value } = evt.target;
    if (id === "email") {
      this.setState({...this.state, email: value})
      // setEmail(value);
    }
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    const {steps, email} = this.state;
    evt.preventDefault()
     const [x, y] = this.getXY()
    axios.post(`http://localhost:9000/api/result`, 
       {x: x, y: y, steps: steps, email: email}
    )
    .then(res => this.setState({...this.state, message: res.data.message}))
    .catch(error => console.log(error))
  
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${idx === this.state.index ? " active" : ""}`}
            >
              {idx === this.state.index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>
            LEFT
          </button>
          <button id="up" onClick={this.move}>
            UP
          </button>
          <button id="right" onClick={this.move}>
            RIGHT
          </button>
          <button id="down" onClick={this.move}>
            DOWN
          </button>
          <button id="reset" onClick={this.reset}>
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
           id="email"
            type="email"
             placeholder="type email"
              value={this.state.email}
              onChange={this.onChange}
              ></input>
          <input 
          id="submit"
           type="submit"
           ></input>
        </form>
      </div>
    );
  }
}
