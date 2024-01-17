import React from 'react'
import Banner from '../../Components/Banner/Banner'
import Card from '../../Components/Card/Card'
import Header from '../../Components/Header/Header'
import {useParams} from 'react-router-dom'
import './HousePage.scss'
import { useHousePageStore, useHouseStore, useUserStore } from '../../store'
import InfoCard from '../../Components/InfoCard/InfoCard'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import useRentHouse from '../../Hooks/useRentHouse'


const HousePage = () => {
	const params = useParams();
	const {getHouseById} = useHouseStore()
	const {dayCount,setDayCount} = useHousePageStore()
	const house = getHouseById(Number(params.id));
	const {user} = useUserStore()
	const  rentHouse = useRentHouse()
	const handleChange = (event:any) => {
		setDayCount(event.target.value);
	 }

	return(
		<div className='HousePage'>
			<Header>
				
			</Header>
			<Banner> 
				<div className='Banner__text'>
					Наш дом - ваш дом
				</div>
			</Banner>
			<div className='container'>
				<div className='HousePage__menu menu'>
					<div className='menu__houseInfo'>
						{house.houseClass} \ {house.place}
					</div>
					<Link onClick={()=>{setDayCount(0)}} className='menu__button' to='/'>
						список домов
					</Link>
				</div>
				<div className='HousePage__content houseContent'>
					
						<InfoCard
							id={house.id}
							photoName={house.photoName} 
	 						address={house.address} 
	  						countParking={house.countParking} 
	  						price={house.price} 
	  						place={house.place}/>
				
					<div className='houseContent__info'> 
						<div className='houseContent__title'>
							{house.address}
						</div>
						<div className='houseContent__text'>
							<p>
								{house.description}
							</p>
						</div>
						<div className='houseContent__rent rent'>
						<input 
							value={dayCount===0 ? "":dayCount}
							onChange={handleChange}
							className='rent__dayCount rent-element' 
							type="text" 
							name="login" 
							placeholder='кол-во дней' />
							
							<div className='rent__button rent-element'
							onClick={()=>{rentHouse(house.id,user?.id,String(dayCount),String(house.price*dayCount))}}
							>Арендовать</div>
							<div className='rent__price rent-element'>
								$ {String(house.price*dayCount)}
							</div>
							
						</div>
					</div>
				</div> 
			</div>
			<Footer/>
		</div>
)
}
export default HousePage