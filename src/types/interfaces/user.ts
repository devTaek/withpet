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
  pet: PetInfo[];
}

// 애완견 정보
export interface PetInfo {
    petId?: number;
    petName: string;
    petSpecies: string;
    petBirth: number;
    petGender: string;
    petWeight: number;
    petFood: string;
    petActivity: string;
    petAge: number;
}