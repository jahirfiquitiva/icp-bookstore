import { type FormEventHandler, useState } from 'react';
import { library_app_backend } from '@/backend';

function App() {
  const [greeting, setGreeting] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // @ts-expect-error idk
    const name = event.target.elements.name.value;
    // @ts-expect-error idk
    library_app_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    // return false;
  };

  return (
    <main>
      <img src='/logo2.svg' alt='DFINITY logo' />
      <br />
      <br />
      <form action='#' onSubmit={handleSubmit}>
        <label htmlFor='name'>Enter your name: &nbsp;</label>
        <input id='name' alt='Name' type='text' />
        <button type='submit'>Click Me!</button>
      </form>
      <section id='greeting'>{greeting}</section>
    </main>
  );
}

export default App;
