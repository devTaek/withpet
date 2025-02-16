import React from 'react'

const Footer = () => {
  return (
    <footer className="py-4 mt-auto h-16">
      <div className="w-11/12 max-w-[1100px] mx-auto">
        <div className="flex justify-center gap-10">
          <li className="text-lg font-semibold">
            <a href="#project-archive" className="hover:text-red-500 transition-colors font-black">PROJECT ARCHIVE</a>
          </li>
          <li className="text-lg font-semibold">
            <a href="#merch-shop" className="hover:text-yellow-500 transition-colors font-black">MERCH SHOP</a>
          </li>
          <li className="text-lg font-semibold">
            <a href="#about" className="hover:text-green-500 transition-colors font-black">ABOUT</a>
          </li>
          <li className="text-lg font-semibold">
            <a href="#instagram" className="hover:text-blue-500 transition-colors font-black">INSTAGRAM</a>
          </li>
          <li className="text-lg font-semibold">
            <a href="#contact" className="hover:text-purple-500 transition-colors font-black">CONTACT</a>
          </li>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
