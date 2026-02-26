import React from "react";
import {Route, Routes} from 'react-router-dom'
import Home from "./pages/Home";
import Auth from "./pages/Auth"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      {/* <Route path='/interview' element={<InterviewPage/>}/>
      <Route path='/history' element={<InterviewHistory/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/report/:id' element={<InterviewReport/>}/> */}



    </Routes>
  );
}

export default App;