import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircle, X } from "lucide-react"

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm here to help you learn about breast milk donation. Would you like to know if you're eligible to donate?" }
  ])
  const [userInput, setUserInput] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    setMessages([...messages, { role: 'user', content: userInput }])
    setUserInput('')

    // Simulated bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "Thank you for your interest! To be eligible, you generally need to be in good health, not taking certain medications, and have excess milk. Would you like to schedule a full screening?" 
      }])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
      <header className="container mx-auto py-6">
        <h1 className="text-3xl font-bold text-pink-600">Breast Milk Donation</h1>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Nourish a Life, Donate Breast Milk</h2>
          <p className="text-xl mb-8">Your excess breast milk can save premature and sick babies. Learn how you can help.</p>
          <Button onClick={() => setIsChatOpen(true)} className="bg-pink-500 hover:bg-pink-600">
            Chat with Us
          </Button>
        </section>

        {/* Benefits of Breastfeeding */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Benefits of Breastfeeding</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>For Baby</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Perfect nutrition for optimal growth</li>
                  <li>Enhanced immune system</li>
                  <li>Reduced risk of infections</li>
                  <li>Better cognitive development</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>For Mother</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Faster postpartum recovery</li>
                  <li>Reduced risk of certain cancers</li>
                  <li>Natural birth control (not 100% effective)</li>
                  <li>Emotional bonding with baby</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tips for Breastfeeding */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Tips for Successful Breastfeeding</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Proper Latch", description: "Ensure baby's mouth covers nipple and areola" },
              { title: "Frequent Feeding", description: "Feed on demand, about 8-12 times in 24 hours" },
              { title: "Stay Hydrated", description: "Drink water every time you breastfeed" },
              { title: "Comfortable Position", description: "Try different positions to find what works best" },
              { title: "Healthy Diet", description: "Eat a balanced diet rich in nutrients" },
              { title: "Seek Support", description: "Don't hesitate to ask for help from professionals" }
            ].map((tip, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tip.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How to Donate Breast Milk */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-6 text-center">How to Donate Breast Milk</h2>
          <ol className="space-y-4">
            {[
              "Contact a milk bank or donation program",
              "Complete a donor screening questionnaire",
              "Undergo blood tests for infectious diseases",
              "Once approved, pump and store milk following guidelines",
              "Drop off milk at designated locations or arrange pickup"
            ].map((step, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-4 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-pink-500 text-white rounded-full">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { question: "Who can donate breast milk?", answer: "Healthy lactating mothers who have excess milk and pass the screening process can donate." },
              { question: "Is donating breast milk safe?", answer: "Yes, milk banks follow strict safety protocols, including donor screening and milk pasteurization." },
              { question: "How much milk do I need to donate?", answer: "Most milk banks accept donations of 100 ounces or more, but smaller donations may be accepted." },
              { question: "Can I donate if I'm taking medications?", answer: "It depends on the medication. Some are safe, while others may disqualify you from donating." },
              { question: "How long can I store breast milk before donating?", answer: "Freshly expressed milk can be stored in the freezer for up to 6 months before donating." }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      {/* Chatbot */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-pink-500 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">Donation Assistant</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded ${message.role === 'user' ? 'bg-pink-100' : 'bg-gray-100'}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-2 border rounded"
              />
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
      )}

      {/* Floating chat button */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-pink-500 hover:bg-pink-600 flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}