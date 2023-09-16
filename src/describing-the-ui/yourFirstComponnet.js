// React allows you to combine your markup, css, and JS into custom component, reusable UI elements. 

// Creating components allows you to reuse UI elements across your app without having to rewrite the code every time.

// React components are JS functions you can sprinkle with markup. Their names must start with a capital letter though.

// Componnets return markup very similar to HTML, but it is JS under the hood, it is called JSX (JS in XML)

// You return your markup from the component. If it is not all on the same line as the return it must be wrapped in parens.


function Profile(){
    return(
        <div>
            <p>Im a component</p>
        </div>
    )
}

// In JSX lowercase tags are recognized as markup, uppercase as components. You can use components within other components
// as JSX. Each instance of a componnet is a seperate call to that component, so it retains its own memory (state). Similar
// to if you called the same function multiple times, each invocation of the function would have its own local memory.

// Your react app begins at a root component it is generally rendered in the index.js file and is called App. It is at the
// top of the component hierarchy always.

// Most react apps use components all the way down and render a single root element into an empty HTML file that lets 
// React take over.
// Some may use React components only for interactive elements and have multiple root elements.

export default function Gallery(){
    <div>
        <Profile/>
        <Profile/>
    </div>
}