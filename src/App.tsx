import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Star, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  ChevronRight,
  Scissors,
  Sparkles,
  Heart,
  Calendar,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Service, Appointment } from './types';

// --- Components ---

const ReviewsPage = () => {
  const reviews = [
    { name: "Priya S.", rating: 5, comment: "Best salon in Tiruppur! The staff is so professional and the bridal makeup was exactly what I wanted. Highly recommend for anyone looking for quality service.", date: "2 weeks ago" },
    { name: "Arun Kumar", rating: 5, comment: "Great experience for men's grooming. Very clean and the stylists really know their work. The head massage was very relaxing.", date: "1 month ago" },
    { name: "Meera R.", rating: 5, comment: "I've been coming here for 3 years. Consistent quality and very reasonable pricing. The threading is painless and perfect every time.", date: "3 days ago" },
    { name: "Suresh V.", rating: 4, comment: "Good service and friendly staff. The wait time was a bit long on the weekend, but the haircut was worth it.", date: "1 month ago" },
    { name: "Deepa K.", rating: 5, comment: "Amazing facial treatments! My skin feels so refreshed. The gold facial is a must-try for special occasions.", date: "2 months ago" },
    { name: "Karthik R.", rating: 5, comment: "Professional stylists and premium products. The hair coloring was exactly the shade I wanted. Very satisfied.", date: "3 weeks ago" },
  ];

  return (
    <div className="py-24 space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-serif">Customer <span className="text-gold italic">Reviews</span></h1>
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-1 text-gold">
            {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
          </div>
          <p className="text-salon-black font-bold text-xl">4.9 ★ (1700+ Reviews on Google)</p>
          <p className="text-salon-black/60 max-w-2xl mx-auto">We take pride in our service quality. Read what our valued customers have to say about their experience at STYLE PLUZ.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-salon-pink p-10 rounded-[2.5rem] border border-gold/5 space-y-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-1 text-gold">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-xs text-salon-black/40 font-medium uppercase tracking-widest">{review.date}</span>
              </div>
              <p className="text-salon-black/70 italic leading-relaxed text-lg">"{review.comment}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <span className="font-bold text-salon-black">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center space-y-8">
          <p className="text-salon-black/60">Want to share your experience?</p>
          <a 
            href="https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID" 
            target="_blank" 
            className="inline-flex items-center gap-3 bg-white border-2 border-salon-black px-10 py-4 rounded-full font-bold hover:bg-salon-black hover:text-white transition-all"
          >
            Write a Google Review
          </a>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-salon-black rounded-full flex items-center justify-center">
              <Scissors className="text-gold w-6 h-6" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">STYLE PLUZ</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gold",
                  location.pathname === link.path ? "text-gold" : "text-salon-black/70"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/book"
              className="bg-salon-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gold transition-all duration-300 shadow-lg shadow-black/10"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-salon-black border-b border-black/5"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/book"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-salon-black text-white px-6 py-4 rounded-xl mt-4 font-medium"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-salon-black text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <Scissors className="text-salon-black w-5 h-5" />
            </div>
            <span className="text-xl font-serif font-bold">STYLE PLUZ</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Premium family salon in Tiruppur offering expert hair styling, grooming, and bridal services. Experience the art of beauty.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/services" className="hover:text-gold transition-colors">Our Services</Link></li>
            <li><Link to="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            <li><Link to="/admin" className="hover:text-gold transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Contact Info</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-gold shrink-0" />
              <span>5/1277 Palanisamy Nagar, Boyampalayam Pirivu, PN Rd, Tiruppur, TN 641602</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-gold shrink-0" />
              <span>095851 63330</span>
            </li>
            <li className="flex items-center space-x-3">
              <Clock size={18} className="text-gold shrink-0" />
              <span>Daily: 9:00 AM – 9:00 PM</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Newsletter</h4>
          <p className="text-sm text-white/60 mb-4">Subscribe for special offers and beauty tips.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 w-full text-sm focus:outline-none focus:border-gold"
            />
            <button className="bg-gold text-salon-black px-4 py-2 rounded-r-lg text-sm font-bold hover:bg-white transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-8 text-center text-xs text-white/40">
        <p>&copy; {new Date().getFullYear()} STYLE PLUZ Family Salon. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data.slice(0, 4)));
  }, []);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920" 
            alt="Salon Interior" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gold/20 backdrop-blur-md border border-gold/30 px-4 py-2 rounded-full text-gold text-sm font-medium">
              <Star size={14} fill="currentColor" />
              <span>4.9 Rating (1700+ Reviews)</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight">
              Redefine Your <span className="italic text-gold">Style</span>
            </h1>
            <p className="text-lg text-white/80 max-w-lg leading-relaxed">
              Experience premium grooming and beauty services at Tiruppur's most trusted family salon. Professional stylists, affordable luxury.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/book" 
                className="bg-gold text-salon-black px-8 py-4 rounded-full font-bold text-center hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-gold/20"
              >
                Book Appointment
              </Link>
              <div className="flex gap-4">
                <a 
                  href="tel:09585163330" 
                  className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-center hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={18} /> Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Happy Clients', value: '10k+' },
            { label: 'Expert Stylists', value: '15+' },
            { label: 'Google Rating', value: '4.9 ★' },
            { label: 'Years Experience', value: '12+' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 rounded-3xl bg-salon-pink border border-gold/10"
            >
              <div className="text-3xl font-serif font-bold text-salon-black mb-2">{stat.value}</div>
              <div className="text-sm text-salon-black/50 uppercase tracking-widest font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif">Our Signature <span className="text-gold italic">Services</span></h2>
            <p className="text-salon-black/60 max-w-xl">From precision haircuts to luxurious facials, we offer a full range of beauty and grooming services tailored for the whole family.</p>
          </div>
          <Link to="/services" className="text-gold font-bold flex items-center gap-2 hover:gap-4 transition-all">
            View All Services <ChevronRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white border border-black/5 hover:border-gold/30 transition-all flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-gold shadow-lg">
                  {i === 0 && <Scissors size={20} />}
                  {i === 1 && <Sparkles size={20} />}
                  {i === 2 && <Heart size={20} />}
                  {i === 3 && <User size={20} />}
                </div>
              </div>
              <div className="p-8 space-y-4 flex-grow flex flex-col">
                <h3 className="text-xl font-serif font-bold">{service.name}</h3>
                <p className="text-sm text-salon-black/60 line-clamp-2 flex-grow">{service.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-black/5">
                  <span className="text-gold font-bold">Starts {service.price}</span>
                  <Link to="/book" className="text-xs font-bold uppercase tracking-widest text-salon-black hover:text-gold transition-colors">Book Now</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="bg-salon-black py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif">Salon <span className="text-gold italic">Gallery</span></h2>
            <p className="text-white/60 max-w-xl mx-auto">Take a look at our modern space and some of our recent transformations.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800"
            ].map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden"
              >
                <img src={img} alt="Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/gallery" className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-salon-black transition-all">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-serif">What Our <span className="text-gold italic">Clients Say</span></h2>
          <div className="flex items-center justify-center space-x-1 text-gold">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            <span className="ml-2 text-salon-black font-bold">4.9/5.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Priya S.", comment: "Best salon in Tiruppur! The staff is so professional and the bridal makeup was exactly what I wanted.", date: "2 weeks ago" },
            { name: "Arun Kumar", comment: "Great experience for men's grooming. Very clean and the stylists really know their work.", date: "1 month ago" },
            { name: "Meera R.", comment: "I've been coming here for 3 years. Consistent quality and very reasonable pricing.", date: "3 days ago" }
          ].map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-salon-pink p-8 rounded-3xl relative"
            >
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white">
                <MessageCircle size={16} />
              </div>
              <p className="text-salon-black/70 italic mb-6 leading-relaxed">"{review.comment}"</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">{review.name}</span>
                <span className="text-xs text-salon-black/40">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-salon-black rounded-[3rem] p-12 md:p-24 text-center text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <h2 className="text-4xl md:text-6xl font-serif max-w-2xl mx-auto leading-tight">Ready for Your <span className="text-gold">Transformation?</span></h2>
          <p className="text-white/60 max-w-lg mx-auto">Book your appointment today and experience the STYLE PLUZ difference.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/book" className="bg-gold text-salon-black px-10 py-4 rounded-full font-bold hover:bg-white transition-all">
              Book Appointment
            </Link>
            <a href="https://wa.me/919585163330" className="bg-emerald-500 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  const categories = ['All', ...new Set(services.map(s => s.category))];
  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="py-24 space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-serif">Our <span className="text-gold italic">Services</span></h1>
        <p className="text-salon-black/60 max-w-2xl mx-auto">Discover our wide range of professional beauty and grooming services. We use premium products and the latest techniques for the best results.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all border",
                activeCategory === cat 
                  ? "bg-salon-black text-white border-salon-black" 
                  : "bg-white text-salon-black border-black/10 hover:border-gold"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, i) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border border-black/5 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all group flex flex-col"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-salon-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    {service.category}
                  </span>
                </div>
              </div>
              <div className="p-10 space-y-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-serif font-bold">{service.name}</h3>
                  <span className="text-xl font-bold text-gold">{service.price}</span>
                </div>
                <p className="text-salon-black/60 text-sm leading-relaxed flex-grow">{service.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-black/5">
                  <div className="flex items-center text-xs text-salon-black/40">
                    <Clock size={14} className="mr-2 text-gold" /> {service.duration}
                  </div>
                  <Link to="/book" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-salon-black hover:text-gold transition-colors">
                    Book Now <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BookingPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service_id: '',
    date: '',
    time: '',
    stylist: '',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center space-y-6 p-12 bg-salon-pink rounded-[3rem] border border-gold/20"
        >
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold">Booking Received!</h2>
          <p className="text-salon-black/60">Thank you, {formData.name}. Your appointment request has been received. We will contact you shortly to confirm.</p>
          <Link to="/" className="inline-block bg-salon-black text-white px-8 py-3 rounded-full font-bold">Back to Home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif">Book Your <span className="text-gold italic">Visit</span></h1>
            <p className="text-salon-black/60 text-lg">Fill out the form to request an appointment. Our team will review your request and get back to you within 30 minutes during business hours.</p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-salon-pink rounded-2xl flex items-center justify-center text-gold shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Call for Urgent Bookings</h4>
                <p className="text-salon-black/60 text-sm">Need a same-day appointment? Give us a call directly.</p>
                <a href="tel:09585163330" className="text-gold font-bold mt-2 inline-block">095851 63330</a>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-salon-pink rounded-2xl flex items-center justify-center text-gold shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Operating Hours</h4>
                <p className="text-salon-black/60 text-sm">We are open every day to serve you better.</p>
                <p className="text-salon-black font-medium mt-2">9:00 AM – 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-black/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-salon-black/40">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-salon-pink/50 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-salon-black/40">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-salon-pink/50 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-salon-black/40">Service</label>
              <select 
                required
                className="w-full bg-salon-pink/50 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-gold appearance-none"
                value={formData.service_id}
                onChange={e => setFormData({...formData, service_id: e.target.value})}
              >
                <option value="">Select a service</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.name} - {s.price}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-salon-black/40">Date</label>
                <input 
                  required
                  type="date" 
                  className="w-full bg-salon-pink/50 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-salon-black/40">Time</label>
                <input 
                  required
                  type="time" 
                  className="w-full bg-salon-pink/50 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-salon-black/40">Notes (Optional)</label>
              <textarea 
                rows={3}
                className="w-full bg-salon-pink/50 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
                placeholder="Any special requests or stylist preference?"
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
              ></textarea>
            </div>

            <button 
              disabled={status === 'loading'}
              type="submit" 
              className="w-full bg-salon-black text-white py-4 rounded-xl font-bold hover:bg-gold transition-all disabled:opacity-50"
            >
              {status === 'loading' ? 'Processing...' : 'Request Appointment'}
            </button>
            
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-500 text-sm justify-center">
                <AlertCircle size={16} /> Something went wrong. Please try again or call us.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      });
  };

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchAppointments();
  };

  if (loading) return <div className="p-24 text-center">Loading dashboard...</div>;

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <div className="bg-salon-pink px-4 py-2 rounded-lg text-sm font-medium border border-gold/10">
            Total Bookings: {appointments.length}
          </div>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-3xl overflow-hidden shadow-xl shadow-black/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-salon-pink/50 border-b border-black/5">
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-salon-black/40">Customer</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-salon-black/40">Service</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-salon-black/40">Date & Time</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-salon-black/40">Status</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-salon-black/40">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {appointments.map(app => (
              <tr key={app.id} className="hover:bg-salon-pink/20 transition-colors">
                <td className="p-6">
                  <div className="font-bold">{app.name}</div>
                  <div className="text-xs text-salon-black/40">{app.phone}</div>
                </td>
                <td className="p-6">
                  <div className="text-sm">{app.service_name}</div>
                </td>
                <td className="p-6">
                  <div className="text-sm font-medium">{app.date}</div>
                  <div className="text-xs text-salon-black/40">{app.time}</div>
                </td>
                <td className="p-6">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    app.status === 'pending' && "bg-amber-100 text-amber-700",
                    app.status === 'confirmed' && "bg-emerald-100 text-emerald-700",
                    app.status === 'rejected' && "bg-red-100 text-red-700"
                  )}>
                    {app.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex gap-2">
                    {app.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => updateStatus(app.id, 'confirmed')}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button 
                          onClick={() => updateStatus(app.id, 'rejected')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && (
          <div className="p-20 text-center text-salon-black/40">No appointments found.</div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

const GalleryPage = () => {
  const [filter, setFilter] = useState('All');
  const images = [
    { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800", category: "Interior" },
    { url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800", category: "Interior" },
    { url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800", category: "Haircuts" },
    { url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800", category: "Haircuts" },
    { url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800", category: "Bridal" },
    { url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800", category: "Bridal" },
    { url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800", category: "Customer Results" },
    { url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800", category: "Customer Results" },
  ];

  const categories = ['All', 'Interior', 'Haircuts', 'Bridal', 'Customer Results'];
  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <div className="py-24 space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-serif">Salon <span className="text-gold italic">Gallery</span></h1>
        <p className="text-salon-black/60 max-w-2xl mx-auto">A glimpse into our world of beauty and style. See our latest transformations and our modern salon space.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all border",
                filter === cat 
                  ? "bg-salon-black text-white border-salon-black" 
                  : "bg-white text-salon-black border-black/10 hover:border-gold"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div
                layout
                key={img.url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer"
              >
                <img 
                  src={img.url} 
                  alt={img.category} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pb-24 space-y-24">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1920" 
            alt="About Us" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif">Our <span className="text-gold italic">Story</span></h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Founded on the principles of excellence, STYLE PLUZ has been Tiruppur's premier destination for beauty and grooming for over a decade.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif">Excellence in Every <span className="text-gold italic">Detail</span></h2>
            <p className="text-salon-black/60 leading-relaxed">
              At STYLE PLUZ Family Salon, we believe that beauty is an art form. Our mission is to provide world-class grooming services that empower our clients and enhance their natural style. 
            </p>
            <p className="text-salon-black/60 leading-relaxed">
              We combine traditional techniques with modern trends to ensure every visit is a transformative experience. Our commitment to hygiene, skill, and customer satisfaction has earned us a reputation as the most trusted salon in Tiruppur.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-salon-pink rounded-3xl space-y-2">
              <h4 className="font-bold text-gold">100% Hygiene</h4>
              <p className="text-xs text-salon-black/50">Sanitized tools and clean environment for your safety.</p>
            </div>
            <div className="p-6 bg-salon-pink rounded-3xl space-y-2">
              <h4 className="font-bold text-gold">Expert Staff</h4>
              <p className="text-xs text-salon-black/50">Certified stylists with years of industry experience.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1000" 
            alt="Stylist at work" 
            className="rounded-[3rem] shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold rounded-full flex items-center justify-center text-salon-black text-center p-6 shadow-xl">
            <div className="font-serif font-bold italic text-xl">12+ Years of Excellence</div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif">Meet Our <span className="text-gold italic">Experts</span></h2>
          <p className="text-salon-black/60 max-w-xl mx-auto">The talented hands behind your favorite transformations.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Rahul Sharma", role: "Master Stylist", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" },
            { name: "Anjali Devi", role: "Bridal Specialist", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
            { name: "Suresh Raj", role: "Grooming Expert", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
            { name: "Priya Mani", role: "Skin Care Expert", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" },
          ].map((member, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="space-y-4 text-center"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-xl">{member.name}</h4>
                <p className="text-gold text-sm font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="py-24 space-y-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-serif">Contact <span className="text-gold italic">Us</span></h1>
        <p className="text-salon-black/60 max-w-2xl mx-auto">Have a question or want to book a special service? Reach out to us through any of the channels below.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-salon-pink p-8 rounded-3xl space-y-4 border border-gold/10">
            <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-white">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold">Call Us</h3>
            <p className="text-salon-black/60 text-sm">Our team is available daily for bookings and inquiries.</p>
            <a href="tel:09585163330" className="text-lg font-bold block">095851 63330</a>
          </div>

          <div className="bg-salon-pink p-8 rounded-3xl space-y-4 border border-gold/10">
            <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-white">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold">Visit Us</h3>
            <p className="text-salon-black/60 text-sm">5/1277 Palanisamy Nagar, Boyampalayam Pirivu, PN Rd, Tiruppur, TN 641602</p>
            <a href="https://maps.google.com" target="_blank" className="text-gold font-bold text-sm flex items-center gap-2">Get Directions <ChevronRight size={16} /></a>
          </div>

          <div className="bg-salon-pink p-8 rounded-3xl space-y-4 border border-gold/10">
            <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-white">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold">Hours</h3>
            <div className="space-y-2 text-sm text-salon-black/60">
              <div className="flex justify-between">
                <span>Monday - Sunday</span>
                <span className="font-bold text-salon-black">9:00 AM - 9:00 PM</span>
              </div>
              <p className="text-[10px] italic">Open on all public holidays except major festivals.</p>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-2 bg-white border border-black/5 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-black/5">
          <h3 className="text-3xl font-serif font-bold mb-8">Send an <span className="text-gold italic">Inquiry</span></h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-salon-black/40">Name</label>
              <input type="text" className="w-full bg-salon-pink/50 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-gold" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-salon-black/40">Email</label>
              <input type="email" className="w-full bg-salon-pink/50 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-gold" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-salon-black/40">Subject</label>
              <input type="text" className="w-full bg-salon-pink/50 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-gold" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-salon-black/40">Message</label>
              <textarea rows={4} className="w-full bg-salon-pink/50 border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"></textarea>
            </div>
            <button className="md:col-span-2 bg-salon-black text-white py-4 rounded-xl font-bold hover:bg-gold transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Embed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[500px] rounded-[3rem] overflow-hidden border border-black/5 shadow-xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.881451048689!2d77.341111!3d11.121111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907a7e3a1e3a1%3A0x1a1a1a1a1a1a1a1a!2sSTYLE%20PLUZ%20Family%20Salon!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-gold/30">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919585163330?text=Hi, I would like to book an appointment at STYLE PLUZ Family Salon."
        className="fixed bottom-8 right-8 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-white text-salon-black px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
