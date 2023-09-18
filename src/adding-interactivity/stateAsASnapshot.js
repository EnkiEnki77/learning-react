// State may look like a normal JS variable you can read and write to, but it acts more like a snapshot, Setting state
// doesnt change the state variable you currently have, but actually triggers a rerender. And sets the new state variable
// of that render to the new value.

// For a UI to react to an event you need to update state, updating state triggers a rerender of the component with that
// new value. React sees the components state has a new value, so it updates the DOM to match the new render.

// When an event is triggered React calls an event handler, the event handler calls the state setter function, the 
// state setter function asynchronously sets the state variable to the evaluation of the expression passed to it as input
// and it also queues a rerender of the component. The component rerenders updating its JsX in accordance to the new
// state value, React sees a change has been made to the component so it tells the browser to rerender the DOM to match
// the newly rendered component. By default all of the DOM nodes nested also get rerenderd.


// When react re renders a componnet react calls your function component again, your componnet returns a new JSX 
// snapshot, React then updates the screen to match the JSX snapshot.



// As a componnets memory state is not like a normal variable that disappears after your function returns. State actually
// lives in React itself as if on a shelf outside of your componnet. When React calls your component it gives it a snapshot
// of the state for that particular render. 

// Your componnet returns a snapshot of the UI with a fresh set of props and event handlers in its jSx all calculated 
// from the state values of that render.


// The user interacts with the app telling react to update the state, react updates the state value, react rerenders the
// componnet and passes it a new snapshot of the state with the updated value.


import { useState } from 'react';

// The component below tells React to update the state value 3 different times in the same render. React only gives one
// snapshot of the render though, so the number state would evaluate to 0 for all 3. Meaning the state is updated to 1.
// in all 3. Multiple state setter calls in a single render are batched together, so they only end up queueing one render.
// State updates are stored in React but not passed to the component until the beginning of the next render
// The state value passed in for a render does not chnage no matter how many times you call the setter function.
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        // number is 0, so setNumber(0 + 1) is called
        setNumber(number + 1);
        // React prepares to change number to 1 on the next render
         // number is 0, so setNumber(0 + 1) is called
         setNumber(number + 1);
         // React prepares to change number to 1 on the next render
         // number is 0, so setNumber(0 + 1) is called
         setNumber(number + 1);
         // React prepares to change number to 1 on the next render
      }}>+3</button>
      {/* On the next render of the component number would be 1 */}
    </>
  )
}

function Counter2() {
    const [number, setNumber] = useState(0);
  
    return (
      <>
        <h1>{number}</h1>
        <button onClick={() => {
          setNumber(number + 5);
        // setNumber() tells react to update the state above, but the update is passed into the next render,
        // so number evaluates to the current snapshot of the state for that render no matter where its used in the 
        // component.
          alert(number);
        }}>+5</button>
      </>
    )
  }

//   Even if a state variable is used in an asynchronous function such as a timer it will use the state value of the render
// that the function was queued from.
// The state stored in React may have changed by the time the function runs, but it was scheduled using a snapshot of the
// state at the time the user interacted with it.

// A state variables value never changes within a render, even if its event handlers code is asynchronous.

// It is possible to read state updates before a rerender if you use a state updater function, aand pass that to 
// the state setter.

