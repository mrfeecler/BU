import SearchInput from '@/components/SearchInput/SearchInput';
import './index.scss';

export default function Banner() {
  return (
    <div className='banner px-10 hidden md:block'>
      <div className='banner__wrapper'>
        <div className='grid items-center grid-cols-1 lg:grid-cols-2 gap-20 md:gap-30 xl:gap-40'>
          <div className='banner__wrapper__search'>
            <div className='description mb-8 md:mb-16 fade-top'>
              <p className='text-xl md:text-2xl 2xl:text-3xl font-jm font-bold mb-1'>
                Find and research the most detailed
              </p>
              <p className='text-xl md:text-2xl 2xl:text-3xl font-jm font-bold'>
                <span className='highlight'>Crypto</span>
                <span className='mx-1.5'>information on</span>
                <span className='highlight'>BlockUltra</span>
              </p>
            </div>
            <SearchInput isButton={true} />
          </div>
          <div className='banner__wrapper__image ml-auto'>
            <video autoPlay muted loop>
              <source src="/video/tablet.mp4" type="video/mp4"></source>
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
