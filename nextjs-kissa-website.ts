// File structure:
//
// /pages
//   _app.tsx
//   index.tsx
//   concept.tsx
//   menu.tsx
//   shop.tsx
//   access.tsx
// /components
//   Layout.tsx
//   Header.tsx
//   Footer.tsx
// /styles
//   globals.css
//   Home.module.css
// /public
//   /images
//     /common
//       logo-header.png
//       logo-footer.png
//       icon-menu.png
//     /index
//       bg-main.jpg
//       bg-main-sp.jpg

// /pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

// /pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

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

      <div className={styles.firstView}>
        <div className={styles.firstViewText}>
          <h1>Imagination will <br />take you everywhere.</h1>
          <p>コーヒーを待つ時間も、特別なひと時になる。</p>
        </div>
      </div>
      
      <div className={styles.lead}>
        <p>「想像力はあなたをどこにでも連れて行ってくれる」<br />注文を待つ間に広げた、一冊の本の中に見つけた言葉。<br />ゆったり流れる時間の中で、想像を膨らませる楽しさを思い出す。<br />そんな時間を過ごす時、美味しいコーヒーがあると嬉しい。</p>
        <div className={styles.linkButtonArea}>
          <Link href="/concept" className={styles.linkButton}>CONCEPT</Link>
        </div>
      </div>
    </>
  );
};

export default Home;

// /pages/concept.tsx
import type { NextPage } from 'next';
import Head from 'next/head';

const Concept: NextPage = () => {
  return (
    <>
      <Head>
        <title>CONCEPT | KISSA official website</title>
        <meta name="description" content="KISSA official website concept page" />
      </Head>

      <main>
        {/* Concept page content will go here */}
        <h1>CONCEPT</h1>
      </main>
    </>
  );
};

export default Concept;

// /pages/menu.tsx
import type { NextPage } from 'next';
import Head from 'next/head';

const Menu: NextPage = () => {
  return (
    <>
      <Head>
        <title>MENU | KISSA official website</title>
        <meta name="description" content="KISSA official website menu page" />
      </Head>

      <main>
        {/* Menu page content will go here */}
        <h1>MENU</h1>
      </main>
    </>
  );
};

export default Menu;

// /pages/shop.tsx
import type { NextPage } from 'next';
import Head from 'next/head';

const Shop: NextPage = () => {
  return (
    <>
      <Head>
        <title>SHOP | KISSA official website</title>
        <meta name="description" content="KISSA official website shop page" />
      </Head>

      <main>
        {/* Shop page content will go here */}
        <h1>SHOP</h1>
      </main>
    </>
  );
};

export default Shop;

// /pages/access.tsx
import type { NextPage } from 'next';
import Head from 'next/head';

const Access: NextPage = () => {
  return (
    <>
      <Head>
        <title>ACCESS | KISSA official website</title>
        <meta name="description" content="KISSA official website access page" />
      </Head>

      <main>
        {/* Access page content will go here */}
        <h1>ACCESS</h1>
      </main>
    </>
  );
};

export default Access;

// /components/Layout.tsx
import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

// /components/Header.tsx
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
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="header-logo">
          <Image 
            src="/images/common/logo-header.png" 
            alt="KISSA" 
            width={170} 
            height={50} 
            priority
          />
        </Link>
        
        <button 
          className="toggle-menu-button" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        ></button>
        
        <div className={`header-site-menu ${menuOpen ? 'is-show' : ''}`}>
          <nav className="site-menu">
            <ul>
              <li><Link href="/concept">CONCEPT</Link></li>
              <li><Link href="/menu">MENU</Link></li>
              <li><Link href="/shop">SHOP</Link></li>
              <li><Link href="/access">ACCESS</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

// /components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="site-menu">
        <ul>
          <li><Link href="/concept">CONCEPT</Link></li>
          <li><Link href="/menu">MENU</Link></li>
          <li><Link href="/shop">SHOP</Link></li>
          <li><Link href="/access">ACCESS</Link></li>
        </ul>
      </nav>
      
      <Link href="/" className="footer-logo">
        <Image 
          src="/images/common/logo-footer.png" 
          alt="KISSA" 
          width={235} 
          height={70} 
        />
      </Link>
      
      <p className="footer-tel">TEL 01-2345-6789</p>
      <p className="footer-time">OPEN Fri-Sun 11:00-16:00</p>
      <p className="copyright"><small>&copy;KISSA</small></p>
    </footer>
  );
};

export default Footer;

// /styles/globals.css
@charset "utf-8";

*, ::before, ::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul, ol {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}

body {
  font-family: sans-serif;
  font-size: 16px;
  color: #000000;
  line-height: 1;
  background-color: #ffffff;
}

img {
  max-width: 100%;
}

.header-inner {
  max-width: 1200px;
  height: 110px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-menu-button {
  display: none;
}

.header-logo {
  display: block;
  width: 170px;
}

.site-menu ul {
  display: flex;
}

.site-menu ul li {
  margin-left: 20px;
  margin-right: 20px;
}

.site-menu ul li a {
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

.footer {
  color: #ffffff;
  background-color: #24211b;
  padding-top: 30px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-logo {
  display: block;
  width: 235px;
  margin-top: 90px;
}

.footer-tel {
  font-size: 26px;
  font-weight: bold;
  margin-top: 28px;
}

.footer-time {
  font-size: 13px;
  margin-top: 16px;
}

.copyright {
  font-size: 14px;
  font-weight: bold;
  margin-top: 90px;
}

/* Fixed the padding-top issue for the main section */
.main {
  padding-top: 0;
}

@media (max-width: 768px) {
  .site-menu ul {
    display: block;
    text-align: center;
  }

  .site-menu ul li {
    margin-top: 20px;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    height: 50px;
    z-index: 10;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  .header-inner {
    padding-left: 20px;
    padding-right: 20px;
    height: 100%;
    position: relative;
  }

  .header-logo {
    width: 100px;
  }

  .header-site-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    color: #ffffff;
    background-color: #736E62;
    padding-top: 30px;
    padding-bottom: 50px;
    display: none;
  }

  .header-site-menu.is-show {
    display: block;
  }

  .toggle-menu-button {
    display: block;
    width: 44px;
    height: 34px;
    background-image: url(/images/common/icon-menu.png);
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-color: transparent;
    border: none;
    border-radius: 0;
    outline: none;
  }

  .main {
    padding-top: 50px;
  }

  .footer-logo {
    margin-top: 60px;
  }

  .footer-tel {
    font-size: 20px;
  }

  .copyright {
    margin-top: 50px;
  }
}

// /styles/Home.module.css
.firstView {
  height: calc(100vh - 110px);
  background-image: url(/images/index/bg-main.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  align-items: center;
}

.firstViewText {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 40px;
  padding-bottom: 80px;
  color: #ffffff;
  font-weight: bold;
  text-shadow: 1px 1px 10px #4b2c14;
}

.firstViewText h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 56px;
  line-height: 72px;
}

.firstViewText p {
  font-size: 18px;
  margin-top: 20px;
}

.lead {
  max-width: 1200px;
  margin: 60px auto;
}

.lead p {
  line-height: 2;
  text-align: center;
}

.linkButtonArea {
  text-align: center;
  margin-top: 40px;
}

.linkButton {
  background-color: #f4dd64;
  display: inline-block;
  min-width: 180px;
  line-height: 48px;
  border-radius: 24px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.linkButton:hover {
  background-color: #d8b500;
}

@media (max-width: 768px) {
  .firstView {
    height: calc(100vh - 50px);
    background-image: url(/images/index/bg-main-sp.jpg);
    align-items: flex-start;
  }

  .firstViewText {
    padding-top: 60px;
    padding-left: 20px;
  }

  .firstViewText h1 {
    font-size: 36px;
    line-height: 48px;
  }

  .firstViewText p {
    font-size: 14px;
    margin-top: 15px;
  }

  .lead {
    padding-left: 20px;
    padding-right: 20px;
  }

  .lead p {
    text-align: left;
  }
}

// package.json
{
  "name": "kissa-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^13.4.19",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.5.7",
    "@types/react": "^18.2.21",
    "@types/react-dom": "^18.2.7",
    "eslint": "^8.48.0",
    "eslint-config-next": "^13.4.19",
    "typescript": "^5.2.2"
  }
}

// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
}

module.exports = nextConfig
