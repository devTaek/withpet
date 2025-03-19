import Iamges from '../assets/img/index'

const Home = () => {
  return (
    <div className='flex w-screen items-center justify-center'>
      <img src={Iamges.Main.Img} alt="" className='w-full max-h-screen object-contain' />
    </div>
  )
}

export default Home
