import React, { FC } from 'react'
import { Interface } from 'readline'
import "./MyButton.scss"

interface myButtonProps{
	text:string
	state:boolean
	setState:()=>void;
}

const MyButton:FC<myButtonProps> = ({text,state, setState}) => {
	return(
		<div
		 className={!state ? 'MyButton' : 'MyButton active'}
		 onClick={setState}
		>
			<div className='MyButton__text'>{text}</div>
		</div>
)
}
export default MyButton