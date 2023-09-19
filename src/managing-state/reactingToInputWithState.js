// React provides a declarative way to manipulate the UI. Instead of manipulating individual elements of the UI directly
// you describe the different states your component can be in.

import { useState } from "react";

// With imperative UI you have to instruct the program what to do every step of the way. You have to write the exact 
// instructions manipulate the UI depending on what just happened.

// Imperative code is okay for small applications, but for larger ones, things become exponentially more complex and bug
// prone. React was created to solve this issue, making UI updates more declarative.

// In React you dont directly manipulate the UI, you declare what you want the UI to look like and React figures it out
// from there. You dont enable, disable, show, or hide components directly.

// There are five steps to thinking about UI declaratively.
// 1. Identify your components different visual states.
// 2. Determine what triggers those state changes
// 3. Represent the state in memory using useState.
// 4. Remove any non-essential state variables.
// 5. Connect event handlers to set the state.

// In computer science you have state machines that can be in different states, and designers mockup the different visual
// states of a UI. React as at the intersection between these two things, so both ideas are sources of inspo.

// First you must visualize all of the different states of the UI the user might see, for the form it may be this:
// Empty: form has a disabled submit button
// Typing: form has an enabled submit button
// Submitting: form is completely disable, spinner is showing
// Success: "Thankyou" message is shown instead of form
// Error: same as typing state, but with an added error message.

// Just like a designer you want to create mocks of the different states befoer adding the logic. Mocks let you iterate
// on the UI before worrying about hooking in the actual logic. You can use conditional styles and rendering on the mark
// up based on a prop, and change the value of the prop to test out each visual state.

 function Form({
    //empty, submitting, error, or success
    status = "empty"
}){
    if(status === "success"){
        return <h1>Thats right!</h1>
    }
    return(
        <>
            <h2>City quiz</h2>
            <p>In which city is there a billboard that turns air into drinkable water.</p>
            <form>
                <textarea disabled={
                    status === "submitting"
                }/>
                <br/>
                <button disabled={
                    status === 'empty' || 
                    status === "submitting"
                }>
                    Submit
                </button>
                {status === 'error' &&
                    <p className="Error">
                        Good guess but a wrong answer. Try again!
                    </p>
                }
            </form>

        </>
    )
}


// When you have alot of states to mock it can be useful to mock them all on one page.


let statuses = [
    'empty',
    'typing',
    'submitting',
    'success',
    'error',
  ];
  
  export default function FormApp() {
    return (
      <>
        {statuses.map(status => (
          <section key={status}>
            <h4>Form ({status}):</h4>
            <Form status={status} />
          </section>
        ))}
      </>
    );
  }



//   You can trigger state updates to two kinds of inputs 
// human inputs like clicking a button, typing in a field, navigating a link
// computer inputs like a network responsne arriving, a timeout completing, an image loading.

// In both cases you must set state variables to update the UI.

// forms require state for a mix of human and computer inputs
// changing the text input(human), switch from empty state to typing state or back depending on if the textbox is empty
// or not.
// clicking submit(human) should switch it submitting state
// successful network response(computer) should switch to success state
// network request error(computer) should switch it to error state.

// Human inputs generally require event handlers.

// Before implementing the logic of your states draw out the flow of the states for your component on paper.
// draw circles for the different states and arrows for the inputs with text describing the input and pointing to the
// state it changes to.



// The next step is to represent the visual states of your component in memory using useState. Each piece of state
// is a moving piece, and you want as few moving pieces as possible, more complexity leads to more bugs.

// Start with only the state that absolutely must be there. 
// For example you need to store the answer for the input, and the last error if it exists.
// const [answer, setAnswer] = useState('');
// const [error, setError] = useState(null);

// Then youll need a state representing which visual state youd like to display
// If you have a hard time finding the best way to represent that in memory, just make a state for each visual state
// you know youll need.
// const [isEmpty, setIsEmpty] = useState(true);
// const [isTyping, setIsTyping] = useState(false);
// const [isSubmitting, setIsSubmitting] = useState(false);
// const [isSuccess, setIsSuccess] = useState(false);
// const [isError, setIsError] = useState(false);




// The next step is to refactor and remove any non essential state.
// Spending time refactoring your state structure will make your components easier to understand, reduce duplication,
// and avoid unintended meanings.

// Your goal is to prevent the cases where the state in memory doesnt represent any valid UI that youd want a user to see
// For example you never want to show an error message and disable the input at the same time, or the user wont be able
// to correct the error.

// Here are some questiong you can ask about your states variables.
// Does the state cause a paradox? For example isTyping and isSubmitting shouldnt both be true, but its possible they
// could be if theyre both seperate, so they should be controlled by the same state. 
// A paradox usually means the state isnt constrained enough

// Is the same info available in another state already? For example you dont need a state for isEmpty, because you can
// just check the length of the answer state.

// Can you get the same info from the inverse of another state?

// Once youve refactored youll know the state left over is essential, because you cant remove it without breaking the UI

// To model state more precisely you can use a reducer, to fully eliminate any impossible states.


// The last step is to create the event handlers that update the state.
// Declarative code using state is much less fragile. 
// Expressing all interactions as state changes lets you later introduce new visual states without breaking existing ones
// It also lets you change what should be displayed in each state without changing the logic of the interaction itself.

function FinalForm() {
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('typing');
  
    if (status === 'success') {
      return <h1>That's right!</h1>
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
      setStatus('submitting');
      try {
        await submitForm(answer);
        setStatus('success');
      } catch (err) {
        setStatus('typing');
        setError(err);
      }
    }
  
    function handleTextareaChange(e) {
      setAnswer(e.target.value);
    }
  
    return (
      <>
        <h2>City quiz</h2>
        <p>
          In which city is there a billboard that turns air into drinkable water?
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={answer}
            onChange={handleTextareaChange}
            disabled={status === 'submitting'}
          />
          <br />
          <button disabled={
            answer.length === 0 ||
            status === 'submitting'
          }>
            Submit
          </button>
          {error !== null &&
            <p className="Error">
              {error.message}
            </p>
          }
        </form>
      </>
    );
  }
  
  function submitForm(answer) {
    // Pretend it's hitting the network.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let shouldError = answer.toLowerCase() !== 'lima'
        if (shouldError) {
          reject(new Error('Good guess but a wrong answer. Try again!'));
        } else {
          resolve();
        }
      }, 1500);
    });
  }
  