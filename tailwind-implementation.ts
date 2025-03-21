// 必要なパッケージのインストール手順
// npm install -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'sans': ['sans-serif'],
      },
      colors: {
        'kissa-dark': '#24211b',
        'kissa-yellow': '#f4dd64',
        'kissa-yellow-dark': '#d8b500',
        'kissa-menu-bg': '#736E62',
      },
      height: {
        'header': '110px',
        'header-mobile': '50px',
      },
      boxShadow: {
        'header': '0 3px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

// styles/globals.css (新しいバージョン)
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans text-base text-black bg-white;
  }
}

@layer components {
  .site-menu li a {
    @apply font-montserrat font-bold;
  }
}

// components/Layout.tsx
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="pt-0 md:pt-0">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

// components/Header.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="md:static fixed top-0 left-0 right-0 bg-white md:h-header h-header-mobile z-10 md:shadow-none shadow-header">
      <div className="max-w-7xl h-full mx-auto md:px-10 px-5 flex justify-between items-center relative">
        <Link href="/" className="block md:w-[170px] w-[100px]">
          <Image 
            src="/images/common/logo-header.png" 
            alt="KISSA" 
            width={170} 
            height={50} 
            priority
          />
        </Link>
        
        <button 
          className="md:hidden block w-11 h-[34px] bg-[url('/images/common/icon-menu.png')] bg-no-repeat bg-center bg-[length:50%] border-0 outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        ></button>
        
        <div className={`md:block ${menuOpen ? 'block' : 'hidden'} md:static absolute top-full left-0 right-0 md:bg-transparent bg-kissa-menu-bg md:text-black text-white md:p-0 pt-[30px] pb-[50px]`}>
          <nav className="site-menu">
            <ul className="md:flex block md:text-left text-center">
              <li className="md:mx-5 md:mt-0 mt-5"><Link href="/concept">CONCEPT</Link></li>
              <li className="md:mx-5 md:mt-0 mt-5"><Link href="/menu">MENU</Link></li>
              <li className="md:mx-5 md:mt-0 mt-5"><Link href="/shop">SHOP</Link></li>
              <li className="md:mx-5 md:mt-0 mt-5"><Link href="/access">ACCESS</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-kissa-dark text-white pt-[30px] pb-[15px] flex flex-col items-center">
      <nav className="site-menu">
        <ul className="flex flex-col md:flex-row text-center">
          <li className="md:mx-5 md:mt-0 mt-5"><Link href="/concept">CONCEPT</Link></li>
          <li className="md:mx-5 md:mt-0 mt-5"><Link href="/menu">MENU</Link></li>
          <li className="md:mx-5 md:mt-0 mt-5"><Link href="/shop">SHOP</Link></li>
          <li className="md:mx-5 md:mt-0 mt-5"><Link href="/access">ACCESS</Link></li>
        </ul>
      </nav>
      
      <Link href="/" className="block w-[235px] md:mt-[90px] mt-[60px]">
        <Image 
          src="/images/common/logo-footer.png" 
          alt="KISSA" 
          width={235} 
          height={70} 
        />
      </Link>
      
      <p className="md:text-[26px] text-xl font-bold md:mt-[28px] mt-[28px]">TEL 01-2345-6789</p>
      <p className="text-[13px] mt-4">OPEN Fri-Sun 11:00-16:00</p>
      <p className="text-sm font-bold md:mt-[90px] mt-[50px]"><small>&copy;KISSA</small></p>
    </footer>
  );
};

export default Footer;

// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KISSA official website</title>
        <meta name="description" content="KISSA official website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>

      <div className="md:h-[calc(100vh-110px)] h-[calc(100vh-50px)] bg-[url('/images/index/bg-main.jpg')] md:bg-[url('/images/index/bg-main.jpg')] bg-[url('/images/index/bg-main-sp.jpg')] bg-no-repeat bg-center bg-cover flex md:items-center items-start">
        <div className="w-full max-w-7xl mx-auto md:px-10 px-5 md:pb-20 md:pt-0 pt-[60px] text-white font-bold" style={{ textShadow: '1px 1px 10px #4b2c14' }}>
          <h1 className="font-montserrat md:text-[56px] text-[36px] md:leading-[72px] leading-[48px]">Imagination will <br />take you everywhere.</h1>
          <p className="md:text-lg text-sm md:mt-5 mt-[15px]">コーヒーを待つ時間も、特別なひと時になる。</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto my-[60px] md:px-0 px-5">
        <p className="leading-8 md:text-center text-left">「想像力はあなたをどこにでも連れて行ってくれる」<br />注文を待つ間に広げた、一冊の本の中に見つけた言葉。<br />ゆったり流れる時間の中で、想像を膨らませる楽しさを思い出す。<br />そんな時間を過ごす時、美味しいコーヒーがあると嬉しい。</p>
        <div className="text-center mt-10">
          <Link href="/concept" className="inline-block min-w-[180px] leading-[48px] rounded-[24px] font-montserrat text-sm font-bold text-center bg-kissa-yellow hover:bg-kissa-yellow-dark">CONCEPT</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
