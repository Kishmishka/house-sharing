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

interface IRentedhouseRes{
	id:Number;
	idHouse:number;
	idClient:number;
	rentalStartDate:string
	rentalDuration:number
	rentalEndDate:string
	totalAmount:number
}

interface IRentedHouses{
	extensionPeriod:number;
	rentedHouseList:IRentedhouse[],
	setExtensionPeriod: (activeId: number) => void;
	setRentHouseActive:(id:Number)=>void,
	setRentHouseDescription:(id:Number)=>void,
	setRentedHouseList:(rentedHouses:IHouseResponseItem[], rentedHousesRes:IRentedhouseRes[] )=>void,
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
	setRentedHouseList:(rentedHousesRes)=>{
	// 	let newHouseList = get().rentedHouseList
	// 	for (let i = 0; i < housesRes.length; i++) {
	// // 		id:Number;
	// // photoName:String;
	// // address:String;
	// // countParking:Number;
	// // price:number;
	// // place:String;
	// // endDate:Date
	// // startDate:Date
	// // active:boolean,
	// // key:Key,
	// // rented:boolean,
	// // description:boolean,
	// 		const item:IRentedhouse ={
	// 			id:housesRes[i].id,
	// 			photoName:housesRes[i].photoLink,
	// 			address:housesRes[i].address,
	// 			countParking:housesRes[i].parkingSpacesCount,
	// 			price:housesRes[i].pricePerDay,
	// 			place:housesRes[i].district,
	// 			// houseClass: housesRes[i].comfortClass,
	// 			// descriotion:housesRes[i].description,
	// 			// sale:housesRes[i].discountPrice,
	// 			// coordinates:housesRes[i].mapLocation,
	// 			active:false,
	// 			key:i,
	// 		}
	// 		newHouseList.push(item)
			
	// 	}
	// 	set(()=>({rentedHouseList:newHouseList}))
	},
}))

export interface IUser{
	id: number ;
	login: string;
	password: string;
	status: string;
	phoneNumber: string;
	email: string | null;
	balance: number;
	photoLink:string | null;
}
interface IUserStore{
	user: IUser | null
	setUser: (user:IUser) => void;

}
export const useUserStore = create<IUserStore>((set,get) =>({
	// user:{
	// 	id:1,
	// 	login:"KishMish",
	// 	password:null,
	// 	phone:null,
	// 	balance:234543,
	// 	status:"Ферзь",
	// },
	user:null,
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
	activeId: number
	setActiveId: (activeId: number) => void;
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
	id:number;
	photoName:String;
	address:String;
	countParking:Number;
	price:number;
	place:string;
	houseClass:String;
	description:String;
	sale:Number|null;
	coordinates:Number[]
	key:Key;
	active:boolean;
}

export interface IHouseResponseItem{
	id:number;
	photoLink:String;
	address:string;
	parkingSpacesCount:Number;
	pricePerDay:number;
	district:string;
	comfortClass:string;
	description:String;
	discountPrice:Number|null;
	mapLocation:Number[]
}

interface IHouseStore{
	houseList:IHouse[]
	defaultHouseList:IHouse[]
	setHouseActive:(id:number)=>void;
	getHouseById:(id:Number)=>IHouse;
	setHouseList:(houses:IHouseResponseItem[])=>void;
	selectionHousesClass:(houseClass:string)=>void;
	selectionHousesPlace:(housePlace:IBtnElement[])=>void;
	selectionHousesPrice:(sortFlag:boolean)=>void;
	clearHouseList:()=>void;
}

export const useHouseStore = create<IHouseStore>((set,get) =>({
	houseList:[],
	defaultHouseList:[],
	setHouseActive:(idActive:number)=>{
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
	},

	setHouseList:(housesRes)=>{
		let newHouseList = get().houseList
		for (let i = 0; i < housesRes.length; i++) {
			const item:IHouse ={
				id:housesRes[i].id,
				photoName:housesRes[i].photoLink,
				address:housesRes[i].address,
				countParking:housesRes[i].parkingSpacesCount,
				price:housesRes[i].pricePerDay,
				place:housesRes[i].district,
				houseClass: housesRes[i].comfortClass,
				description:housesRes[i].description,
				sale:housesRes[i].discountPrice,
				coordinates:housesRes[i].mapLocation,
				active:false,
				key:i,
			}
			newHouseList.push(item)
			
		}
		set(()=>({houseList:newHouseList}))
		set(()=>({defaultHouseList:newHouseList}))
	},
	clearHouseList:()=>{
		set(()=>({houseList:[]}))
	},
	selectionHousesClass:(houseClass)=>{
		if(houseClass!=="allHouses"){
			set(()=>({houseList:get().defaultHouseList.filter((house)=>{return house.houseClass === houseClass})}))
		}else{
			set(()=>({houseList:get().defaultHouseList}))
		}
	},
	selectionHousesPlace:(housePlace)=>{
		let setsHousePlace:string[] = []
		for (const place of housePlace) {
			if(place.value){
				setsHousePlace.push(place.name)
			}
		}
		set(()=>({houseList:get().defaultHouseList.filter((house)=>{return setsHousePlace.includes(house.place)})}))
	},
	selectionHousesPrice:(sortFlag)=>{
		function sortIncreasingt(a:IHouse,b:IHouse) {
			if (a.price > b.price) {
				return 1;
			} else if (b.price > a.price) {
				return -1;
			} else {
				return 0;
			}
		}
		function sortDecreasing(a:IHouse,b:IHouse) {
			if (a.price > b.price) {
				return -1;
			} else if (b.price > a.price) {
				return 1;
			} else {
				return 0;
			}
		}
		if(sortFlag){
			set(()=>({houseList:get().houseList.sort(sortDecreasing)}))
		}else{
			set(()=>({houseList:get().houseList.sort(sortIncreasingt)}))
		}
		
		// if(true){
		// 	set(()=>({houseList:get().houseList.filter((house)=>{return house.houseClass === houseClass})}))
		// }else{
		// 	set(()=>({houseList:get().defaultHouseList}))
		// }
	}
}))



interface IBtnElement{
	value:boolean;
	name:string;
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
		{name:"hut",
			value:false}
		],
		
	setHouseClass:(name)=>{
		const newHouseClass = get().houseClass;
		
		for( var el of newHouseClass){
			if(el.name === name){
				el.value=true;
				useHouseStore.getState().selectionHousesClass(el.name)
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
	setHousePlace:(name:String)=>void;
	swapMinMax:(name:String)=>void;
	
}
export const useHousePlaceStore = create<IHouseSortStore>((set,get) =>({
	housePlace:[
		{name:"Центр",
			value:true},
		{name:"Московский",
			value:false},
		{name:"Железнодорожный",
			value:false},
		{name:"Октябрьский",
			value:false},
		{name:"Советский",
			value:false},
		],

	priceSort:[
	{name:"minMax",
		value:true,
	},
	{name:"maxMin",
		value:false,
	}],
		
	setHousePlace:(name)=>{
		const newHousePlace = get().housePlace;
			
		for( var el of newHousePlace){
			if(el.name === name){
				el.value=!el.value;
			}
		}
		useHouseStore.getState().selectionHousesPlace(newHousePlace);
		set(()=>({housePlace:newHousePlace}))
	},

	swapMinMax:(name)=>{
		const newPriceSort = get().priceSort;
		if(newPriceSort[0].name === name && !newPriceSort[0].value){
			newPriceSort[0].value=!newPriceSort[0].value
			newPriceSort[1].value=!newPriceSort[1].value
			useHouseStore.getState().selectionHousesPrice(false)
		}
		if(newPriceSort[1].name === name && !newPriceSort[1].value){
			newPriceSort[0].value=!newPriceSort[0].value
			newPriceSort[1].value=!newPriceSort[1].value
			useHouseStore.getState().selectionHousesPrice(true)
		}
		
		set(()=>({priceSort: newPriceSort}))
		
	},
}))		
