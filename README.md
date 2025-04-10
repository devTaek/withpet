TOGETDOG : 강아지 산책 SNS
togetdog.png

지금 TOGETDOG으로 👉🏻 https://togetdog.site
💚 프로젝트 진행기간
2023/1/9 - 2023/2/17

SSAFY 8기 공통 프로젝트

💛 TOGETDOG?
하나 뿐인 내 강아지에게 동네 친구를 만들어주세요!

반려동물 1500만 시대, 주변의 강아지 친구들도 늘어나고 있습니다. 강아지들에게 필수인 산책 다들 어떻게 하고 계신가요?

우리 TOGETDOG에서는 내 강아지에게 맞춤인 산책 친구들을 찾아볼 수 있습니다. 몸무게, 중성화 여부 등 안전을 고려한 추천을 사용해보세요. 위치 정보를 기반으로 제공되는 산책 친구 추천을 통해 지금 내 소중한 강아지에게 친구를 만들어주세요.

강아지와의 소중한 순간을 남길 수 있는 SNS 기능도 제공하고 있습니다!

💚 주요 기능을 소개합니다!
1️⃣ 산책 친구를 찾고 산책 약속 잡기

우리 강아지에게 딱 맞는 산책 친구 찾고 싶지 않으셨나요?

내가 등록한 강아지의 등록정보를 기반으로 강아지의 몸무게, 성별, 중성화 여부 등을 고려하여 같은 동네의 산책 친구들을 추천해드립니다.

만약, 만나고 싶은 친구가 생겼다면 산책 약속 생성하기를 통해 산책 약속을 신청해보세요.

상대방이 산책 약속을 수락한다면, 신청한 날짜와 시간에 산책을 다녀오시면 됩니다.

더 편의성있는 산책 친구 추천 시스템을 위하여 산책이 완료되면 서로 평점을 남길 수 있습니다.

2️⃣ 내 강아지의 다이어리 꾸미고 소통하기

소중한 내 강아지와의 시간, 기록하고 싶지 않으신가요?

TOGETDOG에서는 계정 당 최대 3마리까지의 SNS 기능을 제공하고 있습니다.

강아지 프로필을 등록하면 해당 강아지의 피드가 생성됩니다. 강아지를 스왑하는 기능을 통해 강아지마다 원하는 사진을 골라 올릴 수 있습니다.

또한 게시물을 등록하면 좋아요, 댓글 기능 등을 제공하고 있으니, 주변 이웃과의 활발한 소통을 해보시길 추천드립니다!

3️⃣ 내가 원하는 친구들을 팔로우하고 소식받기

우리 강아지에게 친구가 생겼다면, 친구의 소식을 받아 보아요!

팔로우 기능을 통해 원하는 친구들의 소식을 모아 볼 수 있어요.

TOGETDOG의 홈에서는 내가 팔로우하는 강아지 친구들의 사진을 모아서 제공해드리고 있습니다.

💛 또 어떤 기능이 있나요?
1️⃣ 지금 위치에서 갈 수 있는 애완동물 시설 확인하기!

우리 서비스를 이용하는 지금, 가까운 애완 동물 시설을 확인하고 싶으시다면 위치기반 애완동물 시설 제공 서비스를 이용해보세요.

2️⃣ 강아지 및 주인닉네임으로 검색 기능

기억하고 있는 그 강아지, 나와 같이 이 서비스를 이용하고 있을까요? 검색 기능을 통해 찾아보세요!

3️⃣ 소셜 로그인 기능으로 더 편하게!

번거로운 회원가입 과정을 단축해주는 소셜 로그인 기능으로 더 편하게 서비스를 이용해보세요!

💚 기술 스택 및 Version 📚
Backend
development tool : sts 3.9.14.release
spring boot : 2.7.7
gradle : 7.6
jdk : zulu-8
my sql : 8.0.31
swagger : 3.0.0
lombok
Spring Data JPA
Spring Security
Spring Web
Web Socket

Frontend
development tool : Visual Studio Code
npm : 8.19.2
node.js : 18.12.1
React 17.0.2
react-router : v6.
recoil : 0.7.6
emotion : v11.
Viewport Size: 360px x 800px (Galaxy S21 기준)

CI/CD
AWS EC2
Jenkins
NGINX
Docker

그 외 협업툴 📕
Git, source tree - 브랜치 전략을 통해 기능 분리
Notion - 전체적인 회의 관할 및 모든 메모
JIRA - 주단위 목표량 설정 및 할일 배분
Slack - 빌드 소식 확인용

💛 프로젝트 구조도 📚
B.E
togetdog
  ├── global
  │   ├── advice
  │   ├── config
  │   ├── exception
  │   ├── interceptor
  │   ├── util
  ├── domain
  │   ├── controller
  │   ├── model
  │   │   ├── dto
  │   │   ├── vo
  │   │   ├── entity
  │   │   ├── repository
  └──	└── └── service
F.E
togetdog
  ├── node_modules
  ├── public
  │   └── index
  ├── src
  │   ├── assets
  │   ├── components
  │   ├── pages
  │   ├── recoil
  │   ├── styles
  │   ├── model
  │   ├── App
  │   ├── index
  │   └── config
  ├── package
  ├── package.lock
  └── yarn.lock
💚 팀원 구성 및 소개
B.E
팀원	역할	이메일
권성은 👑	팀장, CI/CD, API 설계 및 관리	sungeun.kweon@gmail.com
곽민주	협업 툴 및 문서 관리, 외부 API 관리, DB 설계	kacamimi@naver.com
윤상빈	API 설계 및 관리, UCC 담당	mailto:ssafybin0308@gmail.com
F.E
팀원	역할	이메일
성다연	F.E 팀장, 기획 및 디자인, 와이어프레임 및 API 설계	dysung32@gmail.com, sdy32@naver.com (etc…)
박정호	협업 툴 및 문서 관리, 와이어프레임 및 API 설계	juggorrvol.2@gmail.com
성예빈	기획 및 디자인, 와이어프레임 및 API 설계, UCC 담당	ebing.code@gmail.com
💛 프로젝트 산출물
기능명세서
> 와이어프레임 및 시퀀스
> API 설계 문서
> SWAGGER
> ERD
> 회의록

