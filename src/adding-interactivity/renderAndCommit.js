// Before your components are displayed on screen they need to be rendered by React.

// Imagine your components are chefs in a kitchen, React is the waiter, and ther users of your site are customers.
// The process of requesting UI to be served to the screen has 3 steps.

// 1. Triggering a render(Delivering the users order to the kitchen)
// 2. Rendering the component(preparing the order in the kitchen)
// 3. Committing to the DOM(delivering the order to the user.)

// There are two reasons for a component to render. Its the components initial render. The components or one of its 
// ancestors state has been updated.

// When your app starts it needs to trigger the initial render, this is done by calling createRoot with the target 
// DOM node as argument, and then calling its root method with the root component as its argument.

import {createRoot} from "react-dom/client"

function MyApp(){
    return <div></div>
}

const root = createRoot(document.getElementById('root'))
root.render(<MyApp/>)



// Once a component has been initially rendered you can trigger additional renders by updating its state with the 
// setter function. Updating a components state automatically queues it for a render.


// After you trigger a render React calls your components to figure out what to display on the screen. Rendering is react
// calling your components.

// On initial render react calls the root component.

// On subsequent rerenders React calls the function component whose state triggered a render.

// The render process is recursive, if the updated componnet returns some component react will render that component next
// The process will continue until there are no more nested components and React knows exactly to display on the screen.

// Rendering must always be a pure calculation. In strict mode React calls functions twice in order to help surface 
// mistakes caused by the use of impure function components.


// The default is for all components nested in a rerendered component to rerender as well, even if their state didnt change.



// After rendering(calling) your components React will modify the DOM.

// For the initial render React uses the appendChild DOM API to put all the DOM nodes it has created on the screen.

// For rerenders it will apply the minimal necessary operations (calculated while rendering) to make the DOM match the
// latest render output.

// React only changes the DOM nodes if theres a difference between renders


// After rendering is done and React updates the DOM, the browsers rerenders the screen.

