"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const carRef = useRef(null);
  const boxesRef = useRef([]);
  const trailRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
      },
    });

    //Car + Green Sync Animation
    tl.fromTo(
      carRef.current,
      { x: -150 },
      {
        x: () =>
         const maxX = sectionRef.current.offsetWidth - carRef.current.offsetWidth; 
         return Math.min(maxX, window.innerWidth - carRef.current.offsetWidth + 200);
        ease: "none",
        onUpdate: function () {
          const carX = gsap.getProperty(carRef.current, "x");

          gsap.set(trailRef.current, {
            width: carX + carRef.current.offsetWidth / 2,
          });
        },
      }
    );

    // 📦 Boxes animation (unchanged)
    tl.to(
      boxesRef.current,
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.5,
      },
      "-=0.5"
    );

  }, []);

  const text = "WELCOME  ITZFIZZ";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#d1d1d1]"
    >
      <div className="relative w-full h-screen flex items-center justify-center">

        {/* Black Strip */}
        <div className="absolute top-1/2 left-0 w-full h-50 -translate-y-1/2 bg-black overflow-hidden">

          {/* Green Reveal */}
          <div
            ref={trailRef}
            className="absolute left-0 top-0 h-full w-0 bg-green-400 flex items-center justify-center overflow-hidden"
          >
            <h1 className="text-9xl font-bold text-black tracking-tight whitespace-nowrap">
              {text}
            </h1>
          </div>
        </div>

        {/* Car */}
        <img
          ref={carRef}
          src="/car.png"
          alt="car"
          className="absolute top-1/2 left-0 w-[400px] -translate-y-1/2 z-20"
        />

        {/* Boxes */}
        {[
          { number: "58%", text: "Increase in pick up point use", pos: "bg-[#def54f] top-10 right-1/3" },
          { number: "23%", text: "Decreased in customer phone calls", pos: "bg-[#6ac9ff] bottom-10 right-1/3" },
          { number: "27%", text: "Increase in pick up point use", pos: "bg-[#333] text-white top-10 right-10" },
          { number: "40%", text: "Decreased in customer phone calls", pos: "bg-[#fa7328] bottom-10 right-12" },
        ].map((box, i) => (
          <div
            key={i}
            ref={(el) => (boxesRef.current[i] = el)}
            className={`absolute ${box.pos} p-6 rounded-2xl shadow-xl opacity-0 translate-y-10`}>
              <div className={`text-[60px] font-bold ${box.number === "27%" ? "text-white" : "text-black"}`}>{box.number}</div>
              <div className={`text-[18px] mt-2 ${ box.number === "27%" ? "text-white" : "text-black"}`}>{box.text}</div>
          </div>
        ))}

      </div>
    </section>
  );
}
