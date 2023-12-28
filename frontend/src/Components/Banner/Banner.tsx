import React, { FC, ReactNode } from 'react'
import './Banner.scss'

interface BannerProps{
	children: ReactNode;
}
const Banner:FC<BannerProps> = ({children}) => {
	return(
		<div className='Banner'>
			{children}
		</div>
)
}
export default Banner