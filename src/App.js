import React, { useState } from 'react';
import Student from './Student';
import CreateStudent from './CreateStudent';
import {  Routes, Route, Link } from 'react-router-dom';
const App = () => {
  return (
      <>
          <Routes>
            <Route exact path="/" element={ <Student/> } />
            <Route exact path="/student/create" element={ <CreateStudent/> } />
            <Route exact path="/student/edit/:id" element={ <CreateStudent /> } />
          </Routes>
      </>
  );
};

export default App;
