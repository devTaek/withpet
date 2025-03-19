import { useReducer } from 'react'
import Images from '../assets/img';

interface State {
  view: boolean;
  selectedCategory: 'Toys' | 'Snacks' | 'Supplies'; 
}

interface ACTION {
  type: 'TOGGLE_MENU' | 'SELECT_MENU',
  payload?: 'Toys' | 'Snacks' | 'Supplies';
}

const initialState: State = {
  view: false,
  selectedCategory: 'Toys',
}


const reducer = (state: State, action: ACTION) => {
  switch(action.type) {
    case 'TOGGLE_MENU':
      return {...state, view: !state.view}
    case 'SELECT_MENU':
      return {
        ...state,
        selectedCategory: action.payload ? action.payload : state.selectedCategory
      }
    default:
      return state;
  }
}
const Petshop = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const shopMenus: ('Toys' | 'Snacks' | 'Supplies')[] = ['Toys', 'Snacks', 'Supplies']

  return (
    <div className='h-[calc(100vh-4rem)] mt-16 flex items-center justify-center p-10 gap-10'>

      <div className='w-2/3 h-full overflow-hidden'>
        <div className='w-full font-bold text-4xl p-2 text-center green:text-black'>PETSHOP -
        <button onClick={() => {dispatch({type: 'TOGGLE_MENU'})}} className="ml-4 cursor-pointer text-lg sm:text-xl">
          {state.view ? '^' : '⌄'} 
          {state.view && 
            <div className='absolute border border-gray-300 rounded shadow-lg z-50'>
              {shopMenus.map((item, id) => <li onClick={() => dispatch({type: 'SELECT_MENU', payload: item})} key={id} className='text-sm'>{item}</li>)}
            </div>}
        </button>
      </div>

      {/* 리스트 이미지 */}
      <div className='h-full overflow-auto scrollbar-hide'>
        <ul className='h-full grid grid-cols-3 gap-5'>
          {
            Images.Shop[state.selectedCategory].map((img, id) => (
              <li key={id} className='transform transition duration-300 ease-in-out hover:scale-105'>
                <img src={img} alt="" />
              </li>
            ))
          }
        </ul>
      </div> 
       
      {/* 고정 이미지 */}
      </div>
      <div className='w-1/3 h-full'>
        <img src={Images.Shop.Supplies[1]} alt="" className='w-full h-full max-h-screen'/>
      </div>
    </div>
  )
}

export default Petshop