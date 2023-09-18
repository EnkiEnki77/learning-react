// Components often need to change whats on the screen based on user interaction. Components need to remember things, and
// we use state for that.

import { useState } from "react";

// We have to use state instead of local variables, because local variables do not persist between renders.
// Changes to local variables do not cause components to rerender.

// To update a component with new data the data needs to be retained between renders, and React needs to be triggered to 
// rerender the component with the new data.

// The useState hook provides these two things.
// A state variable to retain the data between renders.
// A state setter function to update the variable and trigger React to rerender the component.

// To use useState hook 
function State(){
    // useState returns an array of two items, a state variable, and a setter function.
    // Its a convention to destructure these two values from it.
    const [index, setIndex] = useState()
    return
}

// hooks are special functions only available while React is rendering.

// Hooks can only be called at the top level of components or your own custom hooks.
// You cant call them in conditions, loops, or other nested functions. 


// If you have two or more state variables that are unrelated it makes sense to keep them seperate. But if you often
// are changing them together save them both as a single state object.



// The useState hook does not recieve any info about which state variable it refers to. 
// To enable the concise syntax hooks rely on a stable call order on every render of the same component. As long as you
// follow the rule above of only call hooks at the top level of your components they will always be called in the same
// order.

// Internally React holds an array of state pairs for each component. It also maintains the current pair index, which is 
// set to 0 before rendering. Each time you call useState React gives the next state pair and increments the pair index


// Each instance of a component has its own isolated private state.

// Each has its own state
function Comp(){
    return (
        <>
            <State/>
            <State/>
        </>
    )
}

// State is fully private to the component declaring it, to keep state in sync between siblings you need to lift it up to 
// the nearest parent and pass it to both as props.




