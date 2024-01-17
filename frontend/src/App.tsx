import './App.css';
import Header from './Components/Header/Header';
import SortingMenu from './Components/SortingMenu/SortingMenu';
import CardList from './Components/CardList/CardList';
import MyMap from './Components/Map/MyMap';
import  { useRef,useEffect,useState} from 'react'
import { useMapStore } from './store';
import {Routes, Route, Link} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage';
import ClassMenu from './Components/ClassMenu/ClassMenu';
import Banner from './Components/Banner/Banner';
import HousePage from './Pages/HousePage/HosePage';
import AuthPage from './Pages/AuthPage/AuthPage';
import LayoutStandart from './Components/LayoutStandart/LayoutStandart';
import RegPage from './Pages/RegPage/RegPage';
import UserPage from './Pages/UserPage/UserPage';
import RequireAuth from './Components/hoc/RequireAuth';


function App() {
	

  return ( 
    <div className="App">
			{/* <Header>
				<ClassMenu/>
			</Header>
			<Banner> 
				<SortingMenu/>
			</Banner>	 */}
	  		{/* <SortingMenu/>   */}
			
	
			<Routes>
				<Route path='/' element={
					<RequireAuth>
						<HomePage/>
					</RequireAuth>
				}/>
				<Route path='/auth' element={<AuthPage/>}/>
				<Route path='/registration' element={<RegPage/>}/>
				<Route path='/house/:id' element={<HousePage/>}/>
				<Route path='/user/:id' element={<UserPage/>}/>
			</Routes>
		
		  {/* <Footer/>   */}
    </div>
  );
}


export default App;
