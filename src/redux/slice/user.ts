import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from '../../types/redux'
import { PetInfo, UserData } from "../../types/interfaces/user";
import { setItem } from "../../utils/storage";
/** userSlice 초기값 */
const initialUser: UserState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
}


const userStateSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    getUser(state, action: PayloadAction<{user: UserData}>) {
      state.user = action.payload.user;
      setItem('user', action.payload.user);
    },

    updateUser(state, action: PayloadAction<{user: UserData}>) {
      const newUser = action.payload.user;
      state.user = {
        ...state.user,
        userId: newUser.userId || state.user.userId,
        userName: newUser.userName || state.user.userName,
        userPhone: newUser.userPhone || state.user.userPhone,
        userEmail: newUser.userEmail || state.user.userEmail,
        userAddress: newUser.userAddress || state.user.userAddress,
        pet: state.user?.pet || [],
      }
      setItem('user', state.user);
    },
    registerPet(state, action: PayloadAction<{pet: PetInfo}>) {
      const newPet = action.payload.pet;

      state.user.pet = [...state.user.pet, newPet]; // 새로운 pet 추가


      console.log(state)
      setItem('user', state.user);
    },

    updatePet(state, action: PayloadAction<{pet: PetInfo}>) {
      const updatePet = action.payload.pet;

      state.user.pet = state.user.pet.map(pet => {
        if(pet.petId === updatePet.petId){
          return { ...pet, ...updatePet }
        } else {
          return pet;
        }
      })

      setItem('user', state.user);
    }
  }
})

export const userActions = userStateSlice.actions;

export default userStateSlice.reducer;