import { useEffect } from 'react';
import React from 'react';
import logo from '../assets/images/giphy.gif';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css'

export default function Home() {
    useEffect(() =>{
        AOS.init({duration:500});
    },[])
    return (
        <div class="bg-gradient-to-r from-green-300 to-purple-500">
            <div class="min-h-screen mt-10">
                <h1 className="font-grotesk text-[100px] font-medium text-center text-text-primary pt-20">Before you sign</h1>
                <p className="font-grotesk text-[25px] text-center mt-10 mb-20"> Know Completely, Don't Guess</p>
            </div>

            <section className="min-h-screen overflow-x-hidden">
                <div className="flex justify-center items-center"><img src={logo} alt='loading gif'/></div>
                <p className="font-grostek text-xl text-center mt-40 color-white mx-10" data-aos="zoom-in">The above GIF tells you how the important points are getting highlighted.</p> 
            </section>
            
            <section className="min-h-screen overflow-x-hidden">
                <div className="flex justify-center items-center"><img src={logo} alt='loading gif'/></div>
                <p className="font-grostek text-xl text-center mt-40 color-white mx-10" data-aos="fade-right">The above GIF tells you how the important points are getting highlighted.</p> 
            </section>

            <section className="min-h-screen overflow-x-hidden">
                <div className="flex justify-center items-center"><img src={logo} alt='loading gif'/></div>
                <p className="font-grostek text-xl text-center mt-40 color-white mx-10" data-aos="fade-up">The above GIF tells you how the important points are getting highlighted.</p> 
            </section>

            <div className='grid grid-cols-2 w- full ml-40 mr-40'>
                <div className='rounded-lg m-1 btn-selected !bg-opacity-0 feat-bg border-white border-2' data-aos="fade-up">
                    <h4 className='tracking-normal text-left flex feat-d-h text-[33px] pl-20'>Modular Integration</h4>
                    <p className='pb-10 feat-d-p pl-20'>Compose dApps on top of each other</p>
                </div>
                <div className='rounded-lg m-1 btn-selected !bg-opacity-0 feat-bg border-white border-2' data-aos="fade-up">
                    <h4 className='tracking-normal text-left flex feat-d-h text-[33px] pl-20'>Modular Integration</h4>
                    <p className='pb-10 feat-d-p pl-20'>Compose dApps on top of each other</p>
                </div>
                <div className='rounded-lg m-1 btn-selected !bg-opacity-0 feat-bg border-white border-2' data-aos="fade-up">
                    <h4 className='tracking-normal text-left flex feat-d-h text-[33px] pl-20'>Modular Integration</h4>
                    <p className='pb-10 feat-d-p pl-20'>Compose dApps on top of each other</p>
                </div>
                <div className='rounded-lg m-1 btn-selected !bg-opacity-0 feat-bg border-white border-2' data-aos="fade-up">
                    <h4 className='tracking-normal text-left flex feat-d-h text-[33px] pl-20'>Modular Integration</h4>
                    <p className='pb-10 feat-d-p pl-20'>Compose dApps on top of each other</p>
                </div>
                <div className='rounded-lg m-1 btn-selected !bg-opacity-0 feat-bg border-white border-2' data-aos="fade-up">
                    <h4 className='tracking-normal text-left flex feat-d-h text-[33px] pl-20'>Modular Integration</h4>
                    <p className='pb-10 feat-d-p pl-20'>Compose dApps on top of each other</p>
                </div>
                <div className='rounded-lg m-1 btn-selected !bg-opacity-0 feat-bg border-white border-2' data-aos="fade-up">
                    <h4 className='tracking-normal text-left flex feat-d-h text-[33px] pl-20'>Modular Integration</h4>
                    <p className='pb-10 feat-d-p pl-20'>Compose dApps on top of each other</p>
                </div>
            </div>

            <section className="min-h-screen overflow-x-hidden mt-40">
                <div className="flex justify-center items-center"><img src={logo} alt='loading gif'/></div>
                <p className="font-grostek text-xl text-center mt-40 color-white mx-10" data-aos="fade-up">The above GIF tells you how the important points are getting highlighted.</p> 
            </section>
        </div>
    );
}