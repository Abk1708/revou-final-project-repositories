import ZeroHunger from '../../assets/ZeroHunger.png'
import Comunity from '../../assets/Comunities.png'
import Climate from '../../assets/ClimateAction.png'
import CleanEnergy from '../../assets/CleanEnergy.png'
import Industry from '../../assets/Inovation.png'



const Sdg = () => {
  return (
    <div className='flex flex-row gap-x-1 justify-center'>
        <img className='w-[10%] h-[10%]' src={ZeroHunger} alt='SDG Logo' />
        <img className='w-[10%] h-[10%]' src={CleanEnergy} alt='SDG Logo' />
        <img className='w-[10%] h-[10%]' src={Comunity} alt='SDG Logo' />
        <img className='w-[10%] h-[10%]' src={Industry} alt='SDG Logo' />
        <img className='w-[10%] h-[10%]' src={Climate} alt='SDG Logo' />
    </div>
  )
}

export default Sdg