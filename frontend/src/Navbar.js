import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ activePage: activePageProp, onNavChange }) => {
  const [internalPage, setInternalPage] = useState('Home');
  const activePage = activePageProp !== undefined ? activePageProp : internalPage;
  const setActivePage = onNavChange || setInternalPage;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar') && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Keyboard navigation support (Escape closes mobile menu)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo-placeholder">
            <img src={`${process.env.PUBLIC_URL || ''}/potatoicon.jpg`} alt="Circular potato basket logo" className="potato-icon" />
          </div>
          <span className="logo-text">Potato Plant Health Monitoring System</span>
        </div>

        {/* Desktop Navigation - Full Width */}
        <ul className="navbar-menu desktop-nav">
          <li>
            <a
              href="#home"
              className={`navbar-link ${activePage === 'Home' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('Home');
              }}
              aria-current={activePage === 'Home' ? 'page' : undefined}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`navbar-link ${activePage === 'About' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('About');
              }}
              aria-current={activePage === 'About' ? 'page' : undefined}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#potato-guide"
              className={`navbar-link ${activePage === 'PotatoGuide' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('PotatoGuide');
              }}
              aria-current={activePage === 'PotatoGuide' ? 'page' : undefined}
            >
              Potato Guide
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`navbar-link ${activePage === 'Contact' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('Contact');
              }}
              aria-current={activePage === 'Contact' ? 'page' : undefined}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu"
          type="button"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        id="mobile-menu"
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} 
        role="menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-menu-content">
          <ul className="mobile-menu-list" role="menubar">
            <li role="none">
              <a
                href="#home"
                role="menuitem"
                className={`mobile-nav-link ${activePage === 'Home' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('Home');
                }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                aria-current={activePage === 'Home' ? 'page' : undefined}
              >
                Home
              </a>
            </li>
            <li role="none">
              <a
                href="#about"
                role="menuitem"
                className={`mobile-nav-link ${activePage === 'About' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('About');
                }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                aria-current={activePage === 'About' ? 'page' : undefined}
              >
                About
              </a>
            </li>
            <li role="none">
              <a
                href="#potato-guide"
                role="menuitem"
                className={`mobile-nav-link ${activePage === 'PotatoGuide' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('PotatoGuide');
                }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                aria-current={activePage === 'PotatoGuide' ? 'page' : undefined}
              >
                Potato Guide
              </a>
            </li>
            <li role="none">
              <a
                href="#contact"
                role="menuitem"
                className={`mobile-nav-link ${activePage === 'Contact' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('Contact');
                }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                aria-current={activePage === 'Contact' ? 'page' : undefined}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

