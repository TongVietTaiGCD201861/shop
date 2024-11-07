import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatAll from "./chatAll";

export default function Footer() {
    return (
        <>
            <ChatAll></ChatAll>
            <div className="parallax" style={{ backgroundImage: "url(//bizweb.dktcdn.net/100/113/556/themes/161811/assets/cb-bg-img.jpg?1676963410531)" }}>
                <div className="custom-bottom"><h3>COLLECTION 2024</h3>
                    <h2>FREE SHIPPING</h2>
                    <div className="des-1">FOR ORDERS OVER 500K</div>
                    <div className="des-2">THIS PROGRAM IS APPLIED TO ALL OUR ITEMS</div>
                </div>
            </div>
            <footer>
                <div className="footer-content1">
                    <h3>code opacity</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo iste corrupti doloribus odio sed!</p>
                    <ul className="socials1">
                        <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                    </ul>
                </div>
                <div className="footer-bottom1">
                    <p>copyright &copy;2024 codeOpacity. designed by <span>TaiTV</span></p>
                </div>
            </footer>
        </>
    )
}