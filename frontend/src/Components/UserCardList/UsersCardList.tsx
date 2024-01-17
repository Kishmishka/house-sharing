import { Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRentedHousesStore } from '../../store'
import UserCard from '../UserCard/UserCard'
import './UserCardList.scss'

const UserCardList = () => {
	const {rentedHouseList} = useRentedHousesStore()
	return(
		<div className='UserCardList'> 
			<div className='container'>
				<div className='CardList__container'>
					<div className='CardList__ofers' >
						<div className='CardList__ofers-title'>
							история сделок
						</div>
					</div>
					<div className='CardList__list'>
					<Swiper
      			modules={[Mousewheel]} 
				   height={420}
				   slidesPerView={1}
					touchMoveStopPropagation={false}
					simulateTouch={false}
					mousewheel={true}
					onSwiper={()=>{}}
					direction={'vertical'}>
							{rentedHouseList.map((house)=>(
							<SwiperSlide key={house.key} >
								<UserCard 
								id={house.id}
								active={house.active}
								photoName={house.photoName}
								address={house.address} 
								countParking={house.countParking}
								place={house.place}
								endDate={house.endDate}
								rented={house.rented} 
								description = {house.description}
								startDate={house.startDate}
								price={house.price} />
							 </SwiperSlide>	
						))}
  				  </Swiper>
					</div>
				</div>
			</div>
		</div>
)
}
export default UserCardList