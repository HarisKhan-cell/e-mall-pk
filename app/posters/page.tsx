'use client';

import Link from 'next/link';
import { Sparkles, Gift, Truck, ShieldCheck, Building2, ShoppingBag, ArrowRight, Clock, CreditCard, CheckCircle2, UserPlus, Megaphone, Flame, Camera } from 'lucide-react';

function EMallLogoSymbolLarge() {
  return (
    <svg className="w-16 h-16 mx-auto" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 32V8H22C25.3137 8 28 10.6863 28 14C28 17.3137 25.3137 20 22 20H14" stroke="#C8521B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 20V32M14 20H24C27.3137 20 30 22.6863 30 26C30 29.3137 27.3137 32 24 32H8" stroke="#1A1816" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="10" r="3.5" fill="#D49A37" />
    </svg>
  );
}

export default function MarketingPostersPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1816] font-sans p-8 sm:p-12 space-y-12">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8521B]">E-Mall PK Marketing Studio</span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1816]">Official Brand Assets & Profile Pictures</h1>
        <p className="text-xs text-[#66615C] max-w-xl mx-auto leading-relaxed">
          Use <strong className="text-[#C8521B]">Windows Key + Shift + 4</strong> (or Mac Screenshot App) to capture these official profile picture avatars & flyers for Instagram, TikTok, & WhatsApp!
        </p>
      </div>

      {/* SECTION 1: INSTAGRAM & TIKTOK OFFICIAL PROFILE PICTURE AVATARS */}
      <div className="max-w-5xl mx-auto bg-white border border-[#E6E2D8] rounded-3xl p-8 sm:p-10 shadow-sm space-y-6 text-center">
        <div>
          <span className="bg-amber-100 text-amber-900 border border-amber-200 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
            <Camera className="w-3.5 h-3.5 text-amber-800" />
            <span>Instagram & TikTok Profile Pictures</span>
          </span>
          <h2 className="text-2xl font-serif text-[#1A1816]">Official Brand Avatar Logos</h2>
          <p className="text-xs text-[#66615C] mt-1">Take a square screenshot of either avatar below to upload as your official profile picture!</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-4">
          
          {/* AVATAR 1: DARK LUXURY */}
          <div className="space-y-3">
            <div className="w-72 h-72 sm:w-80 sm:h-80 bg-[#090807] border-4 border-amber-500/40 rounded-full p-6 flex flex-col items-center justify-center text-center shadow-2xl space-y-3 relative mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-amber-500/30 flex items-center justify-center shadow-inner">
                <EMallLogoSymbolLarge />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-white tracking-widest uppercase">E-MALL <span className="text-[#C8521B]">PK</span></h3>
                <span className="text-[9px] text-amber-400 uppercase tracking-[0.2em] font-mono block mt-0.5">Digital Mall</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-gray-500 block">Dark Luxury Profile Picture</span>
          </div>

          {/* AVATAR 2: EDITORIAL LIGHT IVORY */}
          <div className="space-y-3">
            <div className="w-72 h-72 sm:w-80 sm:h-80 bg-[#FAF8F5] border-4 border-[#1A1816] rounded-full p-6 flex flex-col items-center justify-center text-center shadow-2xl space-y-3 relative mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-white border border-[#E6E2D8] flex items-center justify-center shadow-sm">
                <EMallLogoSymbolLarge />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-[#1A1816] tracking-widest uppercase">E-MALL <span className="text-[#C8521B]">PK</span></h3>
                <span className="text-[9px] text-[#C8521B] uppercase tracking-[0.2em] font-mono block mt-0.5">Digital Mall</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-gray-500 block">Editorial Cream Profile Picture</span>
          </div>

        </div>
      </div>

      {/* SECTION 2: 5-FLYER GALLERY GRID */}
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* FLYER 1: FEATURED "COMING SOON / BRAND TEASER" FLYER */}
        <div className="bg-gradient-to-br from-[#121110] via-[#1A1816] to-black text-white p-10 sm:p-14 rounded-3xl space-y-8 border border-amber-500/40 shadow-2xl relative overflow-hidden text-center">
          
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="bg-amber-500 text-black font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 mx-auto">
              <Flame className="w-3.5 h-3.5 text-black" />
              <span>OFFICIAL BRAND TEASER • COMING SOON</span>
            </span>
          </div>

          {/* Logo & Big Title */}
          <div className="space-y-4 py-4">
            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-amber-500/30 flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/20">
              <EMallLogoSymbolLarge />
            </div>

            <div className="space-y-1">
              <h2 className="text-4xl sm:text-6xl font-serif tracking-wider text-white">E-MALL PAKISTAN</h2>
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.3em] text-amber-400 uppercase block">
                PAKISTAN'S 1ST CONSOLIDATED DIGITAL MALL
              </span>
            </div>
          </div>

          {/* Hype Body Text */}
          <p className="text-gray-300 text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed">
            Skip the mall rush. Your favorite brand stores live here now—<strong>Khaadi, Breakout, Outfitters & Sapphire</strong> in 1 consolidated digital destination.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-300 font-medium">
            <span className="bg-white/10 border border-white/15 px-4 py-2 rounded-full font-bold">1 Cart</span>
            <span className="bg-white/10 border border-white/15 px-4 py-2 rounded-full font-bold">1 Consolidated Box</span>
            <span className="bg-white/10 border border-white/15 px-4 py-2 rounded-full font-bold">1 Delivery Fee</span>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-1">
            <span className="text-sm font-extrabold text-amber-300 block tracking-widest">emall-official.vercel.app</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Get Ready for the Biggest Launch ➔</span>
          </div>
        </div>

        {/* 4 CARDS GRID BELOW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* FLYER 2: INSTAGRAM STORY AD (CONSOLIDATED DELIVERY) */}
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

          {/* FLYER 3: MERCHANT ONBOARDING PAMPHLET */}
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

          {/* FLYER 4: PREPAID FREE DELIVERY PROMO */}
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

          {/* FLYER 5: VIP 24-HOUR LAHORE EXPRESS DELIVERY */}
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
    </div>
  );
}