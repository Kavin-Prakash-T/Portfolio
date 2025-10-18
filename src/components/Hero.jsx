import React, { useState, useEffect } from "react";
import { ArrowDown, Mail, Linkedin, Github } from "lucide-react";
import { heroData } from "../data/hero";

export const Hero = ({ hasAnimated }) => {

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const { roles } = heroData;

  useEffect(() => {
    const currentRole = roles[currentTextIndex];
    if (!isDeleting) {
      //Typing effect
      if (currentText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentRole.slice(0, currentText.length + 1))
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        //wait before starting to delete
        const timeout = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(100);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      //Deleting effect
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, currentText.length - 1))
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        //Move to next word
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % roles.length);
        setTypingSpeed(150);
      }
    }
  }, [currentText, currentTextIndex, isDeleting, typingSpeed, roles]);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-20">
      {/*Background elements*/}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-600 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-600 rounded-full opacity-5 blur-3xl animate-pulse delay-500"></div>
      </div>

      {/*Grid Pattern*/}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center h-full flex flex-col justify-center">
        <div className={`transition-all duration-1000 ${hasAnimated.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} id="hero">
          {/*Greeting*/}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm font-medium animate-fade-in">
              {heroData.greeting}
            </span>
          </div>
          {/*Name */}
          <h1 className="text-5xl md:text-7xl leading-tight font-bold mb-4 bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent animate-fade-in-up">
            {heroData.name}
          </h1>
          {/*TypeWriter Role */}
          <div className="h-12  md:h-16 mb-6 flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-700">
              I'm a {''}
              <span className="relative">
                <span className="text-blue-600 font-bold">
                  {currentText}
                  <span className="animate-pulse"></span>
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to bg-purple-600"></span>
              </span>
            </h2>
          </div>
          {/*Description*/}
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            {heroData.description}
          </p>
          {/*CTA Buttons*/}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 animate-fade-in-up delay-300">
            {heroData.ctaButtons.map((button, index) => (
              <a href={button.href} key={index} className={`group relative px-5 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm ${button.varient === 'primary' ? 'bg-black text-white shadow-lg hover:shadow-xl hover:bg-gray-800' : 'border-2 border-black text-black hover:bg-black hover:text-white'}`}>
                {button.varient === 'primary' && (<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>)}
                <span className={button.varient === 'primary' ? 'relative z-10' : ''}>
                  {button.text}
                </span>
              </a>
            ))}
          </div>
          {/*Social links*/}
          <div className="flex justify-center space-x-6 mb-8 animate-fade-in-up delay-400">
            {heroData.socialLinks.map((social, index) => {
              const LeetIcon = (props) => (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="leetcode" {...props}>
                  <path d="M20.303 16.047h-9.561c-.936 0-1.697-.803-1.697-1.79s.762-1.79 1.697-1.79h9.561c.936 0 1.697.803 1.697 1.79s-.762 1.79-1.697 1.79zm-9.561-2.58c-.385 0-.697.354-.697.79s.312.79.697.79h9.561c.385 0 .697-.354.697-.79s-.312-.79-.697-.79h-9.561z"></path>
                  <path d="M11.618 24c-1.604 0-2.977-.533-3.97-1.541L3.55 18.278C2.551 17.262 2 15.819 2 14.215c0-1.578.551-3.008 1.552-4.025L13.071.509c.66-.67 1.829-.652 2.506.036.694.706.71 1.839.034 2.524l-1.762 1.816a5.25 5.25 0 0 1 1.739 1.159l2.463 2.53c.672.684.655 1.815-.039 2.521a1.79 1.79 0 0 1-1.284.545c-.464 0-.896-.181-1.219-.509l-2.536-2.492c-.321-.327-.779-.49-1.367-.49-.606 0-1.069.157-1.375.469l-4.067 4.194c-.342.349-.521.831-.521 1.4 0 .577.189 1.101.519 1.436l4.083 4.182c.315.321.774.484 1.362.484s1.045-.163 1.36-.484l2.549-2.505a1.687 1.687 0 0 1 1.209-.503h.002c.483 0 .939.194 1.286.546.693.705.71 1.837.036 2.522l-2.457 2.525C14.586 23.438 13.176 24 11.618 24zM14.29 1a.703.703 0 0 0-.507.21l-9.519 9.681C3.449 11.72 3 12.9 3 14.215c0 1.341.449 2.535 1.265 3.363l.001.001 4.097 4.18C9.162 22.57 10.288 23 11.618 23c1.288 0 2.444-.455 3.258-1.282l2.457-2.525c.295-.301.279-.804-.034-1.122a.801.801 0 0 0-.573-.247h-.001a.703.703 0 0 0-.502.209l-2.549 2.505c-.497.507-1.214.778-2.068.778s-1.572-.271-2.076-.784L5.446 16.35c-.519-.527-.805-1.286-.805-2.136 0-.824.286-1.57.806-2.099l4.067-4.194c.503-.512 1.206-.771 2.091-.771.854 0 1.571.271 2.074.783l2.536 2.492a.705.705 0 0 0 .512.216.798.798 0 0 0 .571-.246c.313-.319.33-.822.037-1.121l-2.461-2.528a4.238 4.238 0 0 0-2.028-1.137c-.175-.041-.331-.176-.382-.349s-.021-.363.104-.492l2.325-2.398c.298-.302.282-.805-.031-1.124A.799.799 0 0 0 14.29 1z"></path>
                </svg>
              );

              const IconComponent = social.icon === 'Github' ? Github : social.icon === 'Linkedin' ? Linkedin : social.icon === 'Mail' ? Mail : LeetIcon;

              return (
                <a key={index} href={social.url} className="group p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <IconComponent className="w-6 h-6 text-gray-700 group-hover:text-black transition-colors" />
                </a>)
            })}
          </div>
          {/*Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8 animate-fade-in-up delay-500">
            {heroData.stats.map((stat, index) => (
              <div className="text-center" key={index}>
                <div className="text-2xl font-bold text-black mb-1">
                  {stat.number}
                </div>
                <div className="text-xs text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          {/* Scroll Indicator*/}
          <div className="animate-bounce">
            <button onClick={scrollToAbout} className="group flex flex-col items-center text-gray-600 hover:text-black transition-colors cursor-pointer">
              <span className="text-sm mb-2">Learn More</span>
              <ArrowDown className="w-6 h6 group-hover:transform group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      {/*Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-blue-400 opacity-60 animate-float"></div>
      <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-purple-400 opacity-60 animate-float delay-1000"></div>
      <div className="absolute botttom-40 left-20 w-3 h-3 rounded-full bg-green-400 opacity-60 animate-float delay-2000"></div>
      <div className="absolute bottom-20 right-10 w-4 h-4 rounded-full bg-orange-400 opacity-60 animate-float delay-3000"></div>
    </section>
  )
}
