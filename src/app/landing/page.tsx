import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, DollarSign, FileText, Users } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-luxury-primary mb-6">
            Welcome to Luxe Queer Investment Portal
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your exclusive gateway to premium investment opportunities in the LGBTQ+ luxury market
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="luxury-button">
              Start Investing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="luxury-card p-8 text-center">
            <DollarSign className="h-12 w-12 text-luxury-gold mb-4" />
            <h3 className="text-2xl font-bold text-luxury-primary mb-2">
              Premium Investments
            </h3>
            <p className="text-muted-foreground">
              Access exclusive investment opportunities tailored for the affluent LGBTQ+ market
            </p>
          </div>
          <div className="luxury-card p-8 text-center">
            <FileText className="h-12 w-12 text-luxury-gold mb-4" />
            <h3 className="text-2xl font-bold text-luxury-primary mb-2">
              Due Diligence
            </h3>
            <p className="text-muted-foreground">
              Comprehensive due diligence reports and documentation
            </p>
          </div>
          <div className="luxury-card p-8 text-center">
            <Users className="h-12 w-12 text-luxury-gold mb-4" />
            <h3 className="text-2xl font-bold text-luxury-primary mb-2">
              Personalized Service
            </h3>
            <p className="text-muted-foreground">
              Dedicated relationship management and support
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-luxury-primary text-center mb-8">
            Why Choose Luxe Queer
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-8 w-8 text-luxury-gold" />
                <div>
                  <h3 className="text-xl font-semibold text-luxury-primary">
                    Exclusive Access
                  </h3>
                  <p className="text-muted-foreground">
                    Be part of a select group of investors with access to premium opportunities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-8 w-8 text-luxury-gold" />
                <div>
                  <h3 className="text-xl font-semibold text-luxury-primary">
                    Market Insights
                  </h3>
                  <p className="text-muted-foreground">
                    Get expert analysis and insights into the LGBTQ+ luxury market
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-8 w-8 text-luxury-gold" />
                <div>
                  <h3 className="text-xl font-semibold text-luxury-primary">
                    Risk Management
                  </h3>
                  <p className="text-muted-foreground">
                    Comprehensive risk assessment and mitigation strategies
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-8 w-8 text-luxury-gold" />
                <div>
                  <h3 className="text-xl font-semibold text-luxury-primary">
                    Premium Support
                  </h3>
                  <p className="text-muted-foreground">
                    Dedicated account management and personalized service
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-8 w-8 text-luxury-gold" />
                <div>
                  <h3 className="text-xl font-semibold text-luxury-primary">
                    Secure Platform
                  </h3>
                  <p className="text-muted-foreground">
                    Enterprise-grade security and privacy protection
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-8 w-8 text-luxury-gold" />
                <div>
                  <h3 className="text-xl font-semibold text-luxury-primary">
                    Transparent Process
                  </h3>
                  <p className="text-muted-foreground">
                    Clear documentation and transparent communication
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-luxury-primary/5 p-12 rounded-2xl mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-luxury-primary mb-4">
              Ready to Invest in Luxury?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our exclusive community of investors today
            </p>
            <Button size="lg" className="luxury-button">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-luxury-primary mb-2">
                Luxe Queer Investment Portal
              </h3>
              <p className="text-muted-foreground">
                Your gateway to premium investment opportunities
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                Privacy Policy
              </Button>
              <Button variant="ghost" size="sm">
                Terms of Service
              </Button>
              <Button variant="ghost" size="sm">
                Contact Us
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
