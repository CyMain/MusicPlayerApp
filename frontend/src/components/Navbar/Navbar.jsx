import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import {User} from "lucide-react";


export default function Navbar({ pageController }){
    const [isVisible, setIsVisible] = useState(true)
    const [isScrolled, setIsScrolled] = useState(false)
    const navbar_ref = useRef(null)
    // const top_Y = 0

    useEffect(()=>{
        let lastScrollY = window.scrollY
        
        const handleScroll = ()=>{
            const currentScrollY = window.scrollY

            if (currentScrollY <= 0){
                setIsScrolled(false)
                setIsVisible(true)
                lastScrollY = 0
                return;
            }

            // Mark floating once scrolled past 50px
            setIsScrolled(currentScrollY > 50);
    
            // Hide on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
    
            lastScrollY = currentScrollY;
        }


        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])


    function changePage(targetPage){
        if (pageController.currPage == targetPage){
            console.log(`Already at ${targetPage}`)
            return;
        }
        pageController.setCurrPage(targetPage)
    }


    // function handleNavBar(){
    //     const currentScrollY = window.scrollY
    //     const nav_bar_tag = navbar_ref.current
    //     if (currentScrollY == top_Y){
    //         nav_bar_tag.classList.remove("floating")
    //         nav_bar_tag.classList.remove("hidden")
    //         console.log("At top.")
    //     }
    //     else if (currentScrollY > top_Y){
    //         if (currentScrollY < lastScrollY){
    //             nav_bar_tag.classList.remove("hidden")
    //             nav_bar_tag.classList.add("floating")
    //             console.log("Going up")
    //         } else{
    //             nav_bar_tag.classList.remove("floating")
    //             nav_bar_tag.classList.add("hidden")
    //             console.log("Going down.")
    //         }
    //     } else{
    //         console.log("How is that even possible!?!!??!?")
    //     }

    //     setLastScrollY(currentScrollY)
    // }

    // window.addEventListener("scroll", handleNavBar)


    // useEffect(() => {
    //     let lastScrollY = window.scrollY;

    //     const handleScroll = () => {
    //     const currentScrollY = window.scrollY;

    //     // Check if user has scrolled past top hero area (e.g., 50px)
    //     if (currentScrollY > 50) {
    //         setIsScrolled(true);
    //     } else {
    //         setIsScrolled(false);
    //     }

    //     // Scrolling Down -> Hide, Scrolling Up -> Show
    //     if (currentScrollY > lastScrollY && currentScrollY > 50) {
    //         setIsVisible(false);
    //     } else {
    //         setIsVisible(true);
    //     }

    //     lastScrollY = currentScrollY;
    //     };

    //     window.addEventListener("scroll", handleScroll, { passive: true });
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);



    return(
        <>
            <nav ref={navbar_ref}
                className={`nav-bar ${isScrolled ? "floating" : ""} ${
                    !isVisible ? "hidden" : ""
                }`}
            >
                <ul className="nav-list">
                    <li className="nav-item"
                        onClick={()=>changePage("home")}
                    >
                        Home
                    </li>
                    <li className="nav-item"
                        onClick={()=>changePage("playlist")}
                    >
                        Playlist
                    </li>
                    <li className="nav-item"
                        onClick={()=>changePage("profile")}
                    >
                        Profile
                    </li>
                </ul>
                <div className="account-block-nav"
                    onClick={()=>changePage("profile")}
                >
                    <figure className="pfp-nav-container">
                        <User/>
                    </figure>
                    <p className="account-name-nav">
                        Guest
                    </p>
                </div>
            </nav>
        </>
    )
}