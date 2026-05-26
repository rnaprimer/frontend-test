'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import { createOrder, verifyPayment } from '@/services/api'
import ExploreNavbar from "@/components/explore/ExploreNavbar";

export default function BuyPage() {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      const order = await createOrder();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "rzp_test_Sc946dIKfIiSAX",
        amount: order.amount,
        currency: "INR",
        name: "Potato",
        description: "Premium Potato",
        order_id: order.id,

        handler: async function (response: any) {
          try {
            await verifyPayment(response);
            alert("Payment Successful 🚀");
          } catch (err) {
            alert("Payment verification failed");
          }
        },

        theme: { color: "#111" }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false)
    }
  };

  return (
    <main className="w-full min-h-[100dvh] bg-white flex flex-col md:flex-row items-center justify-center p-8 overflow-hidden">
      <ExploreNavbar />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Left Side - Image Showcase */}
      <div className="flex-[1.2] lg:flex-[1.5] flex items-center justify-center w-full h-full p-4 relative">
        <div className="relative w-full max-w-[1000px] aspect-[4/3] md:aspect-square scale-110 lg:scale-125 mt-10 md:mt-0">
          <Image
            src="/buy.webp"
            alt="Potato Buy"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Side - Buy Button */}
      <div className="flex-1 lg:flex-[0.8] flex flex-col items-center justify-center p-4">
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`
            relative group w-full max-w-[240px] sm:max-w-[280px] py-4 sm:py-5
            bg-[#b4ff29] border-[3px] border-black rounded-full
            text-black font-black text-xl sm:text-2xl tracking-wide
            shadow-[0px_6px_0px_0px_rgba(0,0,0,1)]
            transition-all duration-150 ease-in-out
            ${loading ? 'opacity-70 cursor-not-allowed shadow-[0px_3px_0px_0px_rgba(0,0,0,1)] translate-y-[3px]' : 'active:translate-y-[6px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:bg-[#a5f319]'}
          `}
        >
          {loading ? 'PROCESSING' : 'BUY NOW'}
        </button>
      </div>
    </main>
  )
}
