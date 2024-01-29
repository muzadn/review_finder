//Landing page
import Contact from "@/components/ContactForm"
import Footer from "@/components/Footer"
import Hero from '@/components/Hero'
import HowTo from "@/components/HowTo"
import Navbar from "@/components/Navbar"
import Simplify from "@/components/Simplify"
export default function Home() {
  const baseUrl= process.env.BASEURL
  return (
    <main className=' text-white  bg-gradient-to-br from-black to-slate-950 min-h-[100vh]' >
      <Navbar baseUrl ={baseUrl}/>
      <Hero />
      <HowTo />
      <Simplify />
      <Contact />
      <Footer />
    </main>
  )
}
