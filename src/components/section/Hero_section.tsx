import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import HeroBackground from "../../assets/cameron-witney-Hero banner.jpg"


// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([null, null]); // Initialize sectionRefs
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([null, null]);

  useEffect(() => {
    if (!heroRef.current) return;

    // Define animation for the hero section
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top botom',
        end: 'bottom top',
        scrub: true
      }
    });

    heroTl.to(heroRef.current, { background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)' });

    // Define animations for each section
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const sectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top', 
          scrub: true
        }
      });

      
      sectionTl.fromTo(section, { opacity: 0, y: '20%' }, { opacity: 1, y: '0%' });

      // Animation for button in the first section
      if (index === 0) {
        const button = section.querySelector('button');
        if (button) {
          sectionTl.fromTo(button, { opacity: 0, y: '20%' }, { opacity: 1, y: '0%', duration: 1 }, '-=0.5');
        }
      }
    });

  }, []);

  return (
    <div className='flex flex-col'> 
      <div>
        <div
          className="bg-cover bg-center py-52"
          ref={heroRef}
          style={{
            backgroundImage: `url(${HeroBackground})`, // Use the imported photo file
          }}
          >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center relative z-10">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                We Are, Tech For Village
              </h1>
              <p className="mt-4 text-lg leading-6 text-white">
                Empowering communities with technology for a brighter future
                Because We Belive, Smart Technology is for Everyone
              </p>
              <button
              ref={(el) => buttonRefs.current[0] = el}
              className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 hover:animate-bounce">
                Learn More
              </button>
            </div>
        </div>
      </div>
      </div>
      <div ref={(el) => sectionRefs.current[0] = el} className="bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Section 1
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-200">
              Content of section 1 goes here...
            </p>
          </div>
        </div>
      </div>
      <div ref={(el) => sectionRefs.current[1] = el} className="bg-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Section 2
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-200">
              Content of section 2 goes here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
