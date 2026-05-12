import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Search, MapPin, Star, ArrowRight,
  Shield, Headphones, CreditCard,
  CheckCircle, ThumbsUp, Heart
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSearch } from '../components/shared/HeroSearch';
import { AISearch } from '../components/shared/AISearch';
import { testimonials } from '../../data/mockData';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../../features/listings/hooks';


const HERO_MAIN  = "https://images.unsplash.com/photo-1772475329901-58f77a9625ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3p5JTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yJTIwZGVzaWduJTIwd2FybXxlbnwxfHx8fDE3NzgyMjY5Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080";
const HERO_SIDE  = "https://images.unsplash.com/photo-1758396694032-88de60268524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMHByaXZhdGUlMjBwb29sJTIwZ2FyZGVuJTIwbWVkaXRlcnJhbmVhbnxlbnwxfHx8fDE3NzgyMjY5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const PARIS_IMG  = "https://images.unsplash.com/photo-1674560453743-270db1d82c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMEZyYW5jZSUyMEVpZmZlbCUyMFRvd2VyJTIwZXZlbmluZ3xlbnwxfHx8fDE3NzgyMjIyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const NY_IMG     = "https://images.unsplash.com/photo-1644530777878-f576db6ac8ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrJTIwTWFuaGF0dGFuJTIwc2t5bGluZSUyMG5pZ2h0fGVufDF8fHx8MTc3ODIyMjI3NHww&ixlib=rb-4.1.0&q=80&w=1080";
const BALI_IMG   = "https://images.unsplash.com/photo-1609601540898-52ca92508901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMG92ZXJ3YXRlciUyMGJ1bmdhbG93JTIwb2NlYW4lMjBzdW5yaXNlfGVufDF8fHx8MTc3ODIyNjkyOXww&ixlib=rb-4.1.0&q=80&w=1080";
const CABIN_IMG  = "https://images.unsplash.com/photo-1771230341444-0cd96608f17c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBjYWJpbiUyMGZvcmVzdCUyMHNub3clMjB3aW50ZXIlMjBjb3p5fGVufDF8fHx8MTc3ODIyNjkzMHww&ixlib=rb-4.1.0&q=80&w=1080";
const NAIROBI_IMG = "https://images.unsplash.com/photo-1502088513349-3ff6482aa816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOYWlyb2JpJTIwS2VueWElMjBzYWZhcmklMjBzYXZhbm5hfGVufDF8fHx8MTc3ODIyMjI3N3ww&ixlib=rb-4.1.0&q=80&w=1080";
const ROOFTOP_IMG = "https://images.unsplash.com/photo-1777113310184-140ff530f4dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwdGVycmFjZSUyMGNpdHklMjB2aWV3JTIwZXZlbmluZyUyMGRpbmluZ3xlbnwxfHx8fDE3NzgyMjY5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const HOST_IMG   = "https://images.unsplash.com/photo-1767487196225-ba9b9cb23f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBjb3VwbGUlMjBleHBsb3JpbmclMjBjaXR5JTIwd2Fsa2luZyUyMHN0cmVldHxlbnwxfHx8fDE3NzgyMjY5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080";

// ── Type filter tabs ──────────────────────────────────────────────────────────
const FILTERS = ['All', 'Villas', 'Apartments', 'Cabins', 'Beachfront', 'City Stays'];

// ── Place collections ─────────────────────────────────────────────────────────
const PLACES = [
  { city: 'Paris',    country: 'France',     img: PARIS_IMG,  count: '2,400+ places' },
  { city: 'New York', country: 'USA',         img: NY_IMG,     count: '3,800+ places' },
  { city: 'Bali',     country: 'Indonesia',   img: BALI_IMG,   count: '1,900+ places' },
  { city: 'Nairobi',  country: 'Kenya',       img: NAIROBI_IMG, count: '890+ places'  },
];

// ── How it works ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    icon: Search,
    title: 'Search your destination',
    desc: 'Browse thousands of curated homes by location, dates, and the number of guests.',
  },
  {
    num: '02',
    icon: CheckCircle,
    title: 'Choose and confirm',
    desc: 'Read honest reviews, check amenities, and book securely in just a few clicks.',
  },
  {
    num: '03',
    icon: ThumbsUp,
    title: 'Arrive and enjoy',
    desc: 'Your host is ready to welcome you. Our support team is available around the clock.',
  },
];

// ── Trust points ─────────────────────────────────────────────────────────────
const TRUST = [
  { icon: Shield,     title: 'Verified listings',  desc: 'Every property is manually reviewed before it goes live. No surprises.' },
  { icon: CreditCard, title: 'Safe payments',       desc: 'Pay through our encrypted platform. Your money is held until check-in.' },
  { icon: Headphones, title: 'Always-on support',   desc: 'Reach a real person any time — before, during, or after your stay.' },
];

export function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const { data: listings = [], isLoading } = useListings();

  const filtered = activeFilter === 'All'
    ? listings.slice(0, 8)
    : listings.filter(p =>
        p.type?.toLowerCase().includes(activeFilter.toLowerCase()) ||
        p.category?.toLowerCase().includes(activeFilter.toLowerCase())
      ).slice(0, 8);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif", color: '#1C1C1E' }}>
      <Navbar />

      <section style={{ background: '#F8F7F4' }}>
        <div className="max-w-[1760px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 lg:py-20">

          
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: '#FF5A5F' }}>
                Short & long-term rentals
              </p>
              <h1
                className="mb-6 tracking-tight"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: '#1C1C1E',
                }}
              >
                A place to stay,<br />wherever you go.
              </h1>
              <p className="mb-10 leading-relaxed" style={{ color: '#6C6C70', fontSize: '1.05rem', maxWidth: 440 }}>
                Over 10,000 hand-picked homes in 150+ cities. Search, compare, and book with complete confidence.
              </p>

            
              <HeroSearch  />
              <AISearch />

          
              <div className="flex items-center gap-6 mt-8 flex-wrap">
                {[
                  { val: '10K+', lab: 'Properties' },
                  { val: '150+', lab: 'Cities' },
                  { val: '50K+', lab: 'Guests hosted' },
                  { val: '4.9',  lab: 'Avg. rating' },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="font-extrabold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.2rem', color: '#1C1C1E' }}>{s.val}</p>
                    <p className="text-xs" style={{ color: '#8E8E93' }}>{s.lab}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: photo collage */}
            <div className="hidden lg:grid grid-cols-2 gap-4 h-[520px]">
              <div className="rounded-2xl overflow-hidden h-full">
                <img src={HERO_MAIN} alt="Interior" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="rounded-2xl overflow-hidden flex-1">
                  <img src={HERO_SIDE} alt="Villa" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden flex-1">
                  <img src={ROOFTOP_IMG} alt="Rooftop" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ──────────────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: '#EBEBEB' }}>
        <div className="max-w-[1760px] mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-2 overflow-x-auto py-4" style={{ scrollbarWidth: 'none' }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-150"
                style={
                  activeFilter === f
                    ? { background: '#1C1C1E', color: '#FFFFFF' }
                    : { background: 'transparent', color: '#6C6C70', border: '1.5px solid #E5E5E5' }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROPERTY GRID ────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 lg:px-16">
        <div className="max-w-[1760px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1.6rem', color: '#1C1C1E' }}>
              {activeFilter === 'All' ? 'Our top picks' : activeFilter}
            </h2>
            <Link
              to="/listings"
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
              style={{ color: '#FF5A5F' }}
            >
              Browse all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-[#F0F0F0] rounded-2xl mb-3" style={{ aspectRatio: '4/3' }} />
                  <div className="h-4 bg-[#F0F0F0] rounded mb-2 w-3/4" />
                  <div className="h-3 bg-[#F0F0F0] rounded mb-2 w-1/2" />
                  <div className="h-3 bg-[#F0F0F0] rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center py-16" style={{ color: '#8E8E93' }}>No listings found for this filter.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {filtered.map(p => (
                <Link key={p.id} to={`/property/${p.id}`} className="group block">
                  {/* Photo */}
                  <div
                    className="relative rounded-2xl overflow-hidden mb-3"
                    style={{ aspectRatio: '4/3' }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {/* Type label */}
                    <span
                      className="absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.92)', color: '#1C1C1E' }}
                    >
                      {p.type}
                    </span>
                    {/* Wishlist heart */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!isAuthenticated) {
                          navigate('/signin');
                          return;
                        }
                        if (isInWishlist(p.id)) {
                          removeFromWishlist(p.id);
                        } else {
                          addToWishlist(p.id);
                        }
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                      style={{ background: isInWishlist(p.id) ? '#FF5A5F' : 'rgba(255,255,255,0.9)' }}
                    >
                      <Heart
                        className="w-4 h-4"
                        style={{
                          fill: isInWishlist(p.id) ? 'white' : 'none',
                          color: isInWishlist(p.id) ? 'white' : '#1C1C1E',
                          strokeWidth: 1.8
                        }}
                      />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <p
                      className="font-semibold text-sm line-clamp-1"
                      style={{ color: '#1C1C1E', fontFamily: "'Inter', sans-serif" }}
                    >
                      {p.title}
                    </p>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="w-3.5 h-3.5" style={{ fill: '#F5A623', color: '#F5A623' }} />
                      <span className="text-xs font-semibold" style={{ color: '#1C1C1E' }}>{p.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm mb-0.5" style={{ color: '#8E8E93' }}>{p.location}</p>
                  <p className="text-sm" style={{ color: '#8E8E93' }}>{p.reviews} reviews</p>
                  <p className="text-sm mt-1.5">
                    <span className="font-bold" style={{ color: '#1C1C1E' }}>${p.price}</span>
                    <span style={{ color: '#8E8E93' }}> / night</span>
                  </p>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:bg-[#1C1C1E] hover:text-white hover:border-[#1C1C1E]"
              style={{ borderColor: '#1C1C1E', color: '#1C1C1E' }}
            >
              View all properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-16" style={{ background: '#F8F7F4' }}>
        <div className="max-w-[1760px] mx-auto">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: '#FF5A5F' }}>Simple process</p>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1.8rem', color: '#1C1C1E' }}>
              How StayBnb works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-5">
              
                <div className="shrink-0">
                  <span
                    className="block font-extrabold leading-none"
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: '3rem', color: '#FF5A5F' }}
                  >
                    {step.num}
                  </span>
                </div>
                <div className="pt-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: '' }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: '#FF5A5F' }} />
                  </div>
                  <h3
                    className="font-semibold mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif", color: '#1C1C1E', fontSize: '1rem' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6C6C70' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-[1760px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: '#FF5A5F' }}>Around the world</p>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1.8rem', color: '#1C1C1E' }}>
                Popular destinations
              </h2>
            </div>
            <Link to="/listings" className="hidden md:flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#FF5A5F' }}>
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {PLACES.map((pl, i) => (
              <Link
                key={i}
                to="/listings"
                className="group relative block rounded-2xl overflow-hidden"
                style={{ aspectRatio: '3/4' }}
              >
                <img
                  src={pl.img}
                  alt={pl.city}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 55%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.1rem' }}>{pl.city}</p>
                  <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>{pl.country}</p>
                  <p className="text-xs mt-2 font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{pl.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIST YOUR SPACE ──────────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-16" style={{ background: '#F8F7F4' }}>
        <div className="max-w-[1760px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img src={HOST_IMG} alt="Hosting" className="w-full h-full object-cover" />
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: '#FF5A5F' }}>For property owners</p>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                  lineHeight: 1.15,
                  color: '#1C1C1E',
                }}
              >
                Turn your space<br />into steady income.
              </h2>
              <p className="mb-8 leading-relaxed" style={{ color: '#6C6C70', fontSize: '1rem', maxWidth: 420 }}>
                List your property for free and start welcoming guests within days. You set the rules, the price, and the availability — we handle the rest.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { val: '$2,400', lab: 'Avg. monthly income' },
                  { val: '72 hrs',  lab: 'Time to first booking' },
                  { val: '0%',     lab: 'Listing fee' },
                  { val: '98%',    lab: 'Host satisfaction' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{ background: '#FFFFFF', border: '1.5px solid #E5E5E5' }}
                  >
                    <p
                      className="font-extrabold mb-0.5"
                      style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.4rem', color: '#1C1C1E' }}
                    >
                      {s.val}
                    </p>
                    <p className="text-xs" style={{ color: '#8E8E93' }}>{s.lab}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/host/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: '#1C1C1E' }}
              >
                Start listing your space <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-[1760px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: '#FF5A5F' }}>Why StayBnb</p>
              <h2
                className="mb-6"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1.8rem', color: '#1C1C1E', lineHeight: 1.25 }}
              >
                Built with travellers<br />and hosts in mind.
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: '#6C6C70', maxWidth: 400 }}>
                We designed StayBnb to remove the friction from travel — from your first search to the moment you unlock the door.
              </p>
              <div className="space-y-6">
                {TRUST.map((t, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: '' }}
                    >
                      <t.icon className="w-5 h-5" style={{ color: '#FF5A5F' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1" style={{ color: '#1C1C1E', fontFamily: "'Poppins', sans-serif" }}>
                        {t.title}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: '#6C6C70' }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img src={CABIN_IMG} alt="Cabin" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  <img src={BALI_IMG} alt="Bali" className="w-full h-full object-cover" />
                </div>
                {/* Stat card */}
                <div
                  className="rounded-2xl p-5 flex-1 flex flex-col justify-center"
                  style={{ background: '#1C1C1E' }}
                >
                  <p
                    className="text-white font-extrabold mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: '2rem' }}
                  >
                    4.9 / 5
                  </p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Average guest rating across all stays</p>
                  <div className="flex gap-0.5 mt-3">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4" style={{ fill: '#F5A623', color: '#F5A623' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-16" style={{ background: '#F8F7F4' }}>
        <div className="max-w-[1760px] mx-auto">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: '#FF5A5F' }}>From our guests</p>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1.8rem', color: '#1C1C1E' }}>
              Real stays, honest words.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-7"
                style={{ border: '1.5px solid #EBEBEB' }}
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4" style={{ fill: '#F5A623', color: '#F5A623' }} />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: '#3C3C3E', fontStyle: 'italic', lineHeight: 1.75 }}
                >
                  "{t.comment}"
                </p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid #F2F2F2' }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: '#1C1C1E' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#1C1C1E' }}>{t.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#8E8E93' }}>{t.location} · {t.property}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="pt-14 pb-8 px-6 lg:px-16 bg-white border-t border-[#EBEBEB]" id="contact">
        <div className="max-w-[1760px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: '#FF5A5F' }}
                >
                  <span className="text-white font-extrabold text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>S</span>
                </div>
                <span className="font-extrabold text-lg" style={{ fontFamily: "'Poppins', sans-serif", color: '#1C1C1E' }}>
                  Stay<span style={{ color: '#FF5A5F' }}>Bnb</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: '#8E8E93' }}>
                Hand-picked properties in 150+ cities. Built for travellers who care about quality and comfort.
              </p>
              <div className="flex gap-2.5">
                {['📷', '🐦', '📘', '💼'].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-[#EBEBEB] text-[#8E8E93] hover:border-[#FF5A5F] hover:text-[#FF5A5F] transition-colors text-lg"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#1C1C1E' }}>Explore</p>
              <ul className="space-y-3">
                {['All Listings', 'Beachfront', 'Mountain Cabins', 'City Apartments', 'Luxury Villas'].map((item, i) => (
                  <li key={i}>
                    <Link to="/listings" className="text-sm text-[#6C6C70] hover:text-[#FF5A5F] transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#1C1C1E' }}>Company</p>
              <ul className="space-y-3">
                {['About', 'Careers', 'Press', 'Blog', 'Partners'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-[#6C6C70] hover:text-[#FF5A5F] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#1C1C1E' }}>Contact</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5 text-sm text-[#6C6C70]">
                  <span className="w-4 h-4 shrink-0 text-[#FF5A5F] text-center">✉</span>
                  hello@staybnb.com
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#6C6C70]">
                  <span className="w-4 h-4 shrink-0 text-[#FF5A5F] text-center">📞</span>
                  +250 788 123 456
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#6C6C70]">
                  <MapPin className="w-4 h-4 shrink-0 text-[#FF5A5F]" />
                  Kigali, Rwanda
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-lg px-3 py-2.5 text-sm outline-none text-[#1C1C1E] bg-[#F7F7F7] border border-[#E5E5E5] focus:border-[#FF5A5F] transition-colors"
                />
                <button
                  className="px-4 py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ background: '#FF5A5F' }}
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#EBEBEB]">
            <p className="text-xs text-[#8E8E93]">© 2026 StayBnb Inc. All rights reserved.</p>
            <div className="flex items-center gap-5 text-xs text-[#8E8E93]">
              <a href="#" className="hover:text-[#1C1C1E] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#1C1C1E] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#1C1C1E] transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}