'use client'

import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <MobileNavigation />

      {/* Hero Section */}
      <section className="bg-secondary/30 py-16 md:py-20 lg:mt-0 mt-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-balance">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Have a question? We'd love to hear from you. Our team is here to help make your little princess's special day perfect.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 lg:pb-16 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                  Send Us a Message
                </h2>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Jane" className="mt-1.5" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-1.5" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      className="mt-1.5"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      className="mt-1.5"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="mt-1.5 resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    * Required fields. We typically respond within 24 hours.
                  </p>
                </form>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card className="p-6">
                <h3 className="text-xl font-serif font-bold mb-6">Contact Information</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <a
                        href="mailto:hello@mamilo.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        hello@mamilo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Phone</p>
                      <a
                        href="tel:+15551234567"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Address</p>
                      <p className="text-muted-foreground">
                        123 Fashion Avenue<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Business Hours</p>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9am - 6pm<br />
                        Saturday: 10am - 4pm<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* FAQ Link */}
              <Card className="p-6 bg-secondary/30 border-0">
                <h3 className="text-xl font-serif font-bold mb-3">
                  Looking for Quick Answers?
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Check out our FAQ page for instant answers to common questions about sizing, shipping, returns, and more.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Visit FAQ
                </Button>
              </Card>

              {/* Social Links */}
              <Card className="p-6">
                <h3 className="text-xl font-serif font-bold mb-4">Follow Us</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Stay connected for the latest collections, styling tips, and special offers.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <span className="sr-only">Instagram</span>
                      IG
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <span className="sr-only">Facebook</span>
                      FB
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                      <span className="sr-only">Pinterest</span>
                      PT
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-balance">
                How We Can Help
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Our dedicated team is ready to assist you with any inquiry
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👗</span>
                </div>
                <h3 className="font-semibold mb-2">Product Inquiries</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Questions about sizing, fabrics, customization, or availability
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-semibold mb-2">Order Support</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Help with orders, shipping, tracking, or returns
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold mb-2">Custom Requests</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Interested in bespoke designs or bulk orders
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
