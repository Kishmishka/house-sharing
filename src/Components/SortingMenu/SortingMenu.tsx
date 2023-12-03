import React from 'react'
import { useStore } from '../../store'
import ClickButton from '../CkickButton/ClickButton'
import './SortingMenu.scss'

const SortingMenu = () => {
	const {btnClickCenter, revBtnClickCenter} = useStore()
	const {btnClickEast, revBtnClickEast} = useStore()
	const {btnClickWest, revBtnClickWest} = useStore()
	const {btnClickNorth, revBtnClickNorth} = useStore()
	const {btnClickSouth, revBtnClickSouth} = useStore()
	const {btnClickBlane, revBtnClickBlane} = useStore()
	const {minMax, swapMinMax} = useStore()
	const {maxMin, swapMaxMin} = useStore()
	return(
		<div className='SortingMenu'>
			<div className='container'>
				<div className='SortingMenu__content'>
				<div className='SortingMenu__sort'>
					<div className='SortingMenu__title'>Цена:</div>
					<ClickButton text={"низк.-выс."} state={minMax} setState={swapMinMax}/>
					<div className='SortingMenu__separator'></div>
					<ClickButton text={"выс.-низк."}  state={maxMin} setState={swapMaxMin} />
				</div>
				<div className='SortingMenu__place'>
					<div className='SortingMenu__title'>Место:</div>
					<ClickButton text={"центр"} state={btnClickCenter} setState={revBtnClickCenter}/>
					<div className='SortingMenu__separator'></div>
					<ClickButton text={"Восточний л-с"} state={btnClickEast} setState={revBtnClickEast} />
					<div className='SortingMenu__separator'></div>
					<ClickButton text={"Западный л-с"} state={btnClickWest} setState={revBtnClickWest}/>
					<div className='SortingMenu__separator'></div>
					<ClickButton text={"Северный л-с"} state={btnClickNorth} setState={revBtnClickNorth}/>
					<div className='SortingMenu__separator'></div>
					<ClickButton text={"Южный л-с"} state={btnClickSouth} setState={revBtnClickSouth}/>
					<div className='SortingMenu__separator'></div>
					<ClickButton text={"округ блэйн"}state={btnClickBlane} setState={revBtnClickBlane} />
				</div>
				</div>
			</div>
		</div>
)
}
export default SortingMenu