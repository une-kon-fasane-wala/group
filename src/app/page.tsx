"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Menu, X, Download, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Head from 'next/head';  // Import the Head component

const members = [
  { name: 'Koustav', photo: 'https://i.imgur.com/YQE9nMS.jpeg', details: 'Student, Loves Nature' },
  { name: 'Arghyadeep', photo: 'https://i.imgur.com/MRPCFBc.jpeg', details: 'Student, Enthusiast' },
  { name: 'Ashwas', photo: 'https://i.imgur.com/xPaDKo9.jpeg', details: 'Student, KFC Lover' },
  { name: 'Sanai', photo: 'https://i.imgur.com/ejDO0E5.jpeg', details: 'Student, Loves Simplicity' },
  { name: 'Arka', photo: 'https://i.imgur.com/j9XybpE.jpeg', details: 'Student, Would Be Entrepreneur' },
  { name: 'Shreyas', photo: 'https://i.imgur.com/f8LmeR9.jpeg', details: 'Student, Stock Market Lover' },
  { name: 'Sounak', photo: 'https://i.imgur.com/tNajXy8.jpeg', details: 'Student, Anime Aficionado' },
  { name: 'Saikat', photo: 'https://i.imgur.com/YL4sqdn.jpeg', details: 'Student, Deep Thinker' },
  { name: 'Aishik', photo: 'https://i.imgur.com/7OZmpFt.jpeg', details: 'Student, Cool Guy' }
];

const files = [
  { name: 'KOUSTAV_FRONT_PAGE', url: 'https://drive.google.com/uc?export=download&id=1mXtej9p1gvBTn1ALLblXtE6XkYoCby7u', preview: 'https://i.imgur.com/b1WYfFF.png' },
  { name: 'ARGHYA_FRONT_PAGE', url: 'https://drive.google.com/uc?export=download&id=13wwngdnw25sTijAwdq8dv_K-RhqWE45a', preview: 'https://i.imgur.com/b1WYfFF.png' },
  { name: 'ASHWAS_FRONT_PAGE', url: 'https://drive.google.com/uc?export=download&id=1j0HoSPxBd36SCSRHon1bUGBnDJfxiPAT', preview: 'https://i.imgur.com/b1WYfFF.png' },
  { name: 'SANAI_FRONT_PAGE', url: 'https://drive.google.com/uc?export=download&id=176LsWrb-q3b7neu6--QtjSCzb5WIas68', preview: 'https://i.imgur.com/b1WYfFF.png' },
  { name: 'ARKA_FRONT_PAGE', url: 'https://drive.google.com/uc?export=download&id=1hoGVUifm3p1vwllpJfZ0hkZ3eKrKYe4Y', preview: 'https://i.imgur.com/b1WYfFF.png' },
  { name: 'SHREYAS_FRONT_PAGE', url: 'https://drive.google.com/uc?export=download&id=1ReSDUNKBNV7SI1H0TYq1Botm9elvyqLp', preview: 'https://i.imgur.com/b1WYfFF.png' },
  { name: 'SOUNAK_FRONT_PAGE', url: 'https://drive.google.com/uc?export=download&id=194F7tK5zvltz-lfLyLNx8zIZ_3V5HgEJ', preview: 'https://i.imgur.com/b1WYfFF.png' },
  { name: 'AISHIK_FRONT_PAGE', url: 'https://drive.google.com/uc?export=download&id=1GK8IwonDV1IXCNsnvGvW_vomzq16aABN', preview: 'https://i.imgur.com/b1WYfFF.png' }
];

const galleryImages = [
  'https://i.imgur.com/pVxtH2u.jpeg',
  'https://i.imgur.com/l2S72eJ.jpeg',
  'https://i.imgur.com/3rY8N3Z.jpeg',
  'https://i.imgur.com/xXHqxzp.jpeg',
  'https://i.imgur.com/7JsZDnZ.jpeg'
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Gallery state
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [membersRef, membersInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [filesRef, filesInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [galleryRef, galleryInView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'members', 'files', 'gallery'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 50; // Adjusted offset for mobile compatibility
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Meta tags using Head */}
      <Head>
        <title>UNE KON FASANE WALA</title>
        <meta name="description" content="A modern and advanced group website where you can stay connected and share moments." />
        <meta name="keywords" content="UNE KON FASANE WALA, UNEKONFASANEWALA, UNEKON FASANEWALA, group, members, files, gallery, connect, collaboration" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="UNE KON FASANE WALA - Group Website" />
        <meta property="og:description" content="Stay connected and share your best memories with the group." />
        <meta property="og:image" content="/images/social-sharing.jpg" />  {/* Image for social sharing */}
        <meta property="og:url" content="http://localhost:3000" />  {/* Your actual URL */}
        <meta property="og:type" content="website" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UNE KON FASANE WALA - Group Website" />
        <meta name="twitter:description" content="Stay connected and share your best memories with the group." />
        <meta name="twitter:image" content="/images/social-sharing.jpg" />
      </Head>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-b-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl font-bold rounded-lg px-2 py-1 bg-gray-800">
              UNE KON<span className="text-purple-500"> FASANE WALA</span>
            </h1>
          </motion.div>
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Members', 'Files', 'Gallery'].map((item) => (
              <motion.button
                key={item}
                className={`text-lg rounded-full px-4 py-2 transition-colors hover:bg-purple-500 ${
                  activeSection === item.toLowerCase() ? 'bg-purple-500' : 'bg-gray-800'
                }`}
                onClick={() => scrollToSection(item.toLowerCase())}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.button>
            ))}
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-full">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-64 bg-gray-800 shadow-lg p-6 rounded-l-lg"
          >
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="rounded-full">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="mt-8 flex flex-col space-y-4">
              {['Home', 'Members', 'Files', 'Gallery'].map((item) => (
                <motion.button
                  key={item}
                  className={`text-lg rounded-full px-4 py-2 transition-colors hover:bg-purple-500 ${
                    activeSection === item.toLowerCase() ? 'bg-purple-500' : 'bg-gray-700'
                  }`}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 opacity-50 rounded-b-3xl"></div>
          <motion.div
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Stay Connected, Share Moments
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              ❤ Welcome to our Official Website ❤
              <br />
              ~ Simplified Sharing for Enhanced Collaboration ~
            </p>
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300"
              onClick={() => scrollToSection('members')}
            >
              Explore Members
            </Button>
          </motion.div>
          <div className="absolute inset-0 z-0 rounded-b-3xl">
            <div className="absolute inset-0 bg-[url('/img/hero-bg.jpg')] bg-cover bg-center opacity-20 rounded-b-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-b-3xl"></div>
          </div>
        </section>

        {/* Notices Section */}
        <section className="py-4 bg-gray-800 rounded-xl my-6 mx-4">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2 text-purple-400">Recent Notices</h2>
            <div className="overflow-hidden bg-gray-700 rounded-lg p-4">
              <p className="animate-marquee whitespace-nowrap text-lg">
                HAPPY NEW YEAR 2025 🥳🎊🥳
                <span className="mx-8">|</span>
                NEET 2025 is Coming!!!
                <span className="mx-8"></span>
              </p>
            </div>
          </div>
        </section>

        {/* Members Section */}
        <section id="members" ref={membersRef} className="py-12 bg-gray-900 rounded-xl my-6 mx-4">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-4xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={membersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Meet Our Members
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {members.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={membersInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    width={400}
                    height={300}
                    layout="responsive"
                  />
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="mt-2 text-gray-400">{member.details}</p>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant="outline"
                        className="mt-4 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:from-yellow-500 hover:to-pink-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg"
                      >
                        View Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 text-white rounded-lg">
                      <DialogHeader>
                        <DialogTitle>{member.name}</DialogTitle>
                      </DialogHeader>
                      <Image
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-60 object-cover rounded-lg mb-4"
                        width={400}
                        height={300}
                      />
                      <p>{member.details}</p>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Files Section */}
        <section id="files" ref={filesRef} className="py-12 bg-gray-900 rounded-xl my-6 mx-4">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-4xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={filesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Important Documents
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={filesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    width={400}
                    height={300}
                    layout="responsive"
                  />
                  <h3 className="text-2xl font-bold">{file.name}</h3>
                  <Button
                    size="sm"
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg"
                    onClick={() => window.open(file.url, '_blank')}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" ref={galleryRef} className="py-12 bg-gray-900 rounded-xl my-6 mx-4">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-4xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Group Memories
            </motion.h2>
            <div className="relative flex items-center justify-center">
              {/* Previous Image Button */}
              <motion.button
                onClick={prevImage}
                className="gallery-nav-button absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-purple-500 hover:bg-purple-700 p-3 rounded-full shadow-lg transition-transform focus:outline-none focus:ring-4 focus:ring-purple-500"
                whileHover={{ scale: 1.05, y: "-10%" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>

              {/* Image with Transition */}
              <div className="w-full h-96 relative overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={galleryImages[currentImageIndex]}
                      alt={`Gallery Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain rounded-2xl"
                      width={600}
                      height={400}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Next Image Button */}
              <motion.button
                onClick={nextImage}
                className="gallery-nav-button absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-purple-500 hover:bg-purple-700 p-3 rounded-full shadow-lg transition-transform focus:outline-none focus:ring-4 focus:ring-purple-500"
                whileHover={{ scale: 1.05, y: "-10%" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 rounded-t-3xl">
        <div className="container mx-auto px-4 text-center">
          {/* Footer Brand */}
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-teal-500 hover:from-teal-500 hover:to-green-400 transition-all duration-300 ease-in-out">
              UNE KON
            </span>
            <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-purple-500 transition-all duration-300 ease-in-out">
              FASANE WALA
            </span>
          </h2>
          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:scale-110 transition-transform">
              <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
            </a>
          </div>
          {/* Footer Copy */}
          <p className="text-sm text-gray-400">
            &copy; 2024 Crafted by Koustav Ghosh ❤ All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
