import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
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
