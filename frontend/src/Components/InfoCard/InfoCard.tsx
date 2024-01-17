import { HandySvg } from 'handy-svg'
import React, { FC } from 'react'
import car from '../../image/icons/car.svg'
import house from '../../image/houses/house.png'
import './InfoCard.scss'
import { useHouseStore} from '../../store'

interface CardProps{
	photoName:String;
	address:String;
	countParking:Number;
	price:Number;
	place:String;
	id:number
}

const InfoCard:FC<CardProps> = ({photoName, id, address, countParking, price, place}) => {
	
	const {setHouseActive} = useHouseStore();
	return(
		<div className='Card'
		onClick={() => setHouseActive(id)}
		>
			<div className={'Card__content content'} tabIndex={1}>
				<img src={house} className='content__foto'/>
				<div className='content__params'>
				<div className='content__params-address'>{address}</div>
				<div className='content__params-parking parking'>
					<div className='parking__count'>{String(countParking)}</div>
					<HandySvg
						 src={car}
						 className="parking__icon"
						 width="32"
						 height="32"
					/>
				</div>
				</div>
				<div className='content__buy buy'>
					<div className='buy__price'>
						{"$"+String(price)+"/день"}
					</div>
					<div className='buy__button'>
						арендовать
					</div>
				</div>
				<div className='content__place'>{place}</div>
			</div>
		</div>
)
}
export default InfoCard