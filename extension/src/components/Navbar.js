import logo from '../logo.svg';

const Navbar = () => {
    return ( 
        <nav className="h-[100px] grid items-center">
            <div className="flex items-center gap-5 mx-10">
                {/* <img src={logo} alt="logo" width={40} height={40} className="md:h-16 md:w-16"/> */}
                <h1 className='text-3xl md:text-5xl font-bold'>Dropbox ChatBOT</h1>
            </div>
        </nav>
    );
}
 
export default Navbar;