import logo from "../../assets/logo-ahe.png";
import googlePlay from "../../assets/google-play.png";
import { Link } from "react-router-dom";
import { FiInstagram } from "react-icons/fi";
import { FaTwitter, FaTiktok } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col gap-10 bg-primaryColor px-[55px] pt-[55px] text-slate-100">
      <div className="grid gap-10 sm:grid-cols-3 lg:mx-auto xl:grid-cols-6">
        <div className=" md:grid-row-2 grid justify-center gap-10 sm:col-span-3 sm:grid-cols-2 sm:gap-0">
          <div className="col-span-1 flex flex-col text-center sm:text-start">
            <span className="text-xl font-bold sm:text-2xl">
              Anugrah Hadi Electric
            </span>
            <p>General Supplier Electrical</p>
          </div>
          <img
            src={logo}
            alt="logo-ahe"
            className="row-span-2 mx-auto hidden w-full max-w-64 bg-slate-100 p-1 md:block"
          />
          <p className="w-full max-w-80 text-wrap text-center sm:text-start">
            Jl. Sriwijaya III No.9, Perumnas 3, Kec. Karawaci, Kabupaten
            Tangerang, Banten 15810
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="text-lg font-bold">About Us</span>
          <Link to="/story">Story</Link>
          <Link to="/team">Team</Link>
          <Link to="/product">Product</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="flex flex-col items-center gap-2 sm:items-start sm:gap-4">
          <span className="text-lg font-bold">Follow Us</span>
          <div className="sm:flex-rows flex justify-center sm:flex-nowrap flex-wrap gap-2 text-primaryColor">
            <span className="flex h-9 w-9 items-center rounded-full bg-slate-100 p-2">
              <FiInstagram className="h-full w-full" />
            </span>
            <span className="flex h-9 w-9 items-center rounded-full bg-slate-100 p-2">
              <RiLinkedinFill className="h-full w-full" />
            </span>
            <span className="flex h-9 w-9 items-center rounded-full bg-slate-100 p-2">
              <FaTwitter className="h-full w-full" />
            </span>
            <span className="flex h-9 w-9 items-center rounded-full bg-slate-100 p-2">
              <FaTiktok className="h-full w-full" />
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 sm:col-span-1">
          <span className="text-center text-lg font-bold">
            Download Aplikasi
          </span>
          <img
            src="barcode"
            alt="barcode"
            className="h-36 w-full max-w-36 bg-slate-100"
          />
          <img
            src={googlePlay}
            alt="google-play-button"
            className="w-full max-w-36"
          />
        </div>
      </div>
      <span className="border-t p-3 text-center md:mx-16">
        Copyright © Anugrah Hadi Electric {new Date().getFullYear()}, All Right
        Reserved
      </span>
    </footer>
  );
};

export default Footer;
