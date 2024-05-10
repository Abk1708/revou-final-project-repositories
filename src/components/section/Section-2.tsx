import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import section2Image from '../../assets/mariana-proenca-mG8sgwkMhCY-unsplash.webp';
import imageContent from '../../assets/4851530.png'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Section2 = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current } }
    );

    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: leftRef.current } }
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
        backgroundImage: `url(${section2Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div ref={leftRef} className="w-1/2 pr-8">
        {/* Left side content (image container) */}
        <img src={imageContent} className="rounded-xl ml-5" alt="section-image" />
      </div>
      <div ref={rightRef} className="w-1/2 pl-8 text-white">
        {/* Right side content (descriptions) */}
        <div className="text-lg mb-8 bg-black mr-5 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Find Us Anywhere
            <FontAwesomeIcon icon={faLocationDot} style={{color: "red",}} className='w[50px] h-[50px]' />
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar lacinia sapien, eget varius lectus molestie nec.
            Fusce pellentesque malesuada felis, vel pharetra dui facilisis ut. Vivamus interdum mauris a lectus rhoncus, vitae auctor ligula ultricies.
          </p>
        </div>
        <div className="text-lg bg-black mr-5 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Empowering Villages with Technology</h2>
          <p>
            Integer blandit mollis purus, id faucibus velit pulvinar sit amet. Nulla facilisi. Phasellus vel massa mauris.
            Cras aliquam tempor orci, vitae commodo libero tincidunt nec. Sed sollicitudin nisi nec pretium tempus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section2;
