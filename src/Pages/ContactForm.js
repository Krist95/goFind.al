import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import classes from "./ContactForm.module.css";

const ContactForm = () => {
    let history = useHistory();
    const [status, setStatus] = useState("Konfirmo");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Po dërgohet...");
        const { name, email, message } = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            message: message.value,
        };
        let response = await fetch("https://api.instantwebtools.net/v1/airlines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        });
        setStatus("Konfirmo");
        let result = await response.json();
        alert(result.status);
        history.push('/');
    };
    return (
        <form className={classes.contact} onSubmit={handleSubmit}>
            <div>
                <h1>Na kontaktoni!</h1>
                <h4>Opinionet tuaja janë me vlerë për ne.</h4>
            </div>
            <div>
                <label htmlFor="name">Emri juaj:</label>
                <input type="text" id="name" required />
            </div>
            <div>
                <label htmlFor="email">Email juaj:</label>
                <input type="email" id="email" required />
            </div>
            <div>
                <label htmlFor="message">Mesazhi:</label>
                <textarea id="message" required />
            </div>
            <button type="submit">{status}</button>
        </form>
    );
};

export default ContactForm;