import logo from '../assets/images/logo_white.png';
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="fixed top-0 right-0 left-0 backdrop-blur-lg z-[+100]">
                <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-1">
                        <img className="h-[45px]" src={logo} alt="Dropbox logo"/>
                        <p className="font-grotesk text-xl ml-2">Before You Sign</p>
                    </div>
                    <div className="flex items-center">
                    <Link to='/'><div className='flex flex-row align-center bg-white mr-3 pl-2 pr-1 rounded-sm'><p className="font-grotesk font-medium text-base text-black  p-1">Home</p></div></Link>
                        <Link to='/'><div className='flex flex-row align-center bg-white mr-3 pl-2 pr-1 rounded-sm'><img src='https://imgs.search.brave.com/FP9EM-rDerUqrCUvr5F6LkK5Y-eZyHNNLZnA03KpT6U/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMTM4NC8xMzg0/MDYwLnBuZw' alt='youtube' className='mt-[6px] h-[20px] w-[20px]'/><p className="font-grotesk font-medium text-base text-black p-1">Trailer</p></div></Link>
                        {/* <Link to='/search'><div className='bg-white mr-3 pl-2 pr-2'><p className="font-grotesk font-medium text-base text-black p-1">Generate</p></div></Link> */}
                        <Link to='https://github.com/jashwanth0712/before-you-sign'><div className='rounded-sm flex flex-row align-center bg-white mr-3 pl-1 pr-1'><img src='https://imgs.search.brave.com/4PaLBjGWsFaIML8XpCpV2KD1hKeUX7tC8_YtxBI7G90/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZm9udC1hd2Vz/b21lLzE3OTIvZ2l0/aHViLTUxMi5wbmc' alt='github' className='mt-[6px] h-[20px] w-[20px]'/><p className="font-grotesk font-medium text-base text-black p-1">GitHub</p></div></Link>
                        <Link to='/'><div className='flex flex-row align-center bg-white mr-3 pl-1 pr-1 rounded-sm'><img src='https://imgs.search.brave.com/P4MsEQzskgWJSt8L_NG7ZIh06zhUUwpvc3fhbfKkEow/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jbG91/ZC5naXRodWJ1c2Vy/Y29udGVudC5jb20v/YXNzZXRzLzE1Njgx/ODgvOTAxMzc2MS8w/MTVhOWE1MC0zNzhj/LTExZTUtOTJiNS1j/YTZjYWNmNjNlMjYu/cG5n' alt='github' className='mt-[6px] h-[20px] w-[20px]'/><p className="font-grotesk font-medium text-base text-black p-1">Like Us On</p></div></Link>
                    </div>
                </div>
            </nav>
            <div className="h-10"></div>
        </>
    );
}