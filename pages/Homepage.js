import React from 'react';
import "../styles/Home.module.css"

// Define a functional component for the homepage
function HomePage() {
  return (
    
    <div  className="container" style={{ width:'100%', margin: '0 auto', padding: '80px', fontFamily: 'Arial, sans-serif'}}>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <header style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h1>Welcome to HealthCare Plus</h1>
      <p>Your trusted partner for healthcare services</p>
    </header>
    <section id="services" style={{ marginBottom: '40px', width:'100%' }}>
      <h2>Our Services</h2>
      <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h3>Primary Care</h3>
        <p>At HealthCare Plus, we believe in providing comprehensive primary care services to individuals and families of all ages. Our dedicated team of healthcare professionals is committed to delivering personalized and compassionate care to help you achieve and maintain optimal health and well-being.</p>
      </div>
      <div style={{ backgroundColor:'#f9f9f9', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h3>Specialty Care</h3>
        <p>At Healthcare Plus, we understand that some medical conditions require specialized expertise and tailored treatment approaches. That's why we offer specialized care services to address complex medical conditions with precision and compassion..</p>
      </div>
      <div style={{ backgroundColor:'#f9f9f9', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h3>Emergency Care</h3>
        <p> we understand the importance of immediate access to high-quality emergency medical services.You can trust our dedicated team to provide you with 24/7 emergency medical services.</p>
      </div>
    </section>
    <section id="about" style={{ marginBottom: '40px',backgroundColor:'', width:'100%' }}>
      
      <h2>About Us</h2>
      <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <p>We are dedicated to providing high-quality healthcare services to our community. Our team of experienced healthcare professionals is committed to your well-being.</p>
      <h3 className="subsection-title">Why Choose Us?</h3>
  <ul className="choose-us-list">
    <li>Experienced and compassionate healthcare providers dedicated to your well-being.</li>
    <li>Convenient appointment scheduling and flexible hours to accommodate your busy lifestyle.</li>
    <li>State-of-the-art facilities equipped with the latest technology for accurate diagnosis and treatment.</li>
    <li>A commitment to excellence in patient care, safety, and satisfaction.</li>
  </ul>
  </div>
    </section>
    <section    id="contact" style={{ marginBottom:'160px',backgroundColor:'', width:'100%'}}>
        <h2>Contact Us</h2>
        <p>Get in touch with us to schedule an appointment or inquire about our services.</p>
        <p>Phone: <span style={{color: 'blue'}}>123-456-7890</span></p>
       <p>Email: <span style={{color: 'blue'}}>info@healthcareplus.com</span></p>
       {/* <p>Phone: 123-456-7890</p>
        <p>Email: info@healthcareplus.com</p>*/}
      </section>
  
  </div>
    
  );
}

export default HomePage;
