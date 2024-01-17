import { useHouseClassStore } from '../../store'
import HeaderButton from '../UI/HeaderButton/HeaderButton'
import './ClassMenu.scss'

const ClassMenu = () => {
	const {houseClass,setHouseClass }= useHouseClassStore()
	return(
		<div className='ClassMenu'>
				<div className='ClassMenu__elem'>
					<HeaderButton text={"Все"} state={houseClass[0].value} setState={setHouseClass} className={houseClass[0].name}/>
				</div>
				<div className='ClassMenu__elem'>
					<HeaderButton text={"Высший класс"} state={houseClass[1].value} setState={setHouseClass} className={houseClass[1].name}/>
				</div>
				<div className='ClassMenu__elem'>
					<HeaderButton text={"Средний класс"} state={houseClass[2].value} setState={setHouseClass} className={houseClass[2].name}/>
				</div>
				<div className='ClassMenu__elem'>
					<HeaderButton text={"Низший класс"} state={houseClass[3].value} setState={setHouseClass}className={houseClass[3].name}/>
				</div>
				<div className='ClassMenu__elem'>
					<HeaderButton text={"Шалаш"} state={houseClass[4].value} setState={setHouseClass}className={houseClass[4].name}/>
				</div>
		</div>
)
}
export default ClassMenu