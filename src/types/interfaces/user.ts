// 로그인
export interface LoginFormData {
  userId: string;
  userPw: string;
}

// 회원가입
export interface RegisterFormData {
  errors: {
    email: {
      message: string;
    };
  };
  userId: string;
  password: string;
  password_confirm: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: number;
  regDate: string;
}

// 회원 정보
export interface UserData {
  userId: string;
  userName: string;
  userPhone: number;
  userEmail: string;
  userAddress: string;
  petName: string;
  petSpecies: string;
  petBirth: number;
  petGender: string;
  petWeight: number;
  petFood: string;
  petActivity: string;
  petAge: number;
  petImage: string;
}

// 애완견 정보
export interface PetInfo {
  petName: string;
  petSpecies: string;
  petBirth: number;
  petGender: string;
  petWeight: number;
  petFood: string;
  petActivity: string;
  petAge: number;
  petImage?: string;
}

// 마이페이지
// export interface MyPageInfo {
//   userId: string;
//   userName: string;
//   userPhone: number;
//   userEmail: string;
//   userAddress: string;
//   petName: string;
//   petSpecies: string;
//   petBirth: number;
//   petGender: string;
//   petWeight: number;
//   petFood: string;
//   petActivity: string;
//   petAge: number;
//   petImage?: string;
// }