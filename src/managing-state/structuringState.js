// Structuring state well can make the difference between a component that is easy to maintain and one prone to bugs.

// Some principles to follow for well structured state
// 1. Group related state: if you find yourself updating the same state together often consider merging them into a single
// state.
// const [position, setPosition] = useState({ x: 0, y: 0 });
// Another situation you may group data into an array or object is when you dont know how many pieces of state youll need
// like a form where users can add custom inputs.

// 2. Avoid contradictions: avoid structuring the state in a way where two or more states can "disagree".

// 3. Avoid redundant state: If you can calculate some info from a components props or existing state it doesnt need to be
// a new state

// 4. Avoid duplication: When the same data is duplicated between multiple states or nested objects it makes things hard to
// keep in sync.

// 5. Avoid deeply nested state: prefer to structure flat state, nested state is less convenient to update.

// The goal of these principles is to make state easy to update and less prone to mistakes.

