import { FC } from 'react'

import "./HeaderButton.scss"

interface HeaderButtonProps{
	text:string
	state:boolean
	className:String
	setState:(name:String)=>void;
}

const HeaderButton:FC<HeaderButtonProps> = ({text,state, setState, className }) => {
	return(
		<div
		 className={!state ? 'MyButton' : 'MyButton active'}
		  onClick={()=>{setState(className)}}
		>
			<div className='MyButton__text'>{text}</div>
		</div>
)
}
export default HeaderButton