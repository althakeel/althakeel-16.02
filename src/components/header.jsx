import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import BannerText from './Homepage/bannertext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [fadeVideo, setFadeVideo] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
const [autoSwitchTimeout, setAutoSwitchTimeout] = useState(null);
const [ecommerceDropdown, setEcommerceDropdown] = useState(false);
const navigate = useNavigate();

  const isArabic = language === 'ar';
  const videoSources = [
    "https://res.cloudinary.com/dm8z5zz5s/video/upload/v1749061794/8387356-uhd_4096_2160_25fps_dkhril_owxumi.mp4",
    "https://res.cloudinary.com/dm8z5zz5s/video/upload/v1749061790/6648422-uhd_4096_2160_25fps_hdh96e_wqiqhi.mp4",
    "https://res.cloudinary.com/dm8z5zz5s/video/upload/v1749061798/4750039-hd_1920_1080_30fps_wbadsu_kqqrjn.mp4"
  ];
  const ecommerceSubLinks = [
    { labelEn: 'Shop', labelAr: 'تسوق', path: '/ecommerce/shop' },
    { labelEn: 'Categories', labelAr: 'الفئات', path: '/ecommerce/categories' },
    { labelEn: 'Offers', labelAr: 'العروض', path: '/ecommerce/offers' },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeVideo(prev => !prev);
      setCurrentVideo(prev => (prev + 1) % videoSources.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNextVideo = () => {
    setUserInteracted(true);
    setCurrentVideo((prev) => (prev + 1) % videoSources.length);
  };
  
  const handlePrevVideo = () => {
    setUserInteracted(true);
    setCurrentVideo((prev) =>
      prev === 0 ? videoSources.length - 1 : prev - 1
    );
  };


  
  useEffect(() => {
    if (autoSwitchTimeout) clearTimeout(autoSwitchTimeout);
  
    const timeout = setTimeout(() => {
      setFadeVideo((prev) => !prev);
      setCurrentVideo((prev) => (prev + 1) % videoSources.length);
      setUserInteracted(false); // resume auto after timeout
    }, userInteracted ? 2000 : 3000); // slight pause if user interacted
  
    setAutoSwitchTimeout(timeout);
  
    return () => clearTimeout(timeout);
  }, [currentVideo, userInteracted]);
  
  
  const handleDotClick = (index) => {
    setUserInteracted(true);
    setCurrentVideo(index);
  };


  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1150;
      setIsMobile(mobile);
      if (!mobile) setMobileMenuOpen(false);
    };
  
    const handleScroll = () => {
      setScrolledDown(window.scrollY > 100); 
    };
  
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navLinks = [
    { labelEn: 'ABOUT US', labelAr: 'من نحن', path: '/about' },
    { labelEn: 'OUR BRANDS', labelAr: 'علاماتنا التجارية', path: '/brands' },
    {
      labelEn: 'ECOMMERCE',
      labelAr: 'الشراكة معنا',
      // no path here as requested
      subItems: [
        { labelEn: 'NEXSO', labelAr: 'تسوق',href: 'https://nexso.com' },
        { labelEn: 'LUXURY WATCH DEALS', labelAr: 'الفئات', href: 'https://theluxurywatchdeals.com' },
        { labelEn: 'ARMED', labelAr: 'العروض', href: 'https://armed.ae' },
        { labelEn: 'STORE1920', labelAr: 'العروض', href: 'https://store1920.com' },

      ],
    },
       { labelEn: 'PARTNER WITH US', labelAr: 'الشراكة معنا', path: '/partner' },
    { labelEn: 'BLOGS', labelAr: 'المدونات', path: '/blogs' },
    { labelEn: 'CAREERS', labelAr: 'الوظائف', path: '/careers' },
    { labelEn: 'CONTACT US', labelAr: 'اتصل بنا', path: '/contact' },
  ];
  const toggleEcommerceDropdown = () => {
    setEcommerceDropdown((prev) => !prev);
  };
  

  return (
      <div dir={isArabic ? 'rtl' : 'ltr'} style={{ ...styles.pageContainer, height: isMobile ? '80vh' : '100vh' }}>
        
        {/* Video Background */}
        <div style={styles.videoWrapper}>
          <video
            key={currentVideo}
            src={videoSources[currentVideo]}
            autoPlay
            muted
            loop
            playsInline
            style={styles.videoBackground}
          />
          <div style={styles.overlay} />
    
          {/* Video Controls */}
          <div style={styles.videoControls}>
          <button onClick={handlePrevVideo} style={styles.controlButton}>
  <img
    src="https://res.cloudinary.com/dm8z5zz5s/image/upload/v1748416043/next_rqurxp.png"
    alt="Previous"
    style={{ transform: 'rotate(180deg)', width: '24px', height: '24px' }}
  />
</button>
  
  
  
  <button onClick={handleNextVideo} style={styles.controlButton}>
  <img
    src="https://res.cloudinary.com/dm8z5zz5s/image/upload/v1748416453/next_1_xrlyow.png"
    alt="Previous"
    style={{ transform: 'rotate(180deg)', width: '24px', height: '24px' }}
  />
</button>
          </div>
        </div>
    
        {/* Top Bar */}
        <div style={styles.topBar}>
          <div style={styles.topBarContent}>
            <div style={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}><FaInstagram /></a>
            </div>
            {/* <span style={styles.divider}>|</span> */}
            {/* <button onClick={toggleLanguage} style={styles.languageButton}>
              {isArabic ? 'English' : 'العربية'}
            </button> */}
          </div>
        </div>
    
        {/* Header */}
        <header style={{ ...styles.header, ...(scrolledDown ? styles.headerFixedTop : {}) }}>
        <a href="./" style={styles.logoContainer}>
  <img
    src="https://res.cloudinary.com/dnpwsutir/image/upload/v1748353387/Logo_V2_1_dvu1bp.png"
    alt="Althakeel Logo"
    style={styles.logoImage}
  />
</a>
    
          {!isMobile && (
          <nav style={styles.centerNav}>
          <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
            {navLinks.map(({ labelEn, labelAr, path, subItems,href }, idx) => (
              subItems ? (
                <div 
                  key={idx} 
                  style={styles.dropdownContainer}
                  onMouseEnter={() => setEcommerceDropdown(true)}
                  onMouseLeave={() => setEcommerceDropdown(false)}
                >
                  <div style={styles.navLink}>
                    {isArabic ? labelAr : labelEn} <FaChevronDown size={12} />
                  </div>
                  {ecommerceDropdown && (
                    <div style={styles.dropdownMenu}>
                      {subItems.map((sub, subIdx) => (
                        <Link key={subIdx} to={sub.href} target='blank' style={styles.dropdownItem}>
                          {isArabic ? sub.labelAr : sub.labelEn}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={idx} to={path} style={styles.navLink}>
                  {isArabic ? labelAr : labelEn}
                </Link>
              )
            ))}
          </div>
          <button onClick={toggleLanguage} style={styles.languageButton}>
            {isArabic ? 'English' : 'العربية'}
          </button>
        </nav>
        
          
            
          )}
    
          {isMobile && (
            <div style={styles.mobileMenuIcon} onClick={() => setMobileMenuOpen((prev) => !prev)}>
              {mobileMenuOpen ? <FaTimes size={24} color="#fff" /> : <FaBars size={24} color="#fff" />}
            </div>
          )}
        </header>
    
        {/* Mobile Menu */}
        {isMobile && (
          <div
    style={{
      ...styles.mobileMenu,
      ...(mobileMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed)
    }}
  >
    
          {navLinks.map(({ labelEn, labelAr, path }, idx) => (
            path === '/ecommerce' ? (
              <div key={idx} style={styles.mobileDropdown}>
                <div onClick={toggleEcommerceDropdown} style={styles.mobileNavLink}>
                  {isArabic ? labelAr : labelEn} <FaChevronDown size={12} />
                </div>
                {ecommerceDropdown && (
                  <div style={styles.mobileDropdownMenu}>
                    {ecommerceSubLinks.map((sub, subIdx) => (
                      <Link
                        key={subIdx}
                        to={sub.path}
                        style={styles.mobileSubNavLink}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {isArabic ? sub.labelAr : sub.labelEn}
                      </Link>
                    ))}
                    {mobileMenuOpen ? (
  <FaTimes
      onClick={() => setMobileMenuOpen(false)}
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        fontSize: 24,
        color: '#fff',
        cursor: 'pointer',
        zIndex: 999
      }}
    />

) : (
  <FaBars
    onClick={() => setMobileMenuOpen(true)}
    style={styles.menuIcon}
  />
)}
                  </div>
                )}
              </div>
            ) : (
              <Link key={idx} to={path} style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                {isArabic ? labelAr : labelEn}
              </Link>
            )
          ))}
        </div>
      )}
    
        {/* Banner Center Content */}
        <div style={styles.bannerContent}>
          <h1 style={styles.bannerTitle}>The House of Brands</h1>
          <p style={styles.bannerSubtitle}>We deliver innovation, technology, and growth.</p>
          <button 
          onClick={() => navigate('/about')}
            style={styles.bannerButton}>Know More</button>
          {/* <about ut page redirect this button */}
        </div>
    
        {/* Banner Text Fixed at Bottom 20% */}
        <div style={styles.bannerTextWrapper}>
          <BannerText />
        </div>
      </div>
    );
    
};

const styles = {
  pageContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
  },
  videoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2,
  },
  topBar: {
    position: 'relative',
    zIndex: 3,
    padding: '8px 10px',
    color: '#fff',
    backgroundColor:'#1D1D1D'
  },
  topBarContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  socialIcons: {
    display: 'flex',
    gap: '8px',
  },
  icon: {
    color: '#fff',
    fontSize: '18px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '24px',
  },
  divider: {
    color: '#fff',
    fontSize: '18px',
  },
  languageButton: {
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundColor:'transparent',
    border: "1px solid #777",

    // border: 'none',
    color: '#fff',
    padding: '4px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  header: {
    position: 'relative',
    zIndex: 3,
    padding: '20px 50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, #1a1a1a 0%, transparent 100%)',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight:'Bold',
    alignItems: 'flex-end',
    // padding: '0 40px',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  
  centerNav: {
    display: 'flex',
  justifyContent: 'space-between', 
  alignItems: 'center',
  gap: '20px',
  },
  
  rightControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    // marginLeft: '2px',
  },
  logoImage: {
    maxWidth: '150px',
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  nav: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  navLink: {
    position: 'relative',
    display: 'inline-block',
    color: '#fff',
    fontSize: '11px',
    textDecoration: 'none',
    padding: '4px 8px',
    transition: 'color 0.3s ease',
    
    overflow: 'hidden',
  },
 
  
 
  
  mobileMenu: {
    position: 'fixed',
    top: 100,
    left: 0,
    width: '100%',
    maxHeight: '100vh',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    boxSizing: 'border-box',
    zIndex: 555,
    overflowY: 'auto',
    transition: 'transform 0.4s ease, opacity 0.4s ease',
    zIndex: 10,

  },
  closeIcon: {
    zIndex: 20,
  },
  
  mobileMenuOpen: {
    opacity: 1,
  
    transform: 'translateY(0%)',
    pointerEvents: 'auto',
  },
  mobileMenuClosed: {
    opacity: 0,
    transform: 'translateY(-100%)',
    pointerEvents: 'none',


  },
  mobileMenuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  mobileLogoImage: {
    maxWidth: '100px',
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  mobileMenuClose: {
    cursor: 'pointer',
    fontSize: '24px',
    color: '#fff',
    padding: '10px',
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: '#fff',
    padding: '10px 0',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    fontSize: '16px',

  },
  bannerContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 3,
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: '#fff',
    padding: '0 20px',
  },

  bannerTextWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '20vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif',

  },



  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundColor: '#0D0D0D',
    backgroundImage: 'radial-gradient(circle at top left, #1A1A1A, #0D0D0D)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 10px',
    overflow: 'hidden',
    fontFamily: 'Montserrat, sans-serif',

  },
  
  bannerTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#F0F0F0',
    letterSpacing: '3.5px',
    marginBottom: '5px',
    position: 'relative',
    zIndex: 2,
    animation: 'fadeInUp 1.2s ease forwards',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat, sans-serif',

  },
  
  bannerTitleAccent: {
    background: 'linear-gradient(90deg, #A4813D, #d4b36b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Montserrat, sans-serif',

  },
  
  bannerSubtitle: {
    fontSize: '1.4rem',
    color: '#BBBBBB',
    maxWidth: '800px',
    lineHeight: '1',
    marginBottom: '20px',
    animation: 'fadeInUp 1.6s ease forwards',
  },
  
  bannerButton: {
    padding: '16px 55px',
    fontSize: '1.1rem',
    fontWeight: '700',
    border: 'none',
    borderRadius: '15px',
    background: 'linear-gradient(135deg, #A4813D, #d4b36b, #A4813D)',
    backgroundSize: '300% 300%',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 15px 40px rgba(164,129,61,0.2)',
    transition: 'all 0.5s ease',
    animation: 'fadeInUp 2s ease forwards',
    letterSpacing: '1px',
  },
  
  bannerButtonHover: {
    transform: 'scale(1.1)',
    backgroundPosition: 'right center',
    boxShadow: '0 20px 50px rgba(164,129,61,0.85)',
  },
  


  
  


  headerFixedTop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    // sticky headerissue
    padding:'20px 40px 40px 40px',
    // maxWidth:'1400px',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    fontWeight:'Bold',
    backdropFilter: 'blur(8px)',
    // borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    zIndex: 10,
    transform: 'translateY(0)',
    opacity: 1,
    transition: 'transform 0.6s ease, opacity 0.6s ease', // 👈 smooth animation here
  },
  videoControls: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    transform: 'translateY(-50%)',
    zIndex: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    pointerEvents: 'none', // allow video clicks underneath except buttons
  },
  controlButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    border: 'none',
    fontSize: '32px',
    padding: '10px 16px',
    cursor: 'pointer',
    borderRadius: '50%',
    pointerEvents: 'auto', // enable clicking
    margin: '0 20px',
  },
  dotsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#888',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  
  dropdownContainer: {
    position: 'relative',
  },
  
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(24px)',              
    WebkitBackdropFilter: 'blur(10px)',         
    // boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 10,
    minWidth: '150px',
    display: 'flex',
    flexDirection: 'column',
    color:"#fff",
    borderRadius: '8px',                      
    padding:"5px 5px",
    // border: '1px solid rgba(255, 255, 255, 0.2)' 
  },
  
  
  dropdownItem: {
    padding: '8px 16px',
    textDecoration: 'none',
    color: '#fff',
    fontSize:"12px",
    fontFamily: 'Montserrat, sans-serif',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    
  },
  
  dropdownItemHover: {
    backgroundColor: '#f5f5f5',
  },
  
  
  
};

export default HomePage;
