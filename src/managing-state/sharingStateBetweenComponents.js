// Sometimes you want the state of two components to be the same and to always change together. To achieve this lift 
// the state up to the closest parent, and pass it back to both components as props.

import { Children, useState } from "react";

// When you go to lift state up you may need to change the value stored in state. For example, if you have a toggle
// state that is a boolean and shows text based on whether the state is true or not this will work for individual 
// components, but if you want to lift the state up for it to work for multiple components you would need a way of 
// keeping track of which component should be open and have the rest closed. Instead o using a boolean for state
// give each component an index and set the passed in prop as true if the state equals that index, then in the 
// components event handler set the state to the components index.

export default function Accordion(){
    const [isActive, setIsActive] = useState(0)

    return (
        <>
            <Panel title="About" isActive={isActive === 0} onShow={() => setIsActive(0)}>
                Im Enki, how's it going?
            </Panel>
             <Panel title="Not About" isActive={isActive === 1} onShow={() => setIsActive(1)}>
             Im not Enki, how's it going?
            </Panel>
        </>
    )
}

function Panel({title, isActive, children, onShow}){

    return (
        <section>
            <h3>{title}</h3>
            {isActive ? 
             <p>{children}</p> :
             <button onClick={onShow}>show</button>
            }
        </section>
    )
}


// Its common to call a component with local state uncontrolled, because its parent has no control over its main logic.
// You can say a component is controlled though when its important info/logic is driven by props from a parent rather than
// a local state. This lets the parent componnet specify its behaviour, and orchestrate all of its children together.

// controlled components allow you to coordinate the state of sibling componnets and keep them in sync with eachother.
// when the props of one components changes so do the props of the others.

// Each state should have a single source of truth, if you find yourself duplicating state across components lift it up
// to the nearest parent.