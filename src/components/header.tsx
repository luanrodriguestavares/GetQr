import { QrCode } from 'lucide-react';

function Header() {
    return (
        <header>
            <nav className="bg-indigo-600 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="https://flowbite.com" className="flex items-center">
                    <QrCode className="w-7 h-7 ml-8 mr-3 text-zinc-200" strokeWidth="2" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-zinc-200">GetQR</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <a href="#" className="text-zinc-200 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">Log in</a>
                        <a href="#" className="text-zinc-200 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">Get started</a>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">

                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;