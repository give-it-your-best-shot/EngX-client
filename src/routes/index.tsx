import { Route, Routes } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login";

export default function Index() {
  return (
    <>
      <div>
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
      </div>
    </>
  );
}
