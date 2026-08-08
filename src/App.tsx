import { useContext } from "react";
import Logo from "./assets/images/logo-full.svg";

import Form from "./components/Form/Form";
import { UserContext } from "./context/UserContext/UserContext";
import Success from "./components/Success/Success";

const App = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Please provide context!");

  const { users } = context;

  return (
    <>
      <header aria-labelledby="main-title">
        <img src={Logo} alt="Coding Conf Logo" />
      </header>
      <main>
        <section className="intro" aria-labelledby="title">
          {users && users.length === 0 ? (
            <div>
              <h2 id="title">Your Journey to Coding Conf 2025 Starts Here!</h2>
              <p>Secure your spot at next year’s biggest coding conference.</p>
            </div>
          ) : (
            users.map((user, index) => (
              <div key={index}>
                <h2>
                  Congrats, <span id="name">{user.fullName}</span>! Your ticket
                  is ready.
                </h2>
                <p>
                  We've emailed your ticket to{" "}
                  <span id="email">{user.email}</span> and will send updates in
                  the run up to the event.
                </p>
              </div>
            ))
          )}
        </section>
        {users && users.length === 0 ? <Form /> : <Success />}
      </main>
    </>
  );
};
export default App;
