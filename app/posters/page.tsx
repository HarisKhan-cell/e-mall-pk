'use client';

import Link from 'next/link';
import { Sparkles, Gift, Truck, ShieldCheck, Building2, ShoppingBag, ArrowRight, Clock, CreditCard, CheckCircle2, UserPlus, Megaphone } from 'lucide-react';

export default function MarketingPostersPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1816] font-sans p-8 sm:p-12 space-y-12">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8521B]">E-Mall PK Marketing Studio</span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1816]">Official Social Media Ad Flyers</h1>
        <p className="text-xs text-[#66615C] max-w-xl mx-auto leading-relaxed">
          Press <strong className="text-[#C8521B]">Cmd + Shift + 4</strong> on your Mac to capture high-res screenshots of these flyer cards and post them on Instagram, TikTok, and WhatsApp Stories!
        </p>
      </div>

      {/* 4-Flyer Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* FLYER 1: INSTAGRAM STORY AD (CONSOLIDATED DELIVERY) */}
        <div className="bg-[#1A1816] text-white p-8 rounded-3xl space-y-6 border border-black shadow-2xl relative overflow-hidden flex flex-col justify-between">
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
            <p className="text-gray-400 text-xs max-w-xs mx-auto font-light">
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

        {/* FLYER 2: MERCHANT ONBOARDING PAMPHLET */}
        <div className="bg-white text-[#1A1816] p-8 rounded-3xl space-y-6 border border-[#E6E2D8] shadow-2xl relative overflow-hidden flex flex-col justify-between">
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
            <p className="text-[#66615C] text-xs max-w-xs mx-auto font-light">
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

        {/* FLYER 3: NEW! PREPAID FREE DELIVERY PROMO */}
        <div className="bg-gradient-to-br from-emerald-950 via-[#0a2318] to-black text-white p-8 rounded-3xl space-y-6 border border-emerald-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-emerald-500/20 pb-4">
            <span className="text-xs font-serif font-bold text-emerald-400">SPECIAL PROMO OFFER</span>
            <span className="bg-emerald-500 text-black text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">0 PKR Shipping</span>
          </div>

          <div className="space-y-3 text-center py-6">
            <span className="text-emerald-300 font-bold text-xs uppercase tracking-widest block">Pay via JazzCash / EasyPaisa / Bank</span>
            <h2 className="text-4xl font-serif leading-tight text-white">
              FREE DELIVERY <br />
              <span className="italic text-emerald-300 font-light">Across All Pakistan!</span>
            </h2>
            <p className="text-gray-300 text-xs max-w-xs mx-auto font-light leading-relaxed">
              Order any clothing or beauty article from Khaadi, Breakout, or LAMA and get 100% Free Shipping on prepaid orders!
            </p>
          </div>

          <div className="bg-black/50 border border-emerald-500/30 p-4 rounded-2xl text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest">Zero Shipping Fee Code:</span>
            <p className="text-xl font-black text-white font-mono">PREPAIDFREE</p>
          </div>

          <div className="pt-4 border-t border-emerald-500/20 text-center">
            <span className="text-xs font-bold text-emerald-300 block">emall-official.vercel.app</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Shop Free Delivery Now ➔</span>
          </div>
        </div>

        {/* FLYER 4: NEW! VIP 24-HOUR LAHORE EXPRESS DELIVERY */}
        <div className="bg-gradient-to-br from-amber-950 via-black to-zinc-950 text-white p-8 rounded-3xl space-y-6 border border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-amber-500/20 pb-4">
            <span className="text-xs font-serif font-bold text-amber-400">LAHORE VIP SERVICE</span>
            <span className="bg-amber-500 text-black text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">24H Express</span>
          </div>

          <div className="space-y-3 text-center py-6">
            <span className="text-amber-300 font-bold text-xs uppercase tracking-widest block">Need an Outfit for Tonight?</span>
            <h2 className="text-3xl font-serif leading-tight text-white">
              VIP 24-Hour Express <br />
              <span className="italic text-amber-200 font-light">Lahore Delivery</span>
            </h2>
            <p className="text-gray-300 text-xs max-w-xs mx-auto font-light leading-relaxed">
              Guaranteed same-day rider sourcing & dispatch directly to your doorstep in Lahore!
            </p>
          </div>

          <div className="bg-white/10 border border-amber-500/30 p-4 rounded-2xl text-xs space-y-1 text-amber-200">
            <p className="font-bold flex items-center justify-between">
              <span>Rider Dispatch Speed:</span>
              <strong className="text-white">Same-Day 24 Hours</strong>
            </p>
            <p className="font-bold flex items-center justify-between">
              <span>Express Delivery Fee:</span>
              <strong className="text-white">PKR 350</strong>
            </p>
          </div>

          <div className="pt-4 border-t border-amber-500/20 text-center">
            <span className="text-xs font-bold text-amber-300 block">emall-official.vercel.app</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Select "VIP Express" at Checkout ➔</span>
          </div>
        </div>

      </div>
    </div>
  );
}
