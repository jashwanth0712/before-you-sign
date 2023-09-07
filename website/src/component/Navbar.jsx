import logo from '../assets/images/logo_white.png';

export default function Navbar() {
    return (
        <>
            <nav className="fixed top-0 right-0 left-0 backdrop-blur-lg">
                <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-1">
                        <img className="h-[45px]" src={logo} alt="Dropbox logo" />
                        
                    </div>
                    <div className="flex items-center">
                        <p className="font-grotesk font-medium text-base text-text-primary mr-5">Home</p>
                        <p className="font-grotesk font-medium text-base text-text-primary mr-5">About</p>
                        <p className="font-grotesk font-medium text-base text-text-primary mr-5">Blog</p>
                        <p className="font-grotesk font-medium text-base text-text-primary mr-5">Contact</p>
                    </div>
                </div>
            </nav>
            <div className="h-10"></div>
        </>
    );
}