"use client"
import {useState, useEffect} from "react"
import AOS from 'aos';
import Link from "next/link";
import Styles from "./page.module.css"
export const Links = () => {
    return <>
        <Link href='https://www.about.iplust.in/'>About</Link>
        <Link href='https://www.iplust.in/#Services'>Services</Link>
        <Link href='https://www.iplust.in/jobs'>Jobs</Link>
        <Link href='https://www.iplust.in/#LetsTalk'>Let's Talk</Link>
    </>
}
export default function NavBar() {
    const [open, SetOpen] = useState(false);
    const [Class, SetClass] = useState(false)
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    function closePopup() {
        SetClass(true)
        setTimeout(() => {
            SetOpen(false)
            SetClass(false)
        }, 1000);
    }
    return (
        <>
            <div data-aos="fade-down" className={Styles.Session1}>
                <div>
                    <Link href="/" style={{fontSize:"50px",textDecoration:'none',fontWeight:'bolder'}}>S3 - Migration</Link>
                </div>
                <div>
                    <Link href='https://www.blog.iplust.in/'>Blog</Link>
                    <Links />
                </div>
                <div onClick={() => { open ? closePopup() : SetOpen(true) }}>&#9776;</div>
            </div>
            {open ? <div className={`${Styles.PopUp} ${Class ? Styles.open : ''}`} data-aos="fade-up">
                <div>
                    <a href='https://www.blog.iplust.in/' onClick={() => { open ? closePopup() : SetOpen(true) }}>Blog</a>
                    <div onClick={() => { open ? closePopup() : SetOpen(true) }}>&#10006;</div>
                </div>
                <Links />
                <Link href="https://www.iplust.in/contact-us">Contact US</Link>
                <Link href="https://www.iplust.in/terms-and-conditions">T & C</Link>
                <Link href="https://www.iplust.in/privacy-policy">Privacy Policy</Link>
            </div> : <></>}
        </>
    )
}