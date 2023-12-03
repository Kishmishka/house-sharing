import React from 'react';

import './App.css';
import ClickButton from './Components/CkickButton/ClickButton';
import Header from './Components/Header/Header';
import SortingMenu from './Components/SortingMenu/SortingMenu';
import MyButton from './Components/UI/MyButton/MyButton';

function App() {
  return (
    <div className="App">
     <Header/>
	  <SortingMenu/>
    </div>
  );
}

export default App;
