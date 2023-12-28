import { Key } from 'react';
import create from 'zustand'

interface IRentedhouse{
	id:Number;
	photoName:String;
	address:String;
	countParking:Number;
	price:number;
	place:String;
	endDate:Date
	startDate:Date
	active:boolean,
	key:Key,
	rented:boolean,
	description:boolean,
}

interface IRentedHouses{
	extensionPeriod:number;
	rentedHouseList:IRentedhouse[],
	setExtensionPeriod: (activeId: number) => void;
	setRentHouseActive:(id:Number)=>void,
	setRentHouseDescription:(id:Number)=>void,
}

export const useRentedHousesStore = create<IRentedHouses>((set,get) =>({
	extensionPeriod:0,
	rentedHouseList:[
		{id:0,
		 photoName:"house0",
		 address:"Eclipse Towers, кв.11",
		 countParking:2,
		 price:200,
		 place:"Московский",
		 endDate:new Date("2022-03-16"),
		 startDate:new Date(),
		 active:false,
		 key:0,
		 rented:true,
		 description:false,
	 },
	 {id:1,
		photoName:"house1",
		address:"Eclipse Towers, кв.12",
		countParking:2,
		price:100,
		place:"Октябрьский",
		endDate:new Date("2018-03-17"),
		startDate:new Date(),
		active:false,
		key:1,
		rented:false,
		description:false,
	},
	{id:2,
		photoName:"house2",
		address:"Eclipse Towers, кв.14",
		countParking:2,
		price:350,
		place:"Железнодорожный",
		endDate:new Date("2023-11-18"),
		startDate:new Date(),
		active:false,
		key:2,
		rented:false,
		description:false,
	},
	],
	setRentHouseActive:(idActive:Number)=>{
		let newHouseList = get().rentedHouseList
		for (let house of newHouseList){
			if(house.id===idActive && house.rented){
				house.active=true
			}else{
				house.active=false
			}
		}
		set(()=>({rentedHouseList:newHouseList}))
	},
	setRentHouseDescription:(idActive:Number)=>{
		let newHouseList = get().rentedHouseList
		for (let house of newHouseList){
			if(house.id===idActive && house.rented){
				house.description=!house.description
			}
		}
		set(()=>({rentedHouseList:newHouseList}))
	},
	setExtensionPeriod: (extensionPeriod) => set({extensionPeriod}),
}))

interface IUser{
	id: number | null;
	login: string | null;
	password: string | null;
	phone: string | null;
	balance: number | null;
	status: string | null;
	
}
interface IUserStore{
	user:IUser
	setUser: (user:IUser) => void;

}
export const useUserStore = create<IUserStore>((set,get) =>({
	user:{
		id:1,
		login:"KishMish",
		password:null,
		phone:null,
		balance:234543,
		status:"Ферзь",
	},
   setUser: (user:IUser) =>{
			set(()=>({user:user}));
		} 
	
}))	

interface IAuthPage{
	showPass: boolean
	setShowPass: () => void;
}
export const useAuthStore = create<IAuthPage>((set,get) =>({
	showPass: false,
   setShowPass: () => set((state)=>({showPass: !state.showPass})),
	
}))	

interface IHousePage{
	dayCount: number
	setDayCount: (activeId: number) => void;
}
export const useHousePageStore = create<IHousePage>((set,get) =>({
	dayCount: 0,
   setDayCount: (dayCount) => set({dayCount}),
}))		


interface ISwiper{
	activeId: Number
	setActiveId: (activeId: Number) => void;
}
export const useSwiperStore = create<ISwiper>((set,get) =>({
	activeId: 0,
   setActiveId: (activeId) => set({activeId}),
}))		

interface IMap{
	mapWidth: number
	mapHeight: number
	setMapWidth: (containerWidth: number) => void;
	setMapHeight: (containerWidth: number) => void;
}
export const useMapStore = create<IMap>((set,get) =>({
	mapWidth: 0,
	mapHeight: 0,
   setMapWidth: (containerWidth) => {
		set(()=>({mapWidth: containerWidth -600}))
	},

	setMapHeight: (containerHeight) => {
		set(()=>({mapHeight: containerHeight - 470}))
	}
	
}))	


interface IHouse{
	id:Number;
	photoName:String;
	address:String;
	countParking:Number;
	price:number;
	place:String;
	houseClass:String;
	descriotion:String;
	sale:Number|null;
	coordinates:Number[]
	key:Key;
	active:boolean;
}

interface IHouseStore{
	houseList:IHouse[]
	setHouseActive:(id:Number)=>void;
	getHouseById:(id:Number)=>IHouse;
}

export const useHouseStore = create<IHouseStore>((set,get) =>({
	houseList:[
	  {id:0,
		photoName:"house0",
		address:"Eclipse Towers, кв.11",
		countParking:2,
		price:100,
		place:"Железнодорожный",
		houseClass:"Низший класс",
		descriotion:"В эту раскошную хату можно залетать с двух ног и брать с собой всех друзей. На все время аренды данного шедевра ахритектуры твой рейтинг и репутация возрастат тысячекратно.",
		sale:null,
		key:0,
		coordinates:[54.628569, 39.693334],
		active:true,
	},
		{id:1,
		photoName:"house1",
		address:"Eclipse Towers, кв.12",
		countParking:3,
		price:200,
		place:"Октябрьский",
		houseClass:"Средний класс",
		descriotion:"В эту раскошную хату можно залетать с двух ног и брать с собой всех друзей. На все время аренды данного шедевра ахритектуры твой рейтинг и репутация возрастат тысячекратно. ",
		sale:null,
		key:1,
		coordinates:[54.636536, 39.668615],
		active:false,
	},
		{id:2,
		photoName:"house2",
		address:"Eclipse Towers, кв.31",
		countParking:4,
		price:300,
		place:"Советский",
		houseClass:"Высший класс",
		descriotion:"В эту раскошную хату можно залетать с двух ног и брать с собой всех друзей. На все время аренды данного шедевра ахритектуры твой рейтинг и репутация возрастат тысячекратно. ",
		sale:null,
		key:2,
		coordinates:[54.620401, 39.710157],
		active:false,
	},
	{id:3,
		photoName:"house2",
		address:"Eclipse Towers, кв.366",
		countParking:4,
		price:400,
		place:"Московский",
		houseClass:"Средний класс",
		descriotion:"В эту раскошную хату можно залетать с двух ног и брать с собой всех друзей. На все время аренды данного шедевра ахритектуры твой рейтинг и репутация возрастат тысячекратно. ",
		sale:null,
		key:3,
		coordinates:[54.600274, 39.749295],
		active:false,
	},
	{	id:4,
		photoName:"house2",
		address:"Eclipse Towers, кв.312",
		countParking:4,
		price:350,
		place:"Московский",
		houseClass:"Средний класс",
		descriotion:"В эту раскошную хату можно залетать с двух ног и брать с собой всех друзей. На все время аренды данного шедевра ахритектуры твой рейтинг и репутация возрастат тысячекратно. ",
		sale:null,
		key:4,
		coordinates:[54.637930, 39.754445],
		active:false,
	},
	],

	setHouseActive:(idActive:Number)=>{
		let newHouseList = get().houseList
		for (let house of newHouseList){
			if(house.id===idActive){
				house.active=true
			}else{
				house.active=false
			}
		}
		set(()=>({houseList:newHouseList}))
	},

	getHouseById:(id)=>{
		
		
		return get().houseList.filter((el)=>{return el.id===id})[0]
	}
	
}))



interface IBtnElement{
	value:boolean;
	name:String;
}

interface IHouseClassStore{
	houseClass:IBtnElement[];
	setHouseClass:(name:String)=>void;
}

export const useHouseClassStore = create<IHouseClassStore>((set,get) =>({
	houseClass:[
		{name:"allHouses",
			value:true},
		{name:"topСlass",
			value:false},
		{name:"middleClass",
			value:false},
		{name:"lowerClass",
			value:false},
		{name:"newHouses",
			value:false}
		],
		
	setHouseClass:(name)=>{
		const newHouseClass = get().houseClass;
		
		for( var el of newHouseClass){
			if(el.name === name){
				el.value=true;
			}else{
				el.value=false;
			}
		}

		set(()=>({houseClass:newHouseClass}))
	},
}))

interface IHouseSortStore{
	housePlace:IBtnElement[]
	priceSort:IBtnElement[],
	setHouseClass:(name:String)=>void;
	swapMinMax:(name:String)=>void;
	
}
export const useHousePlaceStore = create<IHouseSortStore>((set,get) =>({
	housePlace:[
		{name:"Center",
			value:true},
		{name:"East",
			value:false},
		{name:"West",
			value:false},
		{name:"North",
			value:false},
		{name:"South",
			value:false},
		{name:"Blane",
			value:false},
		],

	priceSort:[
	{name:"minMax",
		value:true,
	},
	{name:"maxMin",
		value:false,
	}],
		
	setHouseClass:(name)=>{
		const newHousePlace = get().housePlace;
			
		for( var el of newHousePlace){
			if(el.name === name){
				el.value=!el.value;
			}
		set(()=>({housePlace:newHousePlace}))
	}},

	swapMinMax:(name)=>{
		const newPriceSort = get().priceSort;
		if(newPriceSort[0].name === name && !newPriceSort[0].value){
			newPriceSort[0].value=!newPriceSort[0].value
			newPriceSort[1].value=!newPriceSort[1].value
		}
		if(newPriceSort[1].name === name && !newPriceSort[1].value){
			newPriceSort[0].value=!newPriceSort[0].value
			newPriceSort[1].value=!newPriceSort[1].value
		}
		
		set(()=>({priceSort: newPriceSort}))
		
	},
}))		
