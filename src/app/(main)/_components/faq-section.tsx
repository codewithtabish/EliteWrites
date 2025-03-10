import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function FAQSection() {
    return (
      <div className="w-full max-w-3xl px-4 md:py-16 mb-10 py-10  mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-white">How do I start blogging?</AccordionTrigger>
            <AccordionContent className="text-gray-300 bg-transparent">
              You can start by signing up, choosing a niche, and writing your first post using our intuitive editor.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-white">Can I earn money from my blog?</AccordionTrigger>
            <AccordionContent className="text-gray-300 bg-transparent">
              Yes! You can monetize through ads, sponsored posts, and affiliate marketing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-white">How can I increase traffic to my blog?</AccordionTrigger>
            <AccordionContent className="text-gray-300 bg-transparent">
              Optimize for SEO, share on social media, and engage with your audience through comments and newsletters.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-white">Is my blog mobile-friendly?</AccordionTrigger>
            <AccordionContent className="text-gray-300 bg-transparent">
              Absolutely! Our platform ensures full responsiveness across all devices.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
  