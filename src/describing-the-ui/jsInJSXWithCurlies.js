// JSX lets you write markup in a JS file, sometimes you want to add JS logic or reference a dynamic value in your 
// markup, you can use curlies to escape into JS. 

// For string attribute values you just pass a string to the attribute, to give the attribute a dynamic value, pass it
// curlies instead
let value = "";
<img src={value} alt=""/>

// Any JS expression (something that evaluates to a value), will work in curlies, including functions. JS statements 
// Such as if else cannot be used in JSX.

const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}