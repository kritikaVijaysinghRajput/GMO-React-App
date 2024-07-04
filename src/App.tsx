import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page1 from "./page/Page1";
import Page2 from "./page/Page2";
import ProtectedRoute from "./middleware";
import { UserProvider } from "./context/userContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/second-page" element={<Page2 />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
