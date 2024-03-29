import { Lato } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Loginprovider } from '@/context/Login'
import { Cartprovider } from '@/context/Cart'
import { Orderprovider } from '@/context/Order'


const lato = Lato({ subsets: ['latin'] ,weight:['400','700'],display:'swap'})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.className}  bg-[#121212]`}>
        
        <Orderprovider>
        <Cartprovider>
        <Loginprovider>
        <Navbar/>
        {children}
        </Loginprovider>
        </Cartprovider>
        </Orderprovider>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </body>
    </html>
  )
}
