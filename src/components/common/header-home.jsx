import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === 'ar';

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: isArabic ? 'معلومات عنا' : 'ABOUT US', path: '/about' },
    { label: isArabic ? 'علاماتنا التجارية' : 'OUR BRANDS', path: '/brands' },
    {
      label: isArabic ? 'التجارة الإلكترونية' : 'ECOMMERCE',
      dropdown: [
        { label: 'NEXSO', href: 'https://nexso.ae' },
        { label: 'LUXURY WATCH DEALS', href: 'https://theluxurywatchdeals.com' },
        { label: 'ARMED', href: 'https://armed.ae' },
        { label: 'STORE1920', href: 'https://store1920.com' },
      ],
    },
    { label: isArabic ? 'كن شريكًا' : 'PARTNER WITH US', path: '/partner' },
    { label: isArabic ? 'المدونة' : 'BLOGS', path: '/blogs' },
    { label: isArabic ? 'الوظائف' : 'CAREERS', path: '/careers' },
    { label: isArabic ? 'اتصل بنا' : 'CONTACT US', path: '/contact' },
  ];

  const styles = {
    header: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '11px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: scrolled ? '#000' : 'linear-gradient(to bottom, #1a1a1a 0%, transparent 100%)',
      color: '#fff',
      padding: '20px 35px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      direction: isArabic ? 'rtl' : 'ltr',
      transition: 'background 0.3s ease',
    },
    logo: { height: '50px' },
    nav: {
      display: isMobile ? 'none' : 'flex',
      gap: '35px',
      alignItems: 'center',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      position: 'relative',
      cursor: 'pointer',
    },
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      background: '#111',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
      minWidth: '180px',
      marginTop: '5px',
      padding: '10px 0',
      zIndex: 1000,
      textAlign: isArabic ? 'right' : 'left',
    },
    dropdownItem: {
      padding: '10px 20px',
      color: '#fff',
      textDecoration: 'none',
      display: 'block',
      whiteSpace: 'nowrap',
    },
    langBtn: {
      padding: '6px 12px',
      border: '1px solid #fff',
      background: 'transparent',
      color: '#fff',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
    },
    hamburger: {
      display: isMobile ? 'block' : 'none',
      fontSize: '24px',
      background: 'none',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
    },
    mobileMenu: {
      display: mobileMenuOpen ? 'block' : 'none',
      background: '#111',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      zIndex: 999,
      padding: '15px 20px',
      direction: isArabic ? 'rtl' : 'ltr',
    },
    mobileLink: {
      color: '#fff',
      textDecoration: 'none',
      display: 'block',
      padding: '12px 0',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    },
  };

  return (
    <header style={styles.header}>
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dm8z5zz5s/image/upload/v1748871708/Logo_1080_x_1080_White_en7zpv.png"
          alt="Al Thakeel Logo"
          style={styles.logo}
        />
      </Link>

      {/* Desktop Nav */}
      <nav style={styles.nav}>
        {navItems.map((item, idx) => (
          <div
            key={idx}
            style={{ position: 'relative' }}
            onMouseEnter={() => {
              if (hoverTimeout) clearTimeout(hoverTimeout);
              setActiveMobileDropdown(idx);
            }}
            onMouseLeave={() => {
              const timeout = setTimeout(() => setActiveMobileDropdown(null), 200);
              setHoverTimeout(timeout);
            }}
          >
            {item.dropdown ? (
              <>
                <span style={styles.link}>
                  {item.label} ▼
                </span>
                {activeMobileDropdown === idx && (
                  <div style={styles.dropdownMenu}>
                    {item.dropdown.map((subItem, subIdx) =>
                      subItem.href ? (
                        <a
                          key={subIdx}
                          href={subItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.dropdownItem}
                        >
                          {subItem.label}
                        </a>
                      ) : (
                        <Link key={subIdx} to={subItem.path} style={styles.dropdownItem}>
                          {subItem.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              <Link to={item.path} style={styles.link}>
                {item.label}
              </Link>
            )}
          </div>
        ))}
        <button style={styles.langBtn} onClick={toggleLanguage}>
          {isArabic ? 'English' : 'العربية'}
        </button>
      </nav>

      {/* Hamburger */}
      <button
        style={styles.hamburger}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Mobile Nav */}
      <div style={styles.mobileMenu}>
        {navItems.map((item, idx) => (
          <div key={idx}>
            {item.dropdown ? (
              <>
                <div
                  style={styles.mobileLink}
                  onClick={() =>
                    setActiveMobileDropdown(activeMobileDropdown === idx ? null : idx)
                  }
                >
                  {item.label} ▼
                </div>
                {activeMobileDropdown === idx &&
                  item.dropdown.map((subItem, subIdx) =>
                    subItem.href ? (
                      <a
                        key={subIdx}
                        href={subItem.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.mobileLink}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </a>
                    ) : (
                      <Link
                        key={subIdx}
                        to={subItem.path}
                        style={styles.mobileLink}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    )
                  )}
              </>
            ) : (
              <Link
                to={item.path}
                style={styles.mobileLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
        <button
          style={{ ...styles.mobileLink, ...styles.langBtn, border: 'none' }}
          onClick={toggleLanguage}
        >
          {isArabic ? 'English' : 'العربية'}
        </button>
      </div>
    </header>
  );
};

export default Header;
