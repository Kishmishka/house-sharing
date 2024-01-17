import { HandySvg } from 'handy-svg'
import  {FC} from 'react'
import car from '../../image/icons/car.svg'
import house from '../../image/houses/house.png'
import './Card.scss'
import { useHouseStore} from '../../store'
import { Link } from 'react-router-dom'

interface CardProps{
	photoName:String;
	address:String;
	countParking:Number;
	price:Number;
	place:String;
	active:boolean;
	id:number
}

const Card:FC<CardProps> = ({photoName,price, id, active,address, countParking, place}) => {
	
	const {setHouseActive} = useHouseStore();
	return(
		<div className='Card'
		onClick={() => setHouseActive(id)}
		>
			<div className={!active ?'Card__content content' : 'Card__content content active'} tabIndex={1}>
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
					<Link className='buy__button' to={`house/${id}`} >
						арендовать
					</Link>
				</div>
				<div className='content__place'>{place}</div>
			</div>
		</div>
)
}
export default Card