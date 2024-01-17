import  { FC } from 'react'
import './UserCard.scss'
import car from '../../image/icons/car.svg'
import { HandySvg } from 'handy-svg';
import house from '../../image/houses/house.png'
import { useRentedHousesStore } from '../../store';
import cross from '../../image/icons/cross.svg'

interface UserCardProps{
	photoName:String;
	address:String;
	countParking:Number;
	endDate :Date;
	place:String;
	id:Number;
	active:boolean,
	rented:boolean,
	description:boolean,
	startDate:Date,
	price:number;
}

const UserCard:FC<UserCardProps> = ({photoName,rented,startDate, price,description,address,active,countParking,endDate,place,id}) => {

	const {setRentHouseActive, setRentHouseDescription,setExtensionPeriod,extensionPeriod} = useRentedHousesStore()

	const handleChange = (event:any) => {
		setExtensionPeriod(event.target.value);
	 }
	return(
		<div className={rented ?'UserCard' : 'UserCard rented'}  onClick={() => setRentHouseActive(id)}>
			<div className={description ? "UserCard__front hide" : "UserCard__front" }>
			<div className={!active ?'Card__content content' : 'Card__content content active'}>
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
					<div className='buy__price userCard'>
						
						{"Арендовано до: "
						+endDate.getDate()
						+"/"+endDate.getMonth()
						+"/"+endDate.getFullYear()}
					</div>
					<div className='buy__button' onClick={() => setRentHouseDescription(id)} >
						подробнее
					</div>
				</div>
				<div className='content__place'>{place}</div>
			</div>
			</div>
			<div className={description ? "UserCard__back hide" : "UserCard__back" }>
				<div className="back__content">
					<div className="back__content-title">
						подробности сделки
					</div>
					<div 
					onClick={() => setRentHouseDescription(id)}
					className="back__icon">
						<HandySvg
						src={cross}
						className="back__content__icon"
						width="30"
						height="30"
						fill="#116B37"
						/>
					</div>
					
				
					
					<div className="back__content-info">
						<div className="back__content-info-item">
							 {"Начало аренды: "+startDate.getDate()
						+"/"+startDate.getMonth()
						+"/"+startDate.getFullYear()}
						</div>
						<div className="back__content-info-item">
						{"Окончание аренды: "
						+endDate.getDate()
						+"/"+endDate.getMonth()
						+"/"+endDate.getFullYear()}
						</div>
						<div className="back__content-info-item">
							Срок аренды: 21 день
						</div>
						<div className="back__content-info-item">
							Стоимость аренды: 21000$
						</div>
					</div>
					<div className="back__menu">
						
						<div className="back__menu-price">{extensionPeriod*price+"$"}</div>
						<input 
							value={extensionPeriod}
							onChange={handleChange}
							className='back__menu-CountDay' 
							type="text" 
							name="login" 
							placeholder='кол-во дней' />
						<div className="back__menu-button">
							продлить
						</div>
					</div>
				</div>
			</div>
		</div>
)
}
export default UserCard