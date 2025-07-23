import React, { useState, useEffect } from "react";

const sections = [
  {
    id: "web",
    title: "Web",
    description:
      "Create an account to report incidents, track updates, and view crime maps",
    image: "/assets/HWIW1.png",
  },
  {
    id: "mobile",
    title: "Mobile App",
    description: "Upload photos/videos and get real-time notifications",
    image: "/assets/HWIW2.png",
  },
  {
    id: "ivr",
    title: "IVR Call",
    description:
      "Dial our toll-free number 0801GATEWAYSHIELD and report by voice (coming soon)",
    image: "/assets/HIW4.png",
  },
  {
    id: "anonymous",
    title: "Prefer to stay anonymous?",
    description:
      "You can choose to hide your identity when reporting via Web, Mobile App or SMS. We'll still route your report without revealing who you are.",
    image: "/assets/HIW5.png",
  },
];

function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sections.length);
    }, 5000);
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const setActiveSection = (id) => {
    const index = sections.findIndex((section) => section.id === id);
    setActiveIndex(index);
  };

  const activeSection = sections[activeIndex];

  return (
    <div className="bg-[linear-gradient(45deg,_#4338ca,_#4f46e5)] w-full py-20 flex flex-col items-center justify-center" id="How-it-Works">
      <div className="w-full max-w-4xl text-center px-4 md:px-0">
        <h1 className="text-white font-semibold text-[16px] mb-3">
          How it Works
        </h1>
        <p className="text-4xl font-semibold text-white mb-5">
          4 ways to take action, wherever you are.
        </p>
        <span className="text-lg text-white font-normal block">
          Whether you have a smartphone or not, you can report incidents, send
          an SOS alert, or follow updates in real-time.
        </span>
      </div>

      <div className="hidden md:flex md:flex-row items-start justify-start gap-10 mt-20 w-full px-6 md:px-20 lg:px-40">
        <div className="md:w-1/2 flex flex-col">
          {sections.map((section, index) => (
            <div
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`cursor-pointer p-3 rounded-md transition-all ${
                index === activeIndex ? "text-white" : "opacity-70"
              }`}
            >
              <h2
                className={`font-semibold text-[20px] ${
                  index === activeIndex ? "text-white" : "text-gray-300"
                }`}
              >
                {section.title}
              </h2>
              <p
                className={`text-[16px] ${
                  index === activeIndex ? "text-white" : "text-gray-400"
                }`}
              >
                {section.description}
              </p>
            </div>
          ))}
        </div>

        <div className="md:w-1/2 flex items-start justify-center">
          <img
            src={activeSection.image}
            alt={activeSection.id}
            className="w-full h-auto object-contain transition-all duration-500 ease-in-out"
          />
        </div>
      </div>
      <div className="hidden md:block px-4 lg:px-[336px] text-center mt-[80px]">
        <p className="text-[#D5D7DA] text-[20px]">Each report is securely routed from state command to the appropriate officer for follow-up, with updates sent to you along the way.</p>
      </div>
      <div className="block md:hidden w-full mt-12 px-4">
        {sections?.map((section, id) => (
          <div className="w-full flex flex-col items-center justify-center mb-12" key={id}>
            <img src={section.image} alt="" className="" />
            <p className="text-[20px] text-white font-semibold mt-5">{section.title}</p>
            <span className="text-[16px] text-white font-normal text-center">
              {section.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
