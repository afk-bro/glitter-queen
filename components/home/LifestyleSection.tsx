import Image from 'next/image'

export function LifestyleSection() {
  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center">
      <Image
        src="/lifestyle/parasol-lifestyle.jpg"
        alt="Glitter Queen lifestyle"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-6">
        <p className="font-script text-5xl md:text-7xl text-white leading-none drop-shadow-sm">
          Wear your light.
        </p>
      </div>
    </section>
  )
}
