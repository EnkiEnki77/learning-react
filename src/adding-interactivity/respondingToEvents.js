// React lets you add event handlers to your JSX. Event handlers are your own functions that will be triggered by React
// in response to events like clicking, hovering, focusing form input, etc.

// Event handlers are defined inside your components, and conventionally start with the word handle followed by the name
// of the event

// Event handlers should be passed as props, but not called. This is because they may contain side effects. We dont want
// them running when the component renders, only on interactions when side effects are allowed. event handlers dont have
// to be pure functions.

function Button(){
    // event handler
    function handleClick(){
        console.log("You clicked me!")
    }

    return(
        // event prop with event handler passed as value
        <button onClick={handleClick}>Click me</button>
    )
}


// Often youll want the parent component to specify the childs event handler, such as when defining two Buttons that 
// do different things.

function ButtonGen({onClick, children}){
    return <button onClick={onClick}>
                {children}
           </button>
}

function PlayButton({movieName}){
    function handlePlayClick(){
        alert(`Playing ${movieName}`)
    }

    return(
        // To utilize the event object you have to wrap your handler in another function and pass the event to the wrapper
        // Your handler will then have to be called from within the wrapper 
        <ButtonGen onClick={(e) => {
                e.stopPropagation()
                handlePlayClick()
            }}>
            Play {movieName}
        </ButtonGen>
    )
}

// You can define event handlers inline for shorter simpler functions
function UploadButton() {
    return (
      <ButtonGen onClick={() => alert('Uploading!')}>
        Upload Image
      </ButtonGen>
    );
  } 

  export default function Toolbar() {
    return (
        // events propagate, so that means if you click a button first its event handler will be invoked, then the event
        // will bubble up to the div and run its event handler.
      <div onClick={() => alert("I was clicked on too.")}>
        <PlayButton movieName="Kiki's Delivery Service" />
        <UploadButton />
      </div>
    );
  }

//  Its good practice for components like buttons to contain styling but not specify behaviour, you should pass down 
// event handlers from more specific components like PlayButton or UploadButton.

// Built in components like <button> or <div> only support browser event names such as onClick. However with your own 
// components you can name your event props whatever youd like. By convention they start with on followed by a description
// of the handler.


// Event handlers will also catch events from any children your component might have. Events bubble or propagate up the 
// tree. It starts with where the event happened and propagates up the tree.

// All events propagate except onScroll.

// Event handlers recieve a single event object as their argument. Conventionally called e. 
// The event object has a method that keeps the event from bubbling up the tree, called stopPropagation.

// e.preventDefault() prevents default browser behaviour on certain events such as form submit.



// Event handlers are the best place for side effects, because unlike rendering functions event handlers dont need to be
// pure, so its a great place to change something such as state, or an inputs value based on typing. or change a list 
// based on button click. However in order to change some info you need to store it in a variable. In react you use state.


