import React, { FC } from 'react'
import { useStore } from '../../store';
import './ClickButton.scss'

interface ClickButtonProps{
	text:string
	state:boolean
	setState:()=>void;
}

const ClickButton:FC<ClickButtonProps> = ({text,state, setState}) => {
	
	return(
		<div
		 className={!state ? 'ClickButton' : 'ClickButton active'}
		 onClick={setState}
		>
			<div className='ClickButton__text'>{text}</div>
			<div className= {!state ? 'ClickButton__figure' : 'ClickButton__figure active'}></div>
		</div>
)
}
export default ClickButton