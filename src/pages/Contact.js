import React from 'react';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ContactForm from '../components/ContactComponent';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div>
            <Logo />
            <Navigation />
            <ContactForm />
            <Footer />
        </div>
    );
};

export default Contact;