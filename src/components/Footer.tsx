import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white py-16 px-4 border-t">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Gadget Galaxy</h2>
            <p className="text-gray-600 mb-6">
              Your one-stop destination for cutting-edge technology and innovative gadgets. 
              Discover the future of tech with our carefully curated collection of devices.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<FaFacebookF size={20} />} />
              <SocialIcon icon={<FaTwitter size={20} />} />
              <SocialIcon icon={<FaInstagram size={20} />} />
              <SocialIcon icon={<FaLinkedinIn size={20} />} />
            </div>
          </div>

=          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Company</h3>
            <FooterLinks
              links={[
                { text: "About us", href: "/about" },
                { text: "Services", href: "/services" },
                { text: "Blog", href: "/blog" },
                { text: "Contact us", href: "/contact" }
              ]}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Support</h3>
            <FooterLinks
              links={[
                { text: "Knowledge base", href: "/knowledge" },
                { text: "Live chat", href: "/chat" }
              ]}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Company</h3>
            <FooterLinks
              links={[
                { text: "Our team", href: "/team" },
                { text: "Leadership", href: "/leadership" },
                { text: "Privacy Policy", href: "/privacy" }
              ]}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Products</h3>
            <FooterLinks
              links={[
                { text: "Smart Devices", href: "/smart-devices" },
                { text: "Wearables", href: "/wearables" },
                { text: "Accessories", href: "/accessories" }
              ]}
            />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              Copyright ©2024. All Rights Reserved. — Designed with love by 
              <a href="#" className="text-orange-500 hover:text-orange-600"> Gadget Galaxy</a>
            </p>
            <div className="flex space-x-6">
              <a href="/terms" className="text-gray-600 hover:text-orange-500 text-sm">
                Terms & Conditions
              </a>
              <a href="/privacy" className="text-gray-600 hover:text-orange-500 text-sm">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon:React.FC<any> = ({ icon }) => (
  <a 
    href="#" 
    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-colors"
  >
    {icon}
  </a>
);

const FooterLinks:React.FC<any> = ({ links }) => (
  <ul className="space-y-3">
    {links.map((link:any, index:number) => (
      <li key={index}>
        <a 
          href={link.href}
          className="text-gray-600 hover:text-orange-500 transition-colors"
        >
          {link.text}
        </a>
      </li>
    ))}
  </ul>
);

export default Footer;