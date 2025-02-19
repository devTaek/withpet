import { Request, Response } from 'express';

import { selectPet, select } from '../model/Auth'

import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


/** 로그인 (회원정보 찾기) */
export const login = (req: Request, res: Response): void => {
  const {userId, userPw} = req.body;
  // console.log('Authorization Header:', req.headers['authorization']);

  select(userId, async function(result) {

    if(!result) {
      return res.status(404).send({message: "사용자 정보를 찾을 수 없습니다."});
    } else {
      try {
        // 비밀번호 bcrypt 비교
        const pwMatch = await bcrypt.compare(userPw, result.user_pw);
        if (pwMatch === false) {
          return res.status(401).send({message: "비밀번호가 일치하지 않습니다."});
        }

        const user = {
          userId: result.user_id,
          userName: result.user_name,
          userPhone: result.user_phone,
          userEmail: result.user_email,
          userAddress: result.user_address,
          userRegdate: result.regdate,
          pet: [],
        }

        // access Token 발급
        const accessToken = jwt.sign(
          {
            userId: result.user_id,
            userName: result.user_name,
            role: 'admin',
          },
          process.env.ACCESS_SECRET as string,
          {expiresIn: '1h'}
        )
        
        // Refresh Token 발급
        const refreshToken = jwt.sign(
          {
            userId: result.user_id,
            userName: result.user_name,
            role: 'admin',
          },
          process.env.REFRESH_SECRET as string,
          {expiresIn: '24h'}
        )


        // RefreshToken, cookie 저장
        res.cookie("refreshToken", refreshToken, {
          secure: false,    // http 사용 (https : true)
          httpOnly: true,   // 자바스크립트 접근 불가
        })


        selectPet(userId, async (result: any) => {
          const isPetState = result.length;

          if(result) {
            user.pet = result.map((pet: any) => ({
              petName: pet.pet_name,
              petSpecies: pet.pet_species,
              petBirth: pet.pet_birth,
              petGender: pet.pet_gender,
              petWeight: pet.pet_weight,
              petFood: pet.pet_food,
              petActivity: pet.pet_activity,
            }))
          }

          return res.send({ accessToken, user, isPetState });
        })

      } catch(error) {
        console.log("비밀번호 bcrypt 및 토큰발급 오류", error)
        res.status(500).json(error);
      }
    }
  })
}

/** 로그아웃 */
export const logout = (req: Request, res: Response): void => {
  try {
    res.clearCookie('refreshToken');
    res.status(200).send({message: "Logged out successfully"});
  } catch(error) {
    console.error("Logout error: ", error)
    res.status(500).json({message: "Logout failed"});
  }
}