import FilterBar from './filter-bar'

export default function Hero() {
  return (
    <div>
      <section className='relative h-93 md:h-90 lg:h-100 w-full overflow-hidden'>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className='absolute inset-0 w-full h-full object-bottom object-cover'
        >
          <source src='/videos/concert.mp4' type='video/mp4' />
        </video>
        {/* Dark Overlay for text readability */}
        <div className='absolute inset-0 bg-black/50' />
        {/* Content */}
        <div className='relative z-10 items-center justify-center h-full flex flex-col gap-3 md:gap-10'>
          <div className='items-center text-center text-white flex flex-col gap-4'>
            <h1 className='px-5 md:px-10 md:w-180 text-3xl md:text-5xl xl:text-6xl font-bold'>
              Discover experiences that move you
            </h1>
            <p className='px-3 md:px-10 lg:w-200 text-md md:text-lg xl:text-2xl'>
        <div className='relative z-10 items-center justify-center h-full flex flex-col gap-3 md:gap-10'>
          <div className='items-center text-center text-white flex flex-col gap-4'>
            <h1 className='px-2 md:px-10 md:w-180 text-4xl md:text-5xl xl:text-6xl font-bold'>
              Discover experiences that move you
            </h1>
            <p className='px-3 md:px-10 lg:w-200 text-lg xl:text-2xl'>
              Find the best concerts, workshops, and gatherings near you. Book
              tickets seamlessly and start your next adventure.
            </p>
          </div>
          <div className='px-5'>
            <FilterBar />
          </div>
        </div>
        {/* <div className='absolute inset-0 h-30 mix-blend-soft-light bg-black/30' /> */}
      </section>
    </div>
  )
}
