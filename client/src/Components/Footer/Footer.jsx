import React from 'react'
import './Footer.css'
import footerLogo from '../Assets/logo_big.png'
// import instagramIcon from '../Assets/instagram_icon.png'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import pintesterIcon from '../Assets/pintester_icon.png'
import FacebookIcon from '@mui/icons-material/Facebook';
// import whatsappIcon from '../Assets/whatsapp_icon.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <hr />
        <div className='footer-container'>
            <div className='footer-social-icon'>
                <div className='footer-icons-container'>
                    <InstagramIcon fontSize="large"/>
                </div>
                <div className='footer-icons-container'>
                    <FacebookIcon fontSize="large" />
                </div>
                <div className='footer-icons-container'>
                    <WhatsAppIcon fontSize="large" />
                </div>
            </div>
            <div className='footer-copyright'>
                <p>Copyright @ 2024 - All Right Reserved</p>
            </div>
        </div>
    </div>
  )
}
