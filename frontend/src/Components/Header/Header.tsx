import React, { Children, FC, ReactNode, ReactPortal, } from 'react'
import MyButton from '../UI/HeaderButton/HeaderButton'
import "./Header.scss"
import {HandySvg} from 'handy-svg'
import logo from '../../image/logo.svg'
import { useHouseClassStore,  } from '../../store'
import HeaderButton from '../UI/HeaderButton/HeaderButton'
import Baner from '../Banner/Banner'
import SortingMenu from '../SortingMenu/SortingMenu'
import Account from '../AccountLink/AccountLink'
import Balance from '../Balance/Balance'


interface HeaderProps{
	children: ReactNode;
}

const Header:FC<HeaderProps> = ({children}) => {
	return(
		<header className='header'>
					<HandySvg
					src={logo}
					className="icon"
					width="250"
					height="200"
				/>
			<div className='container'>	
				
			{children}	
			
			</div>
	</header>
)
}
export default Header