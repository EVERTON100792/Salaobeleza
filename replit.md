# Belleza Studio - Beauty Salon Website

## Overview

This is a static website for Belleza Studio, a premium beauty salon. The project is built using vanilla HTML, CSS, and JavaScript, creating a modern and responsive landing page for a beauty salon business. The website includes sections for services, gallery, about us, and contact information, with appointment booking functionality. 

**Recent Updates (July 2025)**: Enhanced with sophisticated dark theme, advanced animations, particle effects, scroll progress indicator, loading screen, intersection observer animations, and premium visual effects for a luxurious user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

This is a client-side only application built with vanilla web technologies:

- **Frontend**: Pure HTML5, CSS3, and JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox for responsive design
- **Typography**: Google Fonts (Playfair Display for headings, Inter for body text)
- **Icons**: Font Awesome 6.4.0
- **Responsive Design**: Mobile-first approach with hamburger menu

## Key Components

### 1. HTML Structure (index.html)
- Semantic HTML5 structure
- Portuguese language targeting (lang="pt-BR")
- SEO-optimized meta tags
- Navigation header with logo and menu
- Call-to-action button for appointment booking
- Responsive navigation with hamburger menu

### 2. Styling System (styles.css)
- CSS Reset for cross-browser consistency
- CSS Custom Properties (CSS Variables) for theming
- Responsive design using modern CSS techniques
- Typography system with Google Fonts integration
- Color scheme with primary gold accent (#d4af37)

### 3. JavaScript Functionality (script.js)
- Modular function organization
- Navigation system with smooth scrolling
- Mobile menu toggle functionality
- Active navigation link updates on scroll
- Gallery filtering system
- Form handling and validation
- Modal system for appointment booking
- Date picker with minimum date validation

## Data Flow

The application follows a simple client-side data flow:

1. **User Interaction**: Users interact with navigation, forms, and UI elements
2. **Event Handling**: JavaScript event listeners capture user actions
3. **DOM Manipulation**: Functions update the DOM based on user interactions
4. **Visual Feedback**: CSS transitions and animations provide user feedback

## External Dependencies

### CDN Resources
- **Google Fonts**: Playfair Display and Inter font families
- **Font Awesome**: Version 6.4.0 for icons
- **Google Fonts Preconnect**: Performance optimization for font loading

### Assets Required
- Logo file (assets/logo.svg) - referenced but not present in repository
- Additional images for gallery and content sections

## Deployment Strategy

This is a static website that can be deployed to any web hosting service:

### Deployment Options
1. **Static Hosting**: Netlify, Vercel, GitHub Pages
2. **Traditional Web Hosting**: Any Apache/Nginx server
3. **CDN**: Can be served directly from a CDN

### Requirements
- Web server capable of serving static files
- HTTPS recommended for production
- No server-side processing required
- No database requirements

### Performance Considerations
- Optimized font loading with preconnect
- Smooth scrolling implementation
- Responsive images should be added
- Minification recommended for production

## Key Features

1. **Responsive Design**: Mobile-first approach with breakpoints for all devices
2. **Smooth Navigation**: Scroll-based navigation with active link highlighting
3. **Interactive Elements**: Modal system, form validation, gallery filters
4. **Accessibility**: Semantic HTML structure and keyboard navigation support
5. **SEO Optimization**: Meta tags, structured content, and semantic markup
6. **Performance**: Optimized font loading and efficient CSS structure

## Technical Notes

- The JavaScript uses modern ES6+ features and assumes modern browser support
- The CSS uses CSS Grid and Flexbox for layout, requiring modern browser support
- All functionality is client-side with no backend dependencies
- The appointment booking system likely requires integration with a backend service or third-party booking platform
- Image assets are referenced but not included in the current repository structure