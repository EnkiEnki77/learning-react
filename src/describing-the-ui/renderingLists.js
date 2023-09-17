// You will often want to display multiple similar components based on a list of data, where each component takes in
// data from that list as props.
// Use filter and map to transform your list of data into a list of components.

import { Fragment } from "react";

// You will often need to show several instances of a component with different data, you can put the data in an array
// and use map or filter to render and pass the data to the component.

const people = [
    'Creola Katherine Johnson: mathematician',
    'Mario José Molina-Pasquel Henríquez: chemist',
    'Mohammad Abdus Salam: physicist',
    'Percy Lavon Julian: chemist',
    'Subrahmanyan Chandrasekhar: astrophysicist'
  ];

export default function List(){
    const listItem = people.map(person => {
        return <li>{person}</li>
    })

    return <ul>
        {listItem}
    </ul>
}

// When utilizing more complex data you can use filter to filter an array down to only items that match a certain conditon
// and then use map to render the filtered array into components

// JSX elements in a map always require keys this allows React to associate a list item with a component. Allowing it to
// infer what happened and update the UI appropriately if the list gets sorted, added to, or deleted from.

// Keys should not be generated on the fly, and you should not use list indexes. They should be included in the data. Such
// as an ID or name.

// If each item needs to render several DOM nodes, you need to wrap them either in a div or Fragment, so you can pass a key.
const listItems = people.map(person =>
    <Fragment key={person.id}>
      <h1>{person.name}</h1>
      <p>{person.bio}</p>
    </Fragment>
  );


// The two rules for keys is they must be unique within a list, and they must not change over time.

// keys serve a similar role to file names, they let you distinguish between siblings even if the order of things change.

// Dont use index as a key, because this will change if things get re ordered or deleted.

// key doesnt come in to the component as a prop, its reserved.



