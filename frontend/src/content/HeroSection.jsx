import * as React from "react";

export function HeroSection() {
  return (
    <section id="hero" className="w-full pt-40 pb-8 md:pt-40 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left Section: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={require("../assets/a.jpg")}
              alt="Affordability representation"
              className="w-4/5 md:w-3/4 h-auto rounded-xl drop-shadow-2xl"
            />
          </div>

          {/* Right Section: Text Content */}
          <div className="w-full ml-16 md:w-1/2 md:ml-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 pr-20">
              Optimize Your Smart Home Energy with Intelligent Insights
            </h2>
            <p className="text-sm md:text-base text-gray-700 pr-40">
              Transform your energy management with our advanced chatbot. Designed for smart homes, it analyzes your energy data, provides actionable insights, and helps you predict and optimize consumption. Simply upload your data, chat for insights, and take control of your energy usage like never before.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}