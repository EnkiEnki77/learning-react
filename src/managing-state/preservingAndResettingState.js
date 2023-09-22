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

// The position of a componnet in the UI tree not how your JSX is structured is what determines if state is preserved or
// not. React doesnt know where you place the conditions in your markup, all it sees is the tree you return.



// placing a different componnet in the same position resets state, so if you put the original component back after its
// state will not have been preserved.

// If you replace a position in the tree with a different component all of the state of the sub tree is reset as well, even
// if the components of the sub tree didnt change.


// If you want to preserve state the structure of your UI tree (The markup tree returned from your JSX) needs to stay the
// same, because when React removes a component from the tree it destroys the state. It only removes the component from the
// tree if the JSX tree has a different element for that position thtough.


// When conditionally rendering in your jsx state will be preserved if both conditions render the same component.
// Because again React doesnt know about a components conditions, it only sees the UI tree that is returned. So even 
// if the two condition components have different props the state is preserved, becuase React sees it as the same component
// in the same position just with different props. 

function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {/* Two different instances of the Counter component are rendered with different props, but when React takes
      the new UI tree and compares it to the old one it sees the same component in the same position, just with different
      props, so it preserves the state and only rerenders the aspect that utilize the props that changed. */}
      {isPlayerA ? (
        <Counter2 person="Taylor" />
      ) : (
        <Counter2 person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

function Counter2({ person }) {
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
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}

// By default React preserves state when a component of the new UI tree is in the same position it was in the last version
// Occasionally you may want the state to be different though.

// There are two ways to do this. 1. Render components in different positions. 2. Give each component an explicit identity
// with a key.

function Scoreboards() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    // The counters are rendered in two different positions, so the state is not preserved. With && a position is still
    // created if the expression is false, it will just be empty.
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}


// Give each component a key so React sees them as different components, even if theyre in the same position.
// Using keys tells React to use the key itself as part of the position instead of just the order within the parent.
// Keys are not globally unique though, they only specify position within the parent.
function Scoreboardss() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}


// Preserving state with key is particularly useful for forms, where you want the form input to reset on changes.
 function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.id} contact={to} />
    </div>
  )
}

function ContactList(){
  return
}

function Chat(){
  return
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

// You could lift the state up and hold the pending message for each recipient in the parent component. This way, when the child components get removed, it doesn’t matter, because it’s the parent that keeps the important information. This is the most common solution.
// You might also use a different source in addition to React state. For example, you probably want a message draft to persist even if the user accidentally closes the page. To implement this, you could have the Chat component initialize its state by reading from the localStorage, and save the drafts there too.
// No matter which strategy you pick, a chat with Alice is conceptually distinct from a chat with Bob, so it makes sense to give a key to the <Chat> tree based on the current recipient.


