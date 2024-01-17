import {useRef, useMemo, FC, ReactNode, useEffect} from 'react'
import { useHouseStore, useSwiperStore} from '../../store'
import {  Swiper,  SwiperRef,  SwiperSlide} from 'swiper/react';
import {  A11y, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import Card from '../Card/Card';
import './CardList.scss'


const CardList = () => {
	const {houseList} = useHouseStore();
	const {activeId} = useSwiperStore();
	const changeCounter = useRef(false);
	const localRef = useRef<SwiperRef>(null);

	

	useMemo(()=>{
		if(changeCounter.current){
			localRef.current?.swiper.slideTo(activeId-1)
		}
		changeCounter.current = true;
	},[activeId])

	

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
					<Swiper
					ref={localRef}
      			modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]} 
					slideToClickedSlide={true}
				   height={410}
					spaceBetween={10}
					touchMoveStopPropagation={false}
					mousewheel={true}
					onSwiper={()=>{}}
					direction={'vertical'}>
							{houseList.map((house)=>(
							<SwiperSlide key={house.key} >
								<Card
								id={house.id}
								active={house.active}
								photoName={house.photoName} 
	 							address={house.address} 
	  							countParking={house.countParking} 
								price = {house.price}
	  							place={house.place}/>
							 </SwiperSlide>	
						))}
  				  </Swiper>
					</div>
				</div>
			</div>
		</div>
)
}
export default CardList