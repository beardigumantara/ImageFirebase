import React from 'react';
import './App.css';
import FormAdd from './components/formAdd';
import Portofolio from './components/portofolio';

function App() {
  return (
    <div className="App">
      <div className="Container">
        <Portofolio />
        <FormAdd />
      </div>
    </div>
  );
}

export default App;
