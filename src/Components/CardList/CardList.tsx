import React from 'react'
import { useHouseStore } from '../../store'
import Card from '../Card/Card';
import './CardList.scss'

const CardList = () => {
	const {houseList} = useHouseStore();

	return(
		<div className='CardList'>
			<div className='container'>
				<div className='CardList__container'>
					<div className='CardList__ofers' >
						<div className='CardList__ofers-title'>
							предложений:
						</div>
						<div className='CardList__ofers-count'>
							{houseList.length}
						</div>
					</div>
					<div className='CardList__list'>
						{houseList.map((house)=>(<Card
						photoName={house.photoName} 
	 					address={house.address} 
	  					countParking={house.countParking} 
	  					price={house.price} 
	  					place={house.place}/>))}
					</div>
				</div>
			</div>
		</div>
)
}
export default CardList