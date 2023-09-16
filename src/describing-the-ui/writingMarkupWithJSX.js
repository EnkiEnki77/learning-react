// JSX is a syntax extension of JS that allows you to write markup in your JS. 

// For many years devs kept content in HTML, design in CSS, and logic in JS. Now that the web is more interactive JS has 
// started to determine content more and more. This is why rendering logic and markup live in the same place in React,
// components.

// Keeping an elements rendering logic and markup together ensures they stay in sync on every edit. Converseley things
// that are unrelated such as a sidebar and buttons markup are kept seperate making it safer to make changes to either

// Each react component is a JS function that may contain markup that is rendered to the browser. React components use
// a JS syntax extension to represent that markup called JSX. It looks similar to HTML, but is more strict and can display
// dynamic content.


// The rules of JSX are:

// You must only return a single JSX element from a component. If you have multiple it must be wrapped in a parent div or
// a fragment, fragments are empty tags that leave no trace in the markup.

// The reason you can only return one JSX tag from a component is under the hood JSX is an object. You cant return two 
// objects from a function without wrapping them in an array, so you cant return two JSX tags without wrapping them in a 
// parent.

// You must close all tags, so <img> becomes <img/>

// You must camelCase all attributes, because it is really JS. ALl attributes become object keys, and cannot have - or be
// reserved words such as class, thats why you have to use className instead.

