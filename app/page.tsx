import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <section className="bg-blue-400 text-white">
        <div className="flex flex-col items-center p-14 gap-6 justify-center">
          <div>
            <h1 className="text-5xl font-bold">We InSure</h1>
          </div>
          <div>
            <div className="bg-blue-800 rounded-2xl w-[550px] h-[300px]">
                
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">We Insure quick delivery and ease of use</p>
          </div>
          <div>
            <Button className="bg-black text-white shadow-md shadow-black">Get Started</Button>
          </div>
          <div className="">

          </div>
        </div>
      </section>
      <section className="bg-black text-white">
        <div className="p-8 py-16 flex flex-col items-center gap-8">
          <div className="flex flex-row gap-8">
            <div className="bg-slate-700 rounded-lg w-[300px] h-[220px]">
               dfg
            </div>
            <div className="rounded-lg w-[300px] h-[220px] items-start pt-8 px-4 pr-16">
                <h1 className="text-4xl font-bold">Fast</h1>
                <p className="text-sm font-semibold pt-6 text-slate-400 pb-4">We deliver your insurance policy in minutes</p>
                <Button className="bg-slate-900 text-white">Read More</Button>
            </div>
          </div>
          <div className="flex flex-row gap-8">
          <div className="rounded-lg w-[300px] h-[220px] items-start pt-8 px-4 pr-16">
                <h1 className="text-4xl font-bold">Easy</h1>
                <p className="text-sm font-semibold pt-6 text-slate-400 pb-4">Use Ethereum to make Insurance with ease</p>
                <Button className="bg-slate-900 text-white">Read More</Button>
            </div>
            <div className="bg-slate-600 rounded-lg w-[300px] h-[220px]">
                dfg
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="py-20">
          <div className="flex flex-col items-center gap-6 justify-center">
            <div className="text-black text-4xl font-bold">FAQ</div>
            <div className="text-black text-2xl font-bold">
              
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black">
        <div className="text-white py-20">
          <div className="flex flex-col items-center gap-6 justify-center">
            <div className="text-4xl font-bold">Sign up today</div>
            <Button className="bg-white text-black">Get Started</Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
