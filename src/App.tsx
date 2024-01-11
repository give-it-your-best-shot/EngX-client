import React from "react";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Signup/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                titleInput1="Username"
                titleInput2="Password"
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                titleInput1="Username"
                titleInput2="Password"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
