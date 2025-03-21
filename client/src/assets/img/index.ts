import Logo from './paw-5892565_640.png';
import MainImg from './pexels-gilberto-reyes-259461-825949.jpg'

import PetstarImg1 from './borador-7513186_1280.jpg'
import PetstarImg2 from './dog-3344414_1280.jpg'
import PetstarImg3 from './dog-5635960_1280.jpg'
import PetstarImg4 from './pexels-31299941-8179821.jpg'
import PetstarImg5 from './pexels-dariuskrs-2470659.jpg'
import PetstarImg6 from './pexels-gochrisgoxyz-1686790.jpg'
import PetstarImg7 from './woman-7009477_1280.jpg'
import PetstarImg8 from './pexels-n-voitkevich-4641868.jpg'

import PetWalkBanner from './pexels-josh-hild-1270765-16420806.jpg'

import PetshopImg1 from './pexels-caroline-vergauwen-34162895-7075834.jpg'
import PetshopImg2 from './pexels-josh-hild-1270765-9700135.jpg'
import PetshopImg3 from './pexels-rdne-7516531.jpg'
import PetshopImg4 from './pexels-ron-lach-9986350.jpg'
import PetshopImg5 from './pexels-swgus-1712459907-28156466.jpg'
import PetshopImg6 from './pexels-venus-wong-1519801170-27108224.jpg'

interface Images {
  Main: {
    logo: string,
    Img: string
  },
  Star: {
    img1: string,
    img2: string,
    img3: string,
    img4: string,
    img5: string,
    img6: string,
    img7: string,
    img8: string,
  },
  Walk: {
    img1: string,
  },
  Shop: {
    Toys: string[], // 장난감
    Snacks: string[], // 간식
    Supplies: string[], // 용품
  }
}

const Img:Images = {
  Main: {
    logo: Logo,
    Img: MainImg
  },
  Star: {
    img1: PetstarImg1,
    img2: PetstarImg2,
    img3: PetstarImg3,
    img4: PetstarImg4,
    img5: PetstarImg5,
    img6: PetstarImg6,
    img7: PetstarImg7,
    img8: PetstarImg8,
  },
  Walk: {
    img1: PetWalkBanner,
  },
  Shop: {
    Toys: [PetshopImg1, PetshopImg2], // 장난감
    Snacks: [PetshopImg3, PetshopImg4], // 간식
    Supplies: [PetshopImg5, PetshopImg6], // 용품
  }
}

export default Img;