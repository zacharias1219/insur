import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <section className="bg-gradient-to-b from-[#151F8C]  to-[#FF5B5B] text-white">
        <div className="flex flex-col items-center p-14 gap-6 justify-center">
          <div>
            <h1 className="text-7xl pt-10 font-bold">We InSure</h1>
          </div>
          <div className="pt-10">
            <div className="bg-[#4154BF] rounded-2xl w-[275px] h-[150px] sm:w-[750px] sm:h-[450px]">
                
            </div>
          </div>
          <div>
            <p className="text-lg pt-8 font-semibold">We Insure quick delivery and ease of use</p>
          </div>
          <div className="flex flex-row gap-4">
            <Link href="/user/overview">
            <Button className="bg-black text-white shadow-md shadow-black/60 hover:bg-slate-800">User Dashboard</Button>
            </Link>
            <Link href="/admin/overview">
            <Button className="bg-white text-black shadow-md shadow-black/60 hover:bg-slate-800">Admin Dashboard</Button>
            </Link>
          </div>
        </div>
        <div className="justify-center gap-14 2xl:text-5xl font-bold pt-20 pb-16 flex flex-col md:flex-row align-center items-center">
          <div className="flex flex-col md:flex-row gap-3">
            <Image src='/logo.svg' width={40} height={40} alt='logo' className='2xl:pt-2 object-contain'/>
            <h1>AdVantage</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Image src='/logo.svg' width={40} height={40} alt='logo' className='2xl:pt-2 object-contain'/>
            <h1>SIC</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Image src='/logo.svg' width={40} height={40} alt='logo' className='2xl:pt-2 object-contain'/>
            <h1>MSC</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Image src='/logo.svg' width={40} height={40} alt='logo' className='2xl:pt-2 object-contain'/>
            <h1>THUB</h1>
          </div>
        </div>
      </section>
      <section className="bg-black text-white">
        <div className="p-8 py-16 flex flex-col items-center gap-14">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="bg-slate-700 rounded-lg w-[400px] h-[280px]">
               dfg
            </div>
            <div className="rounded-lg w-[400px] h-[280px] items-start pt-8 px-4 pr-16">
                <h1 className="text-6xl font-bold">Fast</h1>
                <p className="text-2xl font-semibold pt-6 text-slate-400 pb-4">We deliver your insurance policy in minutes</p>
                <Button className="bg-slate-900 text-white">Read More</Button>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-16">
          <div className="rounded-lg w-[400px] h-[280px] items-start pt-8 px-4 pr-16">
                <h1 className="text-6xl font-bold">Easy</h1>
                <p className="text-2xl font-semibold pt-6 text-slate-400 pb-4">Use Ethereum to make Insurance with ease</p>
                <Button className="bg-slate-900 text-white">Read More</Button>
            </div>
            <div className="bg-slate-600 rounded-lg w-[400px] h-[280px]">
                dfg
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="py-20 bg-gradient-to-t from-[#151F8C] to-[#FF5B5B]">
          <div className="flex flex-col items-center gap-6 justify-center">
            <div className="text-black text-4xl font-bold pb-10">FAQ</div>
            <div className="text-black text-xl font-bold">
            <Accordion type="single" collapsible className="px-6 py-4 md:w-[800px] w-[300px] bg-white rounded-3xl border">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It is animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black">
        <div className="text-white py-20">
          <div className="flex flex-col items-center gap-6 justify-center">
            <div className="text-4xl font-bold pb-4">Sign up today</div>
            <Link href="/sign-up">
              <Button className="bg-white text-black hover:bg-slate-300">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
