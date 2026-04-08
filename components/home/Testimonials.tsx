import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: "I wore my parasol to a festival and could not take two steps without someone asking where I got it. Absolutely stunning.",
    name: "Sarah M.",
    location: "Austin, TX",
  },
  {
    quote: "The rhinestone cap I ordered is even more beautiful in person. The craftsmanship is unreal — worth every penny.",
    name: "Jade L.",
    location: "New Orleans, LA",
  },
  {
    quote: "Got the amethyst moth earrings and I've already received so many compliments. Glitter Queen never misses.",
    name: "Priya K.",
    location: "Brooklyn, NY",
  },
]

export function Testimonials() {
  return (
    <section className="section-outer">
      <div className="section-inner">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-foreground leading-[1.15] tracking-tight">
            What Our Queens Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, location }) => (
            <div key={name} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-muted-foreground leading-7 text-sm flex-1">"{quote}"</p>
              <div>
                <p className="font-display text-sm text-foreground">{name}</p>
                <p className="font-body text-xs text-muted-foreground">{location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
