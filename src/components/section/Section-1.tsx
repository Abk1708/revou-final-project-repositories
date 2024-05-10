import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import section1Image from '../../assets/noah-buscher-G0m9kKvkkB8-unsplash.jpg';
import SDG from '../../assets/E_SDG_logo_without_UN_emblem_Square_WEB.png.png'
import ourVisionImage from '../../assets/OurVision.svg'; // Replace with your actual image
import ourGoals from '../../assets/OurGoals.png'; // Replace with your actual image
import peopole from '../../assets/peopole.png'

type CardProps = {
  title: string;
  content: string;
  frontImage: string;
  backImage: string;
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
        gsap.fromTo(
          headerRef.current,
          { width: 0 },
          { width: '100%', duration: 1.5, ease: 'power4.inOut', delay: 0.5 }
        );
      },
    });
  }, []);

  const Card = ({ title, content, frontImage, backImage }: CardProps) => {
    const [isFlipped, setIsFlipped] = useState(true);

    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };

    return (
      <div className={`bg-white bg-opacity-25 rounded-lg p-8 shadow-xl transform perspective-origin-center transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`} onClick={handleClick}>
        <div className={`card-side card-front ${isFlipped ? 'hidden' : 'block'}`}>
          <div className="mb-4">
            <img src={frontImage} alt="Front" className="w-full rounded-lg" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <p className="text-lg mb-4">{content}</p>
        </div>
        <div className={`card-side card-back ${isFlipped ? 'block' : 'hidden'}`}>
          <img src={backImage} alt="Back" className="w-full rounded-lg" />
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${section1Image})`, backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white">
        <h1
          ref={headerRef}
          className="text-4xl md:text-6xl font-bold mb-4 py-5 overflow-hidden"
          style={{ whiteSpace: 'nowrap' }}
        >
          Empowering Villages with Technology
        </h1>
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-5">
          {/* Card 1 */}
          <Card
            title="We Have A Mission"
            content="Our mission is to provide comprehensive technology education to remote communities, ensuring that everyone has the opportunity to learn and benefit from technological advancements."
            frontImage={ourGoals}
            backImage={SDG}
          />

          {/* Card 2 */}
          <Card
            title="Our vision"
            content="Our vision is to create opportunities for economic growth and development in remote regions through technology. We aim to empower individuals and communities to build sustainable futures for themselves."
            frontImage={ourVisionImage}
            backImage={SDG}
          />

          {/* Card 3 */}
          <Card
            title="We Do It For Them"
            content="By bringing technology to remote areas, we seek to foster innovation and creativity within these communities, enabling them to solve local challenges and contribute to global progress."
            frontImage={peopole}
            backImage={SDG}
          />
        </div>
      </div>
    </section>
  );
};

export default Section1;
