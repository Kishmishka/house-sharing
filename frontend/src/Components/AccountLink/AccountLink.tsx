import React from 'react'
import './AccountLink.scss'
import avatar from '../../image/avatar.png'
import { Link } from 'react-router-dom'
import { useUserStore } from '../../store'
const AccountLink = () => {
	const {user} = useUserStore()
	return(
		<div className='Account'>
			<Link className="Account__avatar" to={`user/${user?.id}`}>
				<img src={avatar} alt="" />
			</Link>
		</div>
		
)
}
export default AccountLink