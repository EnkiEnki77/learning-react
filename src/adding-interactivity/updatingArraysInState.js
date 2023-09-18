// Just like with objects you should treat arrays as read-only when used as state, meaning you shouldnt reassign indexes
// or use methods that mutate the array such as push or pop.

// Instead create a new array from the existing array by calling its non mutating methods, and pass the result to the 
// setter function.
import { useState } from 'react';
// Adding: avoid push and unshift. instead use concat or [...arr] spread syntax
// setArtists( // Replace the state
//   [ // with a new array
//     ...artists, // that contains all the old items
//     { id: nextId++, name: name } // and one new item at the end
//   ]
// );

// Sometimes you want to insert into an array but not at the beginning or end
let nextId = 3;
const initialArtistss = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++, name: name },
      // Items after the insertion point:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        Insert
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}


// Removing: avoid pop, shift, and splice. Instead use filter or slice.


let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

function Lists() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
                // sets the artists state to an array of artists whose id is different than the artist whose delete button
                // was clicked, filtering that artist out.
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );}

// Replacing all or some values: avoid splice and arr[i] = assignment. Instead use map.
// Transforming an array
let initialShapes = [
    { id: 0, type: 'circle', x: 50, y: 100 },
    { id: 1, type: 'square', x: 150, y: 100 },
    { id: 2, type: 'circle', x: 250, y: 100 },
  ];
  
   function ShapeEditor() {
    const [shapes, setShapes] = useState(
      initialShapes
    );
  
    function handleClick() {
      const nextShapes = shapes.map(shape => {
        if (shape.type === 'square') {
          // No change
          return shape;
        } else {
          // Return a new circle 50px below
          return {
            ...shape,
            y: shape.y + 50,
          };
        }
      });
      // Re-render with the new array
      setShapes(nextShapes);
    }
  
    return (
      <>
        <button onClick={handleClick}>
          Move circles down!
        </button>
        {shapes.map(shape => (
          <div
            key={shape.id}
            style={{
            background: 'purple',
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            borderRadius:
              shape.type === 'circle'
                ? '50%' : '',
            width: 20,
            height: 20,
          }} />
        ))}
      </>
    );
  }

// Replacing items in an array while keeping some others.
  let initialCounters = [
    0, 0, 0
  ];
  
function CounterList() {
    const [counters, setCounters] = useState(
      initialCounters
    );
  
    function handleIncrementClick(index) {
      const nextCounters = counters.map((c, i) => {
        if (i === index) {
          // Increment the clicked counter
          return c + 1;
        } else {
          // The rest haven't changed
          return c;
        }
      });
      setCounters(nextCounters);
    }
  
    return (
      <ul>
        {counters.map((counter, i) => (
          <li key={i}>
            {counter}
            <button onClick={() => {
              handleIncrementClick(i);
            }}>+1</button>
          </li>
        ))}
      </ul>
    );
  }

// Sorting: aviod reverse and sort directly. Instead copy the array, and use reverse/sort on the copy.

let nextIds = 3;
const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

function Listss() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        Reverse
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}


// When updating nested state you need to create copies starting from the point where you want to update, and all 
// the way up to the top level.
function BucketList() {
    const [myList, setMyList] = useState(initialList);
    const [yourList, setYourList] = useState(
      initialList
    );
  
    function handleToggleMyList(artworkId, nextSeen) {
      setMyList(myList.map(artwork => {
        if (artwork.id === artworkId) {
          // Create a *new* object with changes
          return { ...artwork, seen: nextSeen };
        } else {
          // No changes
          return artwork;
        }
      }));
    }
  
    function handleToggleYourList(artworkId, nextSeen) {
      setYourList(yourList.map(artwork => {
        if (artwork.id === artworkId) {
          // Create a *new* object with changes
          return { ...artwork, seen: nextSeen };
        } else {
          // No changes
          return artwork;
        }
      }));
    }
  
    return (
      <>
        <h1>Art Bucket List</h1>
        <h2>My list of art to see:</h2>
        <ItemList
          artworks={myList}
          onToggle={handleToggleMyList} />
        <h2>Your list of art to see:</h2>
        <ItemList
          artworks={yourList}
          onToggle={handleToggleYourList} />
      </>
    );
  }
  
  function ItemList({ artworks, onToggle }) {
    return (
      <ul>
        {artworks.map(artwork => (
          <li key={artwork.id}>
            <label>
              <input
                type="checkbox"
                checked={artwork.seen}
                onChange={e => {
                  onToggle(
                    artwork.id,
                    e.target.checked
                  );
                }}
              />
              {artwork.title}
            </label>
          </li>
        ))}
      </ul>
    );
  }


