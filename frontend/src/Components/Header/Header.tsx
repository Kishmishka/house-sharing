import React from 'react'
import MyButton from '../UI/HeaderButton/HeaderButton'
import "./Header.scss"
import {HandySvg} from 'handy-svg'
import logo from '../../image/logo.svg'
import { useHouseClassStore,  } from '../../store'
import HeaderButton from '../UI/HeaderButton/HeaderButton'

const Header = () => {
	const {houseClass,setHouseClass }= useHouseClassStore()
	
	

	return(
		<div className='header'>
			<div className='container'>
			<HandySvg
			src={logo}
			className="icon"
			width="332"
			height="332"
			/>

			
				<div className='header__nav'>
					<div className='header__nav-elem'>
						<HeaderButton text={"Все"} state={houseClass[0].value} setState={setHouseClass} className={houseClass[0].name}/>
					</div>
					<div className='header__nav-elem'>
						<HeaderButton text={"Высший класс"} state={houseClass[1].value} setState={setHouseClass} className={houseClass[1].name}/>
					</div>
					<div className='header__nav-elem'>
						<HeaderButton text={"Средний класс"} state={houseClass[2].value} setState={setHouseClass} className={houseClass[2].name}/>
					</div>
					<div className='header__nav-elem'>
						<HeaderButton text={"Низший класс"} state={houseClass[3].value} setState={setHouseClass}className={houseClass[3].name}/>
					</div>
					<div className='header__nav-elem'>
						<HeaderButton text={"Новые"} state={houseClass[4].value} setState={setHouseClass}className={houseClass[4].name}/>
					</div>
			</div>
		</div>
	</div>
)
}
export default Header