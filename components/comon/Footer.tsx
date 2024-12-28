// components/Footer.tsx
const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="text-center text-xs mt-32 mb-16">
        <p>©NULL256 {currentYear}</p>
      </footer>
    );
  };
  
  export default Footer;