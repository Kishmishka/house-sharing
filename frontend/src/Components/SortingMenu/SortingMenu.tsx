import { useHousePlaceStore, useHouseStore } from '../../store'
import ClickButton from '../UI/CkickButton/ClickButton'
import './SortingMenu.scss'

const SortingMenu = () => {
	
	const {housePlace,priceSort,setHousePlace,swapMinMax} = useHousePlaceStore()
	
	return(
		<div className='SortingMenu'>
			<div className='container'>
				<div className='SortingMenu__content'>
				<div className='SortingMenu__sort'>
					<div className='SortingMenu__title'>Цена:</div>
					<ClickButton text={"низк.-выс."}  state={priceSort[0].value} namePlace={priceSort[0].name} setState={swapMinMax}/>
					<div className='SortingMenu__separator'></div>
					<ClickButton text={"выс.-низк."}  state={priceSort[1].value} namePlace={priceSort[1].name} setState={swapMinMax} />
				</div>
				<div className='SortingMenu__place'>
					<div className='SortingMenu__title'>Место:</div>
					<ClickButton text={"центр"} state={housePlace[0].value} setState={setHousePlace} namePlace={housePlace[0].name}/>
					<div className='SortingMenu__separator'></div>
					<ClickButton text={"Московский"} state={housePlace[1].value} setState={setHousePlace} namePlace={housePlace[1].name}/>
					<div className='SortingMenu__separator'></div>
					<ClickButton text={"Железнодорожный"} state={housePlace[2].value} setState={setHousePlace} namePlace={housePlace[2].name}/>
					<div className='SortingMenu__separator'></div>
					<ClickButton text={"Октябрьский"} state={housePlace[3].value} setState={setHousePlace} namePlace={housePlace[3].name}/>
					<div className='SortingMenu__separator'></div>
					<ClickButton text={"Советский"} state={housePlace[4].value} setState={setHousePlace} namePlace={housePlace[4].name}/>
				</div>
				</div>
			</div>
		</div>
)
}
export default SortingMenu