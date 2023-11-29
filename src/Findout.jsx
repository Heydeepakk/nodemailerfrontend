import { useState,useEffect  } from 'react';
import styles from './Findout.module.css';
import successGIF from './assets/success.gif'; 

const Findout = () => {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subject: '',
        phoneNumber: ''
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        });
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        let timer;
        if (showSuccessPopup) {
            timer = setTimeout(() => {
                setShowSuccessPopup(false);
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [showSuccessPopup]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            try {
                const response = await fetch('https://mailnode.vercel.app/api/v1/auth/mail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    console.log('Form data submitted successfully');
                    setShowSuccessPopup(true);
                    setFormData({
                        name: '',
                        email: '',
                        message: '',
                        subject: '',
                        phoneNumber: ''
                    });
                } else {
                    console.error('Failed to submit form data');
                }
            } catch (error) {
                console.error('Error submitting form data:', error);
            }
        } else {
            console.error('Form validation failed. Please fill in all required fields.');
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
            <section className={styles.findout}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                    />

                    {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                    />

                    {formErrors.phoneNumber && <p className={styles.error}>{formErrors.phoneNumber}</p>}
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={styles.input}
                    />

                    {formErrors.subject && <p className={styles.error}>{formErrors.subject}</p>}
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {formErrors.message && <p className={styles.error}>{formErrors.message}</p>}

                    <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        className={styles.textarea}
                    ></textarea>
                    <button type="submit" className={styles.btn}>
                        Submit
                    </button>

            {showSuccessPopup && (
                <div className={styles.popupBackdrop}>
                    <div className={styles.successPopup}>
                        <img src={successGIF} alt="Success GIF" className={styles.successImage} />
                    </div>
                </div>
            )}


                </form>
            </section>
        </div>
    );
};

export default Findout;
