// Props look like html attributes, but you can pass any JS value through them including objects, arrays, and functions.
// They act as arguments for the child components you invoke in JSX.

// You pass html attribute related props that have predefined types of values to markup JSX. ReactDOM conforms to HTML
// standard.
// And you pass custom props that can have any value you want to Componnet JSX.

// For components, props act as a function argument. All function take in a single props object as an argument.
// Generally you dont need the whole object, so you destructure it into its individual values.
// You can give props a default value to fall back on if the prop isnt passed from the parent. This is good to do if
// a component relies on a prop being passed to it.
function Avatar({url = ""}){
    return (
        <img
            className="avatar"
            src={url}
            alt=""
            width={100}
            height={100} />
    )
}

export default function Profiler(props){
    return (
        // When nesting a componnet in jSx you are essentially calling the component as a function under the hood.
        // All prop attributes are passed to the function call as arguments in a single object.

        // Sometimes you may need to pass all of a components props to a child component. instead of explicitly passing
        // each prop individually you can use spread syntax.
        <Avatar url="abc" {...props}/>
    )
}

// Its common to nest built in browser tags, such as wrapping an image in a div with a class card. You can do this with 
// componnets too using props.children.
// When you nest content in a Componnet the parent component recieves it in a prop called children.
function Card({children}){
    return (
        <div className="card">
            {children}
        </div>
    )
}

// You will often use the children prop for visual wrappers, panels, grids, etc.
function Profile(){
    return(
        <Card>
            <Avatar/>
        </Card>
    )
}

// Props can change over time, but they are immutable, they should not be changed in the componnet they live in themself.
// The component needs to ask its parent that is passing them in to pass a new props object.



// Make a utils.js file containing all the utility functions you use throughout your app. Remember keep things DRY and 
// abstracted.