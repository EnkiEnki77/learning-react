// State can hold any kind of JS value, including objects. But you shouldnt change objects you hold in state directly.
// Instead when you want to update an object you need to create a new one or make a copy of an existing one and set the 
// state to that copy. 

// Objects stored in state are technically mutable, but they should be treated as if theyre immutatble, and read-only.
// Any time you want to update an object you should replace the whole thing.

// If you attempt to mutate objects directly React doesnt know it needs to rerender, it also changes the values for 
// previous state updates in the queue

import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        // dont mutate the state object directly, React wont know it needs to rerender
        // position.x = e.clientX
        // position.y = e.clientY

        // Its okay to mutate a local object though, and then to set the state to that local object.
        // Its even okay to do local mutation during rendering. Because nothing outside the component is being 
        // effected.
        const newPosition = {}
        newPosition.x = e.clientX;
        newPosition.y = e.clientY;

        setPosition(newPosition)

        //Its equivalent to setting the state to a new object
        setPosition({
            x: e.clientX,
            y: e.clientY
          });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}


// If you want to only update one key of a state object but keep the prev values you can spread the state variable into
// the new object and just assign a value for the key youd like to update. The spread syntax is shallow though, youll
// need to adjust how you use it for nested objects.

import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
        ...person,
        firstName: e.target.value
    })
  }

  function handleLastNameChange(e) {
    setPerson({
        ...person,
        lastName: e.target.value
    })
  }

  function handleEmailChange(e) {
    setPerson({
        ...person,
        email: e.target.value
    })
  }

//   Instead of creating a handler for each object key you can put all the logic in one handler by dynamically assigning
// to a key based on e.target.name. You need to give your inputs a name attribute for this to work.
function handleChange(e){
    value = e.target.value;
    eName = e.target.name;

    setPerson({
        ...person,
        [eName]: value
    })
}

}


export default function Form() {
    const [person, setPerson] = useState({
      name: 'Niki de Saint Phalle',
      artwork: {
        title: 'Blue Nana',
        city: 'Hamburg',
        image: 'https://i.imgur.com/Sd1AgUOm.jpg',
      }
    });
  
    // when updating nested objects in state, you need to also create a new object for the key youre updating like below.
    function handleArtworkCityChange(e) {
      setPerson({
        ...person,
        artwork: {
            ...person.artwork,
            city: e.target.value
        }
      });
    }
  
    
  }

//   objects arent really nested, every object has its own place in memory. Objects can just point to other objects 
// with their properties.
const obj2 = {
    title: "Blue Nana",
    city: "Hamburg",
    image: 'https://i.imgur.com/Sd1AgUOm.jpg'
}

let obj1 = {
    name: 'Niki de Saint Phalle',
    artwork: obj2
  };

const obj3 = {
  name: 'Niki de Saint Phalle',
//   just like in obj1 the object assigned to the artwork key here has its own location in memor seperate from obj3.
// obj3 just points to it. Meaning this object could be nested in a different object, and any changes made to it from 
// inside that object would also make changes here.
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};
  
