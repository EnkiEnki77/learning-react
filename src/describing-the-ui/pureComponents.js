// In computer science a pure function is one that does not alter any data that existed before it was called, and 
// given the same input it will always have the same output.

function pureFunction(num){
    return num * 2;
}

pureFunction(2) //always 4
pureFunction(3) //always 6


// React components must always be pure functions. They must only return their jsx, and not change anything that existed
// before their rendering

let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
    {/* The below components all render different jsx, because the Cup component is not pure. Also
        Any additional components that utilize guest for their markup will end up having different jsx too. */}
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}

// To make the above pure pass in guest as a prop instead.
// In general components should be able to operate independently, and not coordinate based on siblings.
function Cup2(guest) {
    return <h2>Tea cup for guest #{guest}</h2>;
  }
  
function TeaSet2() {
    return (
      <>
        <Cup guest={1}/>
        <Cup guest={2}/>
        <Cup guest={3}/>
      </>
    );
  }

//   There are three kinds of input in React, state, props, and context. All 3 should be  treated as read-only. You 
// should never update them directly.

// When you w ant to change something in response to user input you should set state instead of writing to a variable.
// You should never change variables or objects when a component is rendering.

// in strict mode React calls each componnets function twice during development mode. By callilng them twice it helps find
// componnets that break the rules.

// Thats why for the impure Cup component guest would be 2 4 and 6 instead of 1 2 and 3. The component is being called 
// twice. With the pure function it doesnt matter that the function is being called twice, pure functions only calculate
// based off their input, so if their input is the same their output will always be the same too.

// If a componnet is impure and has side effects unintended output will occur.



// If a component changes a preexisting variable while rendering this is called mutation. Pure functions do not mutate 
// variables that exist outside of its local scope. Although it is completely fine to mutate variables created within 
// the componnet at rendering. This is called local mutation, and is still a pure operation.

function TeaGathering() {
    let cups = [];
    for (let i = 1; i <= 12; i++) {
      cups.push(<Cup key={i} guest={i} />);
    }
    return cups;
  }


// React relies heavily on purity, but sometimes you need side effects (thing that happen not during rendering), things
// like starting an animating, updating the screen, changing the data, etc. 

// In React side effects usually belong inside event handlers. Event handlers are functions that run when an action is 
// performed such as clicking a button. Even though event handlers are defined inside your component they arent run at 
// render so they dont need to be pure. 

// As a last resort if you dont have a proper event handler for your side effect you can still attach it to your returned
// JSX using useEffect. This tells React to execute it later, after rendering, when side effects are allowed. However
// useEffect should be last resort.

// Writing pure functions has some big benefits
// You can run your components in a differnet environment such as the server.
// You can improve performance by skipping rendering of components whose inputs have not changed. Since theyre pure
// theyre safe to cache. since they return the same results every time
// If some data changes in the middle of rendering a component tree, it can restart rendering without wasting time finishing
// the original render.

// List of things considered side effects:
// Updating state, this is why its generally done in an event handler.
// data fetch requests from an API
// direct DOM manipulation
// the use of web browser api features such as the timeer
// Anything else that effects something outside the scope of the component function