import React from 'react'
import MyButton from '../UI/MyButton/MyButton'
import "./Header.scss"
import {HandySvg} from 'handy-svg'
import logo from '../../image/logo.svg'
import { useStore } from '../../store'

const Header = () => {
	const {allHouses, revAllHouses} = useStore();
	const {topСlass, revTopСlass} = useStore();
	const {middleClass, revMiddleClass} = useStore();
	const {lowerClass, revLowerClass} = useStore();
	const {newHouses, revNewHouses} = useStore();
	

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
						<MyButton  text={"Все"} state={allHouses} setState={revAllHouses}/>
					</div>
					<div className='header__nav-elem'>
						<MyButton text={"Высший класс"} state={topСlass} setState={revTopСlass}/>
					</div>
					<div className='header__nav-elem'>
						<MyButton text={"Средний класс"} state={middleClass} setState={revMiddleClass}/>
					</div>
					<div className='header__nav-elem'>
						<MyButton text={"Низший класс"} state={lowerClass} setState={revLowerClass}/>
					</div>
					<div className='header__nav-elem'>
						<MyButton text={"Новые"} state={newHouses} setState={revNewHouses}/>
					</div>
			</div>
		</div>
	</div>
)
}
export default Header