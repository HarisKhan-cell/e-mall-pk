'use client';

import Link from 'next/link';
import { Sparkles, Gift, Truck, ShieldCheck, Building2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function MarketingPostersPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1816] font-sans p-8 space-y-12">
      <div className="max-w-4xl mx-auto text-center space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8521B]">E-Mall PK Marketing Studio</span>
        <h1 className="text-3xl font-serif">Social Media Ad Flyers (Screenshot & Post)</h1>
        <p className="text-xs text-gray-500">Take high-res screenshots of these flyer cards to upload to Instagram, Facebook & WhatsApp Stories!</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* FLYER 1: INSTAGRAM STORY AD (1080x1920 Style) */}
        <div className="bg-[#1A1816] text-white p-8 rounded-3xl space-y-6 border border-black shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-xs font-serif font-bold text-[#C8521B]">E-MALL PAKISTAN</span>
            <span className="bg-[#C8521B] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">Official Ad</span>
          </div>

          <div className="space-y-3 text-center py-6">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest block">Stop Paying Triple Shipping!</span>
            <h2 className="text-3xl font-serif leading-tight">
              Khaadi. Breakout. Outfitters. <br />
              <span className="italic text-amber-200">One Single Delivery.</span>
            </h2>
            <p className="text-gray-400 text-xs max-w-xs mx-auto">
              Why pay 3 separate delivery fees? Shop all your favorite brands in ONE consolidated box!
            </p>
          </div>

          <div className="bg-white/10 border border-white/10 p-4 rounded-2xl space-y-2 text-xs">
            <p className="flex items-center gap-2 text-emerald-300 font-bold">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>FREE Shipping on Prepaid Orders</span>
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              <Truck className="w-4 h-4 text-[#C8521B]" />
              <span>VIP 24H Lahore Express COD Available</span>
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% Original Brand Guarantee</span>
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 text-center">
            <span className="text-xs font-bold text-amber-300 block">emall-official.vercel.app</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Shop Live Store Now ➔</span>
          </div>
        </div>

        {/* FLYER 2: SELLER RECRUITMENT PAMPHLET */}
        <div className="bg-white text-[#1A1816] p-8 rounded-3xl space-y-6 border border-[#E6E2D8] shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center border-b border-[#E6E2D8] pb-4">
            <span className="text-xs font-serif font-bold text-[#C8521B]">MERCHANT ONBOARDING</span>
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">Boutique Partner</span>
          </div>

          <div className="space-y-3 text-center py-6">
            <span className="text-[#C8521B] font-bold text-xs uppercase tracking-widest block">Calling Lahore & Pakistan Boutiques!</span>
            <h2 className="text-3xl font-serif leading-tight">
              Sell Your Clothes on <br />
              <span className="italic text-gray-600">E-Mall Pakistan</span>
            </h2>
            <p className="text-[#66615C] text-xs max-w-xs mx-auto">
              Get listed alongside Khaadi & Breakout. We handle delivery & Cash on Delivery collection across Pakistan!
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E6E2D8] p-4 rounded-2xl space-y-2 text-xs text-[#1A1816]">
            <p className="font-bold flex items-center gap-2">✓ 10% Sourcing & Marketing Commission</p>
            <p className="font-bold flex items-center gap-2">✓ 1-Click WhatsApp Onboarding</p>
            <p className="font-bold flex items-center gap-2">✓ Consolidated Single-Box Fulfillment</p>
          </div>

          <div className="pt-4 border-t border-[#E6E2D8] text-center">
            <span className="text-xs font-bold text-[#C8521B] block">emall-official.vercel.app</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Click "Become a Seller" to Apply ➔</span>
          </div>
        </div>

      </div>
    </div>
  );
}
