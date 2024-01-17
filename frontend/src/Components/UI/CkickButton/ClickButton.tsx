import { FC } from 'react'
import './ClickButton.scss'

interface ClickButtonProps{
	text:string
	state:boolean
	namePlace:String
	setState:(name:String)=>void;
}

const ClickButton:FC<ClickButtonProps> = ({text, state, setState, namePlace}) => {
	
	return(
		<div
		 className={!state ? 'ClickButton' : 'ClickButton active'}
		 onClick={()=>{setState(namePlace)}}
		>
			<div className='ClickButton__text'>{text}</div>
			<div className= {!state ? 'ClickButton__figure' : 'ClickButton__figure active'}></div>
		</div>
)
}
export default ClickButton