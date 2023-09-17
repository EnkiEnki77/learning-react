// Your componnets will often need to render different JSX depending on different conditions. You can use 
// if, &&, or ? : syntax for this.

// You can conditionally return JSX based on the value of a prop.
function Item({name, isPacked}){
    if (isPacked) {
        return <li className="item">{name} ✔</li>;
      }
    return <li className="item">{name}</li>;
}

// The above code is not DRY, the two return statements are very similar. You can instead return a single li,
// But conditionally render its content with a ternary.
// If conditional expressions get too nested and messy consider extracting into child componnets
// Use the del tag to strike out text.
function ItemTernary({name, isPacked}){
    
    return <li className="item">
                {isPacked ? <del>name ✔</del>: name}
           </li>
}

// If you want to conditionally return nothing based on a prop return null. In this case we return nothing if the item
// isPacked. You wont see this very often, its more common to conditionally include or not include a componnet in the 
// parent instead.
function ItemNoPacked({name, isPacked}){
    if (isPacked) {
        return null
      }
    return <li className="item">{name}</li>;
}

// A cleaner way to do the above is to use the &&. It allows you to conditionally render jsx if true or nothing if false
function ItemNoPackedClean({name, isPacked}){

    return !isPacked && <li className="item">{name}</li>;
}

// You can use it any time you want to conditionally render something or nothing.

function ItemAnd({name, isPacked}){
    
    return <li className="item">
                {name} {isPacked && ' ✔'}
           </li>
}

// Don't put numbers on the left side of && say you have a variable with 0 as its value, the expression will become 0 
// and thats what will be rendered. Convert it to an expression that returns a boolean such as var > 0.

// The last style is the most verbose but also the most flexible. 
// Assign a variable the default value youd like for your content, then embed that variable into your jsx. Use an if 
// statement to conditionally reassign the variable. You can assign the variable jsx even. To make it more readable
// use parens and put oit across multiple lines.
function ItemVerbose({name, isPacked}){
    let itemContent = name;
    if(isPacked){
        itemContent = (
            <del>
                {name + ' ✔'}
            </del>
        )
    }
    
    return <li className="item">
                {itemContent} 
           </li>
}

export default function PackingList(){
    return(
        <section>
            <h1>Sally Ride's packing list</h1>
            <ul>
                <Item 
                isPacked={true} 
                name="Space suit" 
                />
                <Item 
                isPacked={true} 
                name="Helmet with a golden leaf" 
                />
                <Item 
                isPacked={false} 
                name="Photo of Tam" 
                />
            </ul>
        </section>
    )
}