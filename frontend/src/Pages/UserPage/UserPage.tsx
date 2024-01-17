import React from 'react'
import Banner from '../../Components/Banner/Banner'

import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import UserCardList from '../../Components/UserCardList/UsersCardList'
import UserInfo from '../../Components/UserInfo/UserInfo'

import './UserPage.scss'

const UserPage = () => {
	
	return(
		<div className='UserPage'>
			<Header>
			</Header>
			<Banner> 
				<div className='Banner__text'>
					Наш дом - ваш дом
				</div>
			</Banner>
			<div className="container">
				<div className="UserPage__content">
					<UserCardList/>
					<UserInfo/>
				</div>
			</div>
			
			
			<Footer/>
		</div>
)
}
export default UserPage