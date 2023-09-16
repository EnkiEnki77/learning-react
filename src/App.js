import "./styles.css"
// React apps are made out of components

// A component is a piece of UI that has its own logic and appearance, it can be as small as a single button, or as 
// large as a whole page.

// Components are JS functions that return markup. Components must always start with an uppercase letter, whereas html starts
// with lowercase
function MyButton(){
  return (
      <button>Im a button</button>
  )
}

function App() {
  const myName = "enki"
  // The markup below is called JSX (JS in XML) it is more strict than html it requires you to close all tags. You can also
  // only return a single JSX tag from each component, so if you plan to return more than one jsx element it must be wrapped
  // in a parent div or fragment. 
  return (
    // In JSX you specify a class using the className attribute, class is already a keyword in JS so it cant be used for 
    // styles.
    <div className="App">
      <h1>Welcome to my app!</h1>
      {/* Components can be returned from other components as JSX */}
      <MyButton/>
      {/* JSX allows you to put markup into JS. Using curly braces allows you to escape back into JS, and embed the 
      result of expressions into the markup. You can also escape into JS for attributes */}
      {myName}
      <Profile/>  
      <Conditionals/>
    </div>
  );
}

const user = {
  name: "Heidi",
  imageURL:  'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90
}

function Profile(){
  return (
    <>
      <h1>{user.name}</h1>
      <img 
        className="avatar"
        src={user.imageURL}
        alt={`${user.name}`}
        // You can use the style attribute when your styles rely on JS variables. It takes an object as its value.
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  )
}

function Conditionals({isLoggedIn = true}){
  // To conditionally render elements based on props or state you can use a conditional statement to assign jsx to a 
  // variable, then render that variable.
  // Statements cannot be used within JSX only expressions
  let content;
  if(isLoggedIn === true){
    content = <p>You are logged in.</p>
  }else{
    content = <p>You are not logged in.</p>
  }

  return(
    <>
      {content}
    </>
  )
}

function Conditionals2({isLoggedIn = false}){
  // Alternatively you can use ternary operator syntax, and because it is an expression you can use it directly in JSX
  // If you dont need the else aspect use this alternative syntax isLoggedIn && <p>You are logged in</p>
  return(
    <>
      {
        isLoggedIn ? <p>You are logged in</p> : <p>You are not logged in.</p>
      }
    </>
  )
}

// Export default denotes the main component of the file
export default App;
