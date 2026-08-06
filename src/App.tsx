import Logo from "./assets/images/logo-full.svg";

import Form from "./components/Form/Form";

const App = () => {
  return (
    <>
      <header aria-labelledby="main-title">
        <img src={Logo} alt="Coding Conf Logo" />
      </header>
      <main>
        <section className="intro" aria-labelledby="title">
          <h2 id="title">Your Journey to Coding Conf 2025 Starts Here!</h2>
          <p>Secure your spot at next year’s biggest coding conference.</p>
        </section>
        <Form />
      </main>
    </>
  );
};
export default App;
