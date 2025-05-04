import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex flex-1 items-center gap-4">
          <img
            src="/logo.svg"
            alt="Luxe Queer Logo"
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold">Luxe Queer Investments</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-luxury-primary hover:bg-luxury-primary/90">Request Access</Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-20 px-6 bg-gradient-to-b from-background to-muted">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Invest in the Future of Luxury Queer Media</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Join our exclusive investment portal and be part of the revolution in luxury queer media and entertainment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-luxury-primary hover:bg-luxury-primary/90">
                  Access Your Portfolio
                </Button>
              </Link>
              <Link href="/pitch-deck">
                <Button size="lg" variant="outline">
                  View Pitch Deck
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Why Invest With Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">Exclusive Access</h3>
                <p className="text-muted-foreground">
                  Gain exclusive access to investment opportunities in the luxury queer media space.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">Transparent Reporting</h3>
                <p className="text-muted-foreground">
                  Access detailed financial reports and performance metrics in real-time.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">Community Impact</h3>
                <p className="text-muted-foreground">
                  Make a meaningful impact while achieving competitive returns on your investment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Luxe Queer Magazine. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
