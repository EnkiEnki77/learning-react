// State is isolated between componnets. React keeps track of which state belongs to which component, based on their 
// place in the UI tree. You can choose when to preserve and when to reset state between rerenders.

// React uses tree structures to manage and model the UI you make. React constructs UI trees from your JSX, React DOM then
// takes those UI trees and utilizes them to update the browser DOM to match.

// State is tied to a position in the UI tree. You may think when you define state it lives inside the component it was
// defined in, but it actually lives in React. 
// React keeps track of which component state belongs to by where the component is located in the UI tree.

// Say we have a counter component, but its rendered at two different positions
import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}

// These are two seperate counters, because each is rendered in two seperate positions in the tree.

// In React, each component rendered on the screen has fully isolated state.

// State is tied to a component based on its position in the UI tree, and React will keep the state around for as long as
// you render the same component in the same position of the tree. 
// When React removes a component or its position in the UI tree changes it destroys its state.



