import { useEffect } from 'react';
import { Link } from "react-router-dom";
import React from 'react';
import logo from '../assets/images/highlight.gif';
import logo1 from '../assets/images/chatbot.gif';
import logo2 from '../assets/images/generator.gif';
import image from '../assets/images/OPEN AI (1).png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css'

export default function Home() {
    useEffect(() =>{
        AOS.init({duration:1000});
    },[])
    return (
        <div>
            <div class="mt-[-38px] bg-gradient-to-r from-black via-purple-950 to-black h-screen">
                <div className="relative w-20 h-20 overflow-hidden filter blur-sm">
                    <div className="w-40 h-40 bg-gradient-to-r from-black to-purple-900 rounded-full absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 "></div>
                </div>

                <div className="w-12 h-12 bg-gradient-to-r from-black to-purple-900 rounded-full absolute top-[20vh] left-[20vw] filter blur-sm"></div>
                <div className="w-12 h-12 bg-gradient-to-r from-black to-purple-900 rounded-full absolute top-[36vh] left-[36vw] filter blur-[2px]"></div>
                <div className="w-12 h-12 bg-gradient-to-r from-black to-purple-900 rounded-full absolute top-[80vh] left-[30vw] filter blur-sm"></div>
                <div className="w-[80px] h-[80px] bg-gradient-to-r from-black to-purple-900 rounded-full absolute top-[65vh] left-[10vw] filter blur"></div>
                <div className="w-[100px] h-[100px] bg-gradient-to-r from-purple-500 to-black rounded-full absolute top-[70vh] left-[75vw] blur-[1.5px]"></div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-900 to-black rounded-full absolute top-[20vh] left-[60vw] filter blur-sm"></div>
                <div className="w-[200px] h-[200px] bg-gradient-to-r from-purple-900 to-black rounded-full absolute top-[5vh] left-[80vw] filter blur-sm"></div>
                
                <h1 className="font-grotesk text-[100px] text-white font-medium text-center mt-[25vh]" data-aos="zoom-in" data-aos-duration="2000">Before You Sign</h1>
                <p className="font-grotesk text-[25px] text-white text-center mt-10 " data-aos="zoom-in" data-aos-duration="2000"> Know Completely, Don't Guess</p>
                
                <Link to="/search" className='flex justify-center'><button className="bg-white text-center text-black mt-20 text-xl rounded-lg hover:text-white hover:bg-gradient-to-r from-black via-purple-900 to-black" data-aos="zoom-in" data-aos-duration="3000">Get Started</button></Link>

            </div>

            <p className="font-grotesk text-[60px] text-center font-extrabold mt-20 color-white mx-10" data-aos="zoom-in"><span class="text-purple-800 text-[65px]">Unlocking</span> Legal Insights</p>

            <div className="text-center">
                <div className="flex items-center">
                    <div className="ml-[20vw] mt-20 h-[200px] w-[200px]" data-aos="fade-right"><img src={logo} alt='loading gif'/></div>
                    <p className="font-sharpgrotesk text-[25px] font-semibold text-left mt-20 color-white mx-[5vw]" data-aos="fade-left">The above GIF tells you how the<br/>important points are getting highlighted.</p> 
                </div>

                <div className="flex items-center mt-[90px]">
                    <p className="font-sharpgrotesk text-[25px] font-semibold text-right color-white ml-[20vw] mx-[5vw]" data-aos="fade-right">The above GIF tells you how the important points<br/>are getting highlighted.</p> 
                    <div className="ml-[5vw] h-[200px] w-[200px]" data-aos="fade-left"><img src={logo1} alt='loading gif'/></div>
                </div>

                <div className="flex items-center mt-[90px]">
                    <div className="ml-[20vw] mt-20 h-[200px] w-[200px]" data-aos="fade-right"><img src={logo2} alt='loading gif'/></div>
                    <p className="font-sharpgrotesk text-[25px] font-semibold text-left mt-20 color-white mx-[5vw]" data-aos="fade-left">The above GIF tells you how the important<br/> points are getting highlighted.</p> 
                </div>
            </div>

            <div className="flex items-center">
                <p className="font-grotesk text-[50px] text-left font-bold w-[40vw] mt-20 text-purple ml-[2vw]" data-aos="fade-right">How Before You Sign <span class="text-purple-700 text-[60px]">works</span>?</p>
                <div className=" mt-20 h-[500px] w-[1000px]" data-aos="zoom-in" data-aos-duration='2000'><img src={image} alt='loading gif'/></div>
            </div>

            <div className="overflow-x-hidden overflow-y-hidden bg-starfield">
                <p className="font-grotesk text-xl text-center mt-40 color-white mx-10" data-aos="zoom-in">Unlocking Legal Insights: Your AI-Powered Legal Advisor for Document Questions</p> 
                <p className="font-grotesk text-xl text-center mt-40 color-white mx-10" data-aos="zoom-in">The above GIF tells you how the important points are getting highlighted.</p> 
                <p className="font-grotesk text-xl text-center mt-40 color-white mx-10" data-aos="zoom-in">The above GIF tells you how the important points are getting highlighted.</p> 
            </div>
        </div>
    );
}