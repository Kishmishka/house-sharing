import React from 'react';

import './App.css';
import ClickButton from './Components/UI/CkickButton/ClickButton';
import Header from './Components/Header/Header';
import SortingMenu from './Components/SortingMenu/SortingMenu';
import MyButton from './Components/UI/HeaderButton/HeaderButton';
import Card from './Components/Card/Card';
import CardList from './Components/CardList/CardList';


function App() {
  return (
    <div className="App">
		<div className='fixed'>
			<Header/>
	  		<SortingMenu/>
			  
		</div>
     
		<CardList/>
	  
	  
    </div>
  );
}

export default App;
