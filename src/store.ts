import create from 'zustand'

interface IHouse{
	id:Number;
	photoName:String;
	address:String;
	countParking:Number;
	price:Number;
	place:String;
	houseClass:Number;
	descriotion:String;
	sale:Number|null;
}

interface IHouseStore{
	houseList:IHouse[]
	setHouseClass:()=>void;
}

export const useHouseStore = create<IHouseStore>((set,get) =>({
	houseList:[
	  {id:0,
		photoName:"house0",
		address:"Ebat strit 0",
		countParking:2,
		price:300,
		place:"East",
		houseClass:2,
		descriotion:"Ebat cho za hata",
		sale:null},
		{id:1,
		photoName:"house1",
		address:"Ebat strit 1",
		countParking:3,
		price:300,
		place:"East",
		houseClass:2,
		descriotion:"Ebat cho za hata",
		sale:null},
		{id:2,
		photoName:"house2",
		address:"Ebat strit 2",
		countParking:4,
		price:300,
		place:"East",
		houseClass:2,
		descriotion:"Ebat cho za hata",
		sale:null},
	],
	setHouseClass:()=>{},
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
