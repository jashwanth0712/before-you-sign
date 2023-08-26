import React from 'react';
import logo from '../assets/images/giphy.gif'
import './Homoe.js'

export default function Home() {
    return (
        <div>
            {/* Edit below code */}

            <h1 className="font-grotesk text-text-primary text-center mt-20 max-w-4xl mx-auto">Join over 700 million registered users who trust Dropbox</h1>
            <p className="font-grotesk font-medium text-xl underline text-text-primary text-center mt-20">Dropbox Design Colors</p>
            <p className="font-grotesk text-xs text-center">Using the sign API's to make the long aggrements short and only the important points and also it will make clarify your doubts about most of the legal questions.</p>

            <h1 className="font-unbounded text-text-primary text-center mt-20 max-w-3xl text-4xl leading-tight mx-auto">Join over 700 million registered users who trust Dropbox</h1>
            <p className="font-grotesk font-medium text-xl text-text-primary text-center mt-20">Dropbox Design Colors</p>


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

            <section className="show-animate-{transform -translate-x-0}">
                <div className="flex justify-center items-center"><img src={logo} /></div>
                <p className="font-grostek text-xl transform -translate-x-full text-center mt-4 transition duration-1000 min-h-screen">The above GIF tells you how the important points are getting highlighted.</p>
            </section>
        </div>
    );
}