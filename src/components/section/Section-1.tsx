import {  useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import section1Image from "../../assets/noah-buscher-G0m9kKvkkB8-unsplash.jpg";
import sampleImage from "../../assets/ZeroHunger.png"; // Replace with your actual image

type CardProps = {
  title: string;
  content: string;
};


const Section1 = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current } }
    );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      onEnter: () => {
        // Animate the section header as if it's being typed
        gsap.fromTo(
          headerRef.current,
          { width: 0 },
          { width: "100%", duration: 1.5, ease: "power4.inOut", delay: 0.5 }
        );
      },
    });
  }, []);

  const Card = ({ title, content }:CardProps) => {
    const [isFlipped, setIsFlipped] = useState(true);

    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };

    return (
      <div className={`bg-white bg-opacity-25 rounded-lg p-8 shadow-xl transform perspective-origin-center transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`} onClick={handleClick}>
        <div className={`card-side card-front ${isFlipped ? 'hidden' : 'block'}`}>
          <div className="mb-4">
            <img src={sampleImage} alt="Sample" className="w-full rounded-lg" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <p className="text-lg mb-4">{content}</p>
        </div>
        <div className={`card-side card-back ${isFlipped ? 'block' : 'hidden'}`}>
          <img src={sampleImage} alt="Sample" className="w-full rounded-lg" />
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${section1Image})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white">
        <h1
          ref={headerRef}
          className="text-4xl md:text-6xl font-bold mb-4 py-5 overflow-hidden"
          style={{ whiteSpace: "nowrap" }}
        >
          Empowering Villages with Technology
        </h1>
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-5">
          {/* Card 1 */}
          <Card
            title="Card 1 Title"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at lobortis mauris. Fusce tristique nisi vel."
          />

          {/* Card 2 */}
          <Card
            title="Card 2 Title"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at lobortis mauris. Fusce tristique nisi vel."
          />

          {/* Card 3 */}
          <Card
            title="Card 3 Title"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at lobortis mauris. Fusce tristique nisi vel."
          />
        </div>
      </div>
    </section>
  );
}

export default Section1;
