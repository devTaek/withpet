import { NextFunction, Request, Response } from 'express';
import { insert, insertPet, mypageData, updateUser, updatePet } from '../model/User'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import { selectPet, selectUser } from '../model/Auth';

dotenv.config();

// master ID
// 정태균 / test



/** accessToken 검증 */
export const verifyAccessToken = (req: Request, res: Response, next: NextFunction): void => {
  // console.log('Authorization Header: ', req.headers['authorization'])

  const authHeader = req.headers['authorization'];
  if(!authHeader) {
    res.status(403).json({message: "No authorization header provided!"});    // return 에러
  }

  // Authorization: Bearer <accessToken>
  // Bearer <accessToken>에서 accessToken 추출
  const token = authHeader?.split(' ')[1];

  if(!token) {
    res.status(403).json({message: "authHeader?.split: Token missing.."});
  }

  try {
    // accessToken 검증
    const payload = jwt.verify(token!, process.env.ACCESS_SECRET as string);
    // console.log('payload: ', payload);

    // 토큰이 유효하다면, payload를 req에 저장하고 다음으로 진행
    (req as any).user = payload;
    next();
  } catch(error) {
    console.error("Token verification error: ", error);
    res.status(401).json({message: "Invalid or expired token"});
  }
};
/** accessToken 검증 후 새로운 accessToken 발급 */
export const refreshToken = (req: Request, res: Response): void => {
  try{
    const refreshToken = req.cookies?.refreshToken;
    // console.log('refreshToken: ', refreshToken);

    if(!refreshToken) {
      res.status(401).json({message: "Refresh token is missing"});
    }

    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string)
      const newAccessToken = jwt.sign(
        { userId: (payload as any).userId },
        process.env.ACCESS_SECRET as string,
        { expiresIn: "1h" }
      )

      res.json({accessToken: newAccessToken});
    } catch (error) {
      console.error("Refresh Token verification error: ", error);
      res.status(403).json({ message: "Invalid refresh token" });
    }

  } catch(err) {
    res.status(500).json(err)
  }
}


/** 마이페지이(user + pet) */
export const userData = (req: Request, res: Response): void => {
  const {userId} = req.params;

  mypageData(userId, (result: any) => {
    if(!result) {
      return res.status(401).json({ message: 'Invalid credentials'});
    }
    // console.log(result)
    return res.json({userData: result});
  })
}


/** 회원가입 */
export const register = (req: Request, res: Response): void => {
  const { userId, password, name, email, address, phoneNumber } = req.body;

  // 비밀번호 bcrypt 해시화
  bcrypt.hash(password, 10, (err, hashPassword) => {
    if(err) {
      return res.status(500).send({ message: '비밀번호 해시화 오류' });
    }
    
    // DB에 저장 (+해시화된 비밀번호)
    insert(userId, hashPassword,  name, email, address, phoneNumber, (result: any) => {
      if(!result) {
        return res.status(401).json({ message: 'Invalid credentials'});
      }
  
      return res.status(200).json({ message: '회원가입 성공' });
    })
  })

}
/* pet 정보 추가 */
export const registerPetInfo = (req: Request, res: Response): void => {
  const {userId, name, species, age, birth, gender, weight, food, activity} = req.body;

  insertPet( userId, name, species, age, birth, gender, weight, food, activity, (result: boolean) => {
    if(!result) {
      return res.status(401).json({message: 'UserController. pet 정보 추가 오류', success: false})
    }

    return res.send({ success: true })
  })
}



/** 회원정보 업데이트 (회원정보 수정) */
export const updateUserInfo = (req: Request, res: Response): void => {
  const {userId, name, phone, email, address} = req.body;

  updateUser(userId, name, phone, email, address, (result: any) => {
    if(!result) {
      return res.status(401).json({message: "회원정보 수정 실패!"});
    }
    const editUserInfo = {
      userId,
      userName: result.user_name,
      userPhone: result.user_phone,
      userEmail: result.user_email,
      userAddress: result.user_address,
    }
    selectPet(userId, async (result: any) => {
      if(result) {
        Object.assign(editUserInfo, {
          petName: result.pet_name,
          petSpecies: result.pet_species,
          petBirth: result.pet_birth,
          petGender: result.pet_gender,
          petWeight: result.pet_weight,
          petFood: result.pet_food,
          petActivity: result.pet_activity,
          petImage: result.pet_image,
        })
      }

      return res.send(editUserInfo);
    })
  })
}
/** pet 추가 업데이트  */
export const updatePetInfo = (req: Request, res: Response): void => {
  const {userId, name, species, age, birth, gender, weight, food, activity, image} = req.body;

  updatePet(userId, name, species, age, birth, gender, weight, food, activity, image, (result: any) => {
    if(!result) {
      return res.status(401).json({message: "Invalid edit pet data"});
    }

    const editPetInfo = {
      userId,
      petName: result.pet_name,
      petSpecies: result.pet_species,
      petAge: result.pet_age,
      petBirth: result.pet_birth,
      petGender: result.pet_gender,
      petWeight: result.pet_weight,
      petFood: result.pet_food,
      petActivity: result.pet_activity,
      petImage: result.pet_image,
    };
    selectUser(userId, async (result: any) => {
      if(result) {
        Object.assign(editPetInfo, {
          userName: result.user_name,
          userPhone: result.user_phone,
          userEmail: result.user_email,
          userAddress: result.user_address,
        })
      }
      console.log(editPetInfo)
      return res.send(editPetInfo);
    })
  })
}



/** 회원 탈퇴 (회원정보 삭제) */
export const deleteUser = (req: Request, res: Response): void => {
  const id = req.body;
}