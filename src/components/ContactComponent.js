import React from 'react';


const ContactForm = () => {
    return (
        <div className="contact-form">
            <div className="contact-form-container">
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">Prénom *</label>
                        <input type="text" id="firstName" name="firstName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Nom *</label>
                        <input type="text" id="lastName" name="lastName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Adresse Email *</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <button type="submit">Envoyer</button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
