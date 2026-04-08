import Image from 'next/image'

export function LifestyleSection() {
  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <Image
        src="/lifestyle/parasol-lifestyle.jpg"
        alt="Glitter Queen lifestyle"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/20" />
    </section>
  )
}
