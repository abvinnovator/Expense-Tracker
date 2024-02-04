import React from "react";
import { Auth } from "./pages/auth";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ExpenseTracker } from "./pages/auth/expense-tracker";
function App() {
  return (
   <>
 <Router>
  <Routes>
    <Route path='/' exact element={<Auth />} />
    <Route path='/expense-tracker' exact element={<ExpenseTracker />} />
  </Routes>
 </Router>
   </>
  );
}

export default App;
