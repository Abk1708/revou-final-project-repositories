import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import section3Image from '../../assets/agricultural-researcher-with-tablet-slowly-inspect-plants.webp';

const Section3 = () => {
  const sectionRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current } }
    );

    gsap.fromTo(
      rightRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: rightRef.current } }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex items-center justify-center py-16"
      style={{
        backgroundImage: `url(${section3Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className="w-1/2"></div>
      <div ref={rightRef} className="w-1/2 pr-8 flex justify-end">
        {/* Right side content (descriptions) */}
        <div className="flex flex-col w-96 h-100 justify-end items-center bg-slate-900 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-8">
          <div className="text-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Empowering Villages with Technology</h2>
            <p className='text-xl'>
              Integer blandit mollis purus, id faucibus velit pulvinar sit amet. Nulla facilisi. Phasellus vel massa mauris.
              Cras aliquam tempor orci, vitae commodo libero tincidunt nec. Sed sollicitudin nisi nec pretium tempus.
            </p>
          </div>
          <div className="text-lg">
            <p className="text-xl mb-4">"Technology is best when it brings people together"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
