import create from 'zustand'

interface State{
	allHouses:boolean;
	topСlass:boolean;
	middleClass:boolean;
	lowerClass:boolean;
	newHouses:boolean;
	revAllHouses:()=>void;
	revTopСlass:()=>void;
	revMiddleClass:()=>void;
	revLowerClass:()=>void;
	revNewHouses:()=>void;

	btnClickCenter:boolean;
	btnClickEast:boolean;
	btnClickWest:boolean;
	btnClickNorth:boolean;
	btnClickSouth:boolean;
	btnClickBlane:boolean;
	minMax:boolean;
	maxMin:boolean;
	revBtnClickCenter:()=>void;
	revBtnClickEast:()=>void;
	revBtnClickWest:()=>void;
	revBtnClickNorth:()=>void;
	revBtnClickSouth:()=>void;
	revBtnClickBlane:()=>void;
	swapMaxMin:()=>void;
	swapMinMax:()=>void;
}

export const useStore = create<State>((set,get) =>({
	allHouses:false,
	topСlass:false,
	middleClass:false,
	lowerClass:false,
	newHouses:false,

	revAllHouses:()=>set((state:any)=>({allHouses: !state.allHouses})),
	revTopСlass:()=>set((state:any)=>({topСlass: !state.topСlass})),
	revMiddleClass:()=>set((state:any)=>({middleClass: !state.middleClass})),
	revLowerClass:()=>set((state:any)=>({lowerClass: !state.lowerClass})),
	revNewHouses:()=>set((state:any)=>({newHouses: !state.newHouses})),

	btnClickCenter:false,
	btnClickEast:false,
	btnClickWest:false,
	btnClickNorth:false,
	btnClickSouth:false,
	btnClickBlane:false,
	minMax:true,
	maxMin:false,

	revBtnClickCenter:()=>set((state:any)=>({btnClickCenter: !state.btnClickCenter})),
	revBtnClickEast:()=>set((state:any)=>({btnClickEast: !state.btnClickEast})),
	revBtnClickWest:()=>set((state:any)=>({btnClickWest: !state.btnClickWest})),
	revBtnClickNorth:()=>set((state:any)=>({btnClickNorth: !state.btnClickNorth})),
	revBtnClickSouth:()=>set((state:any)=>({btnClickSouth: !state.btnClickSouth})),
	revBtnClickBlane:()=>set((state:any)=>({btnClickBlane: !state.btnClickBlane})),

	swapMinMax:()=>{
		if(!get().minMax){
			set((state:any)=>({minMax: !state.minMax}))
			set((state:any)=>({maxMin: !state.maxMin}))
		}
		},
		
	swapMaxMin:()=>{
		if(!get().maxMin){
			set((state:any)=>({minMax: !state.minMax}))
			set((state:any)=>({maxMin: !state.maxMin}))
		}
	},
// 	swapMaxMin:()=>{
// 		set((state:any)=>({minMax: !state.minMax}));
// 		set((state:any)=>({maxMin: !state.maxMin}));
// },
}))