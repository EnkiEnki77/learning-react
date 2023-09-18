// Each renders state values are fixed.
// No matter how many times you call the setter function for a state, it doesnt change until the next render.

import { useState } from "react";

// React waits until all code in your event handlers has run before processing state updates. Thats why the rerender 
// doesnt happen until all setter calls have run in an event handler.

// The last instance of a setter function being called in an event handler is the one that triggers the rerender.
// This allows you to update multiple state variables from multiple components without triggering too many rerenders.

// This also means the component isnt rerenderd until the event handler returns. This behaviour is called batching, and
// makes your app run much faster. This is also avoids confusing half finished renders where only some of the data updates.

// React only batches between every intentional event. The state updates of two seperate events such as two button clicks
// would not be batched.



// If you would like to update the same state multiple times within one render, instead of passing the next value into the
// setter you can pass in a callback that calculates the next value based on the previously queued update value.

export default function QueueMultiple(){
    const [number, setNumber] = useState(0)

    function handleClick(){
        // Queues the number state to be replaced to 1 on the next render
        setNumber(number + 2) // number(0) + 2

        // Function takes most recently queued state update value as argument (1 in this case), returned value from function
        // added to the front of the queue
        // This is called an updater function.
        setNumber(prev => prev + 1) //prev(2) + 1

        // Queues the state to be replaced to 2
        setNumber(number + 2) //number(0) + 2
        // The most recent queued state is 2 in this case, so prev + 1 would be 3.
        setNumber(prev => prev + 1) //prev(2) + 1

        // The last setter in the handler determines what value the state of the next render will be updated to.
        setNumber(number + 2) //number(0) + 2 This is the last update to be queued when the handler ends, so 2 will be 
        // the value React updates the state to on next render.
    }

    // Any time a setter function is called in an event handler the expression is added to a queue to be handled after 
    // all the other code in the handler is run. During the next render of the component React goes through the queue and
    // gives you the final updated state, the last update in the queue. Multiple setter function calls in a handler are 
    // batched together so only one render happens after all the code in the handler is run.

    // If you call setter without a function that is replacing the state, if you use a function you are updating state.

    // So if you use an updater function it updates the state of the next render, if you dont you replace the value and
    // any updates that were made for the next render.

    // If you call setNumber(number + 1), the expression is evaluated using the current snapshot of the state and then
    // replace state with 1 is added to the queue for the next render. If setNumber(n => n + 1) is called. The updater 
    // function is added to the queue for the next render. If setNumber(43) is called replace state with 43 is added to 
    // the queue for next render.

    // During the next render of the component when useState is being called, React goes through the state queue from 
    // the last render. It replaces the state with 1. It then runs the updater function with the previous queed value as
    // argument, it updates the state to 2. Then it replaces the state with 43 which is the final value.d

    // Updateer functions get added to the queue and update the last value in the queue, non function arguments.
    // Replace whatever the last value in the queue is.


    // After the event handler finishes running React triggers a rerender, during the rerender React processes the queue 
    // of state updates. Updater functions run during rendering, so they must be pure functions, and only return the 
    // result. Dont try to set state or run other side effects inside them. In strict mode React runs each updater function
    // twice but discards the second result to help you find mistakes.


    // Its common to name the param of your updater function the first letters of the corresponding state. For number itd
    // be n, or you could use a prefix like prevNumber

    // If you want to increment or decrement state always use an updater function.

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={handleClick}>click me</button>
        </div>
    )
}