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
        <div>
            <h1 className="font-grotesk text-[100px] font-medium text-center text-text-primary mt-20">Before you sign</h1>
            <p className="font-grotesk text-xs text-center mt-20">Using the sign API's to make the long aggrements short and only the important points and also it will make clarify your doubts about most of the legal questions.</p>

            <div className="p-20 flex flex-wrap gap-3">
                <div className="text-xs font-medium h-28 w-28 grid place-content-center bg-accent-light">Accent Light</div>
                <div className="text-xs font-medium h-28 w-28 grid place-content-center bg-accent-dark">Accent dark</div>
                <div className="text-xs font-medium h-28 w-28 grid place-content-center bg-text-coconut text-primary">Coconut</div>
                <div className="text-xs font-medium h-28 w-28 grid place-content-center bg-primary-graphite">Graphite</div>
                <div className="text-xs font-medium h-28 w-28 grid place-content-center bg-dropbox-zen">Zen</div>
                <div className="text-xs font-medium h-28 w-28 grid place-content-center bg-dropbox-sunset">Sunset</div>
                <div className="text-xs font-medium h-28 w-28 grid place-content-center bg-dropbox-tangerine">Tangerin</div>
                <div className="text-xs font-medium h-28 w-28 grid place-content-center bg-dropbox-lime">Lime</div>
                <div className="text-xs font-medium h-28 w-28 grid place-content-center bg-dropbox-cloud">Cloud</div>
                <div className="text-xs font-medium h-28 w-28 grid place-content-center bg-dropbox-orchid">Orchid</div>
                <div className="text-xs font-medium h-28 w-28 grid place-content-center bg-dropbox-pink">Pink</div>
            </div>

            <section className="min-h-screen overflow-x-hidden">
                <div className="flex justify-center items-center"><img src={logo} alt='loading gif'/></div>
                <p className="font-grostek text-xl text-center mt-40 color-white mx-10" data-aos="fade-left">The above GIF tells you how the important points are getting highlighted.</p> 
            </section>
            
            <section className="min-h-screen overflow-x-hidden">
                <div className="flex justify-center items-center"><img src={logo} alt='loading gif'/></div>
                <p className="font-grostek text-xl text-center mt-40 color-white mx-10" data-aos="fade-right">The above GIF tells you how the important points are getting highlighted.</p> 
            </section>

            <section className="min-h-screen overflow-x-hidden">
                <div className="flex justify-center items-center"><img src={logo} alt='loading gif'/></div>
                <p className="font-grostek text-xl text-center mt-40 color-white mx-10" data-aos="fade-up">The above GIF tells you how the important points are getting highlighted.</p> 
            </section>

            <div className='grid grid-cols-2 w- full featuresDiv ml-40 mr-40'>
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