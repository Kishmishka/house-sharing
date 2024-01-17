import  {FC, ReactNode} from 'react'
import "./Header.scss"
import {HandySvg} from 'handy-svg'
import logo from '../../image/logo.svg'



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