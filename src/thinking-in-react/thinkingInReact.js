// STEP 1.

import { useState } from "react";

// The first step in creating a site with react is to look at the design and break it down into a component hierarchy
// draw boxes around each component and give them names.

// To decide whether something should be made into a component or not use the single responsibilit principle. Each component
// should have one responsibility. If it grows it should be broken down into sub components.

// If your API is well structured youll find it naturally maps to the component structure of your UI. Thats beacuse UI
// and data models often have the same information architecture (shape). Seperate your UI into components where each 
// component matches one piece of your data model.

// Once youve defined the components of your design draw them out into a hierarchy of parents and children.



// STEP 2.

// Once you have the component hierarchy laid out you should now build a static version of your app that has no interactivity

// You should build components that reuse other components and pass around the necessary data from your data model as props
// You should not use state as this is reserved for interactivity.

// You can choose to either take a top down approach to building the static site where you start from componnets highest
// in the hierarchy, or bottom up starting with the ones lowest. When building large apps its best to go bottom up.

// The component at the top of the hierarchy will take your data model in as a prop. This is called unidirectional data 
// flow because the data flows down from the top of the hierarchy down to the componnets at the bottom



// STEP 3.

// Find the minimal but complete representation of state.

// To make the UI interactive you must let users change the underlying data model using state. 

// State is the minimal set of changing data your app needs to remember. It needs to follow the DRY principle. Find
// the most minimal state necessary and compute everything else on demand. For example, if youre building a shopping
// list you can store the items in an array in state. If you need the number of items in the list, dont create a new state
// just read the length of the array.

// To figure out what should and shouldnt be state, first define all of the pieces of data in the app. User input, the 
// original data model, the filtered data model, etc. And ask yourself these three questions. Does it remain unchanged 
// over time? Is it passed in from a parent via props? Can you compute it based on existing state or props? If you answer
// yes to any of these questions it isnt state, otherwise it is.

// Taking the below app, we have four pieces of data, the original list of products, the search entry, the checkbox entry,
// and the filtered list of products.

// The list of products is not state, because it is passed in as props. 
// The searh entry is state, because its not passed as props, it changes over time, and it cant be computed from other state/props
// The checkbox is state for the same reason the search is.
// The filtered products is not state, because it can be computed from the list of products.

// There are two kinds of model data in React, props and state. Props are like arguments you pass to a function. They let
// a parent component pass data to a child component, and modify its appearance, for example a form can pass a color prop
// to a button.
// State is like a components memory. It lets a component keep track of some sort of info, and it change it based on 
// interactions. For example a button might keep track of isHovered state.
// Props and state are different, but work together, for example a parent may keep some data in state, so it can change it.
// And pass it down to a child component as props.



// STEP 4.

// After identifying your apps minimal state, you need to determine which components should own each state.
// Identify every component that renders something based on the state.
// Find the closest common parent of all of those components
// Decide where the state should live
    // Often you can put the state directly in the common parent
    // You can also put the state into any component above the common parent
    // If you cant find a comopnnet that it makes sense to place the state, create a component specifically for that 
    // state and place it somewhere above the common parent.

// The two pieces of state are search entry and checkbox entry, the components that require access to this state are 
// SearchBar, so it can display the values, and productTable so it can filter the data model based on them.

// The common parent is FilterableProductTable

// Both state should be placed in the above component.



// STEP 5.

// In order to change state based on user input you need to enable inverse data flow through event handlers that are passed
// down as props along with the state. 

// Only the component that owns the state can call the setter function that updates it, so you need to pass down a function
// as props that calls the setter function. If you pass this prop function to an event such as onChange the setter function
// will then be called whenever a change happens.

// DATA MODEL
const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
  ];

export default function MyApp(){
    return <FilterableProductTable products={PRODUCTS}/>
}

function FilterableProductTable({products}){
    const [checkInput, setCheckInput] = useState(false)
    const [searchInput, setSearchInput] = useState("")

    function handleStockOnlyChange(){
        setCheckInput(!checkInput)
    }

    function handleFilterTextChange(e){
        let value = e.target.value
        setSearchInput(value)
    }

    return(
        <div>
            <SearchBar 
                checkInput={checkInput} 
                searchInput={searchInput}
                onStockOnlyChange={handleStockOnlyChange}
                onFilterTextChange={handleFilterTextChange} />
            <ProductTable 
                products={products} 
                checkInput={checkInput} 
                searchInput={searchInput} />
        </div>
    )
}

function SearchBar({checkInput, searchInput, onStockOnlyChange, onFilterTextChange}){
    return (
        <form>
            <input onChange={e => onFilterTextChange(e)}  value={searchInput} type="text" placeholder="search..."/>
            <label>
                <input onChange={onStockOnlyChange} checked={checkInput} type="checkbox"/>
             
                Only show products in stock
            </label>
        </form>
    )
}

function ProductTable({ products, searchInput, checkInput }) {
    const rows = [];
    let lastCategory = null;
  
    products.forEach((product) => {
      if(product.name.toLowerCase().indexOf(
        searchInput.toLowerCase()
      ) === -1){
        return;
      }
      if(checkInput && !product.stocked){
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });
  
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }



function ProductCategoryRow({category}){
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    )
}

function ProductRow({product}){
    const name = product.stocked ? product.name :
        <span style={{color: "red"}}>
            {product.name}
        </span>

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}