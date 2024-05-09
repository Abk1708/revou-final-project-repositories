import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroBackground from "../../assets/cameron-witney-Hero banner.webp"
import Section1 from './Section-1';
import Section2 from './Section-2';
import Section3 from './Section-3';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(heroRef.current, {
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: heroRef.current!,
        start: "bottom top",
        end: "top bottom",
        scrub: true,
        toggleActions: "play reverse play reverse"
      }
    });

    gsap.from(section1Ref.current, {
      opacity: 0,
      y: 500,
      duration: 1,
      scrollTrigger: {
        trigger: section1Ref.current!,
        start: "top bottom",
        end: "bottom top",
        scrub: false,
        toggleActions: "play reverse play reverse"
      }
    });

    gsap.from(section2Ref.current, {
      opacity: 0,
      y: 500,
      duration: 1,
      scrollTrigger: {
        trigger: section2Ref.current!,
        start: "top bottom",
        end: "bottom bottom",
        scrub: false,
        toggleActions: "play reverse play reverse"
      }
    });

    gsap.from(section3Ref.current, {
      opacity: 0,
      y:10,
      duration: 3,
      scrollTrigger: {
        trigger: section1Ref.current!,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        toggleActions: "play reverse play reverse"
      }
    });

  }, []);

  

  return (
    <div className='bg-slate-900'>
      <div
        className="flex bg-cover bg-center py-52"
        ref={heroRef}
        style={{
          backgroundImage: `url(${HeroBackground})`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              We Are, Tech For Village
            </h1>
            <p className="mt-4 text-lg leading-6 text-white">
              Empowering communities with technology for a brighter future. Because We Believe, Smart Technology is for Everyone.
            </p>
            <button
              className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 hover:animate-bounce"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div ref={section1Ref} className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Section 1
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-200">
          <Section1 />
        </p>
      </div>
      <div ref={section2Ref} className="bg-gray-400">
        <div className="text-center">
          <Section2 />
        </div>
      </div>
      <div ref={section3Ref} className="text-center">
        <p className="mt-4 text-lg leading-6 text-gray-200">
          <Section3 />
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
