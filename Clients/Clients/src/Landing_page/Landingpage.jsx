import React from "react";
import Navbar from "./navbar";
import Features from "./Features";
import HeroPage from "./heropage";
import Works from "./Works";
import Footer from "./Footer";

export default function Landingpage(){
    return(
        <>
            <Navbar />
            <HeroPage />
            <Features />
            <Works />
            <Footer />
        </>
    )
}