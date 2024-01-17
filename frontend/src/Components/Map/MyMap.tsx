import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import React, { useEffect, useState,FC } from 'react'
import './MyMap.scss'
import logod from '../../image/logo.svg'
import { useHouseStore, useMapStore, useSwiperStore} from '../../store'

const MyMap = () => {
	const{mapWidth,mapHeight} = useMapStore();
	const {setActiveId} = useSwiperStore();
	const {houseList,setHouseActive} = useHouseStore();


	return(
		<div className='MyMap'>
			<div className='MyMap__ofers' >
				<div className='MyMap__ofers__ofers-title'>
					интерактивная Крта
					
				</div>
			</div>
			<div className='MyMap__map'>
				
			<YMaps>
				 <Map
				 	options={{
						minZoom:13,
						maxZoom:18,
						restrictMapArea:[[54.703186, 39.594216],[54.554948, 39.840356]],
						yandexMapDisablePoiInteractivity:true,
					}}
				 	width={mapWidth}
					height={mapHeight}
					zoomRange={12}
				  defaultState={{ center: [54.622846, 39.725489], zoom: 13 }}>
						{houseList.map((house)=>(
							<Placemark 
							
							key={house.key}
							onClick={()=>{
								setHouseActive(house.id);
								setActiveId(house.id);
							}}
							image={logod}
							defaultGeometry={house.coordinates}
							options={{ 
								iconColor: house.active ? '#19703C':'#25A659'
								}} />
						))}
						
					</Map> 
				 
				 
  			</YMaps>
			</div>
		</div>
)
}
export default MyMap