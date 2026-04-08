import { Sparkles, Heart, Package, Star } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Handcrafted with Love', desc: 'Every piece is made by hand, with care and intention.' },
  { icon: Sparkles, title: 'Made to Shine', desc: 'Designed to catch the light — and every eye in the room.' },
  { icon: Package, title: 'Ships with Care', desc: 'Your order is packed with the same love it was made with.' },
  { icon: Star, title: 'One of a Kind', desc: 'No two pieces are exactly alike. You get something truly yours.' },
]

export function ValueProps() {
  return (
    <section className="section-outer bg-muted">
      <div className="section-inner">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-primary-soft text-primary">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg text-foreground leading-[1.2] tracking-tight">{title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-7">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
