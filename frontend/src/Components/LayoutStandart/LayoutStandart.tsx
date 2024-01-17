import { Outlet } from 'react-router-dom'
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const LayoutStandart = () => {
	return(
		<>
			<Header>
			</Header>
			<Banner> 
				<div className='Banner__text'>
					Путь к светлому будущему
				</div>
			</Banner>
			<Outlet/>
			<Footer/>
		</>
)
}
export default LayoutStandart