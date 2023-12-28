import React, { useEffect, useRef } from 'react'
import Account from '../../Components/AccountLink/AccountLink'
import Balance from '../../Components/Balance/Balance'
import Banner from '../../Components/Banner/Banner'
import CardList from '../../Components/CardList/CardList'
import ClassMenu from '../../Components/ClassMenu/ClassMenu'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import MyMap from '../../Components/Map/MyMap'
import SortingMenu from '../../Components/SortingMenu/SortingMenu'
import { useMapStore } from '../../store'
import './HomePage.scss'
const HomePage = () => {
	const container = useRef<HTMLDivElement>(null)
	const{setMapWidth, setMapHeight} = useMapStore();


	function handleResize(){
		if(container.current?.offsetWidth != undefined){
			setMapWidth(container.current?.offsetWidth)
			setMapHeight(window.innerHeight)
		}
			
	}
	useEffect(() => {
		window.addEventListener('resize',handleResize);
		handleResize()
		return () => {
			window.removeEventListener('resize', handleResize);
		 };
  }, [container.current?.offsetWidth]);
	return(
		<div className='homePage'>
			
			<Header>
				<ClassMenu/>
			</Header>
			<Banner> 
				<SortingMenu/>
			</Banner>
			<Balance/> 
			 <Account/>
			<div className='container' ref={container}>
				<div className='homePage__content'>
					<CardList/>
					<MyMap/>
				</div>
			</div>
			<Footer/>
		</div>
)
}
export default HomePage