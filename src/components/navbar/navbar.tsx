"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiInfo, FiCircle, FiMenu, FiX, FiArrowRight } from "react-icons/fi";

const routes = [
  { title: "About", href: "/dashboard/about", icon: FiInfo },
  { title: "Rollups", href: "/dashboard/recommendation", icon: FiCircle },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="w-full text-gray-700 bg-white border-b border-gray-200 shadow-sm rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between py-4">
            <Link
              href="/"
              className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline hover:text-gray-700 transition-colors"
            >
              Ledger Lens
            </Link>
            <button
              className="md:hidden rounded-lg focus:outline-none focus:shadow-outline hover:bg-gray-100 p-2 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
          <div className="flex items-center">
            <nav
              className={`flex-col flex-grow pb-4 md:pb-0 ${
                isOpen ? "flex" : "hidden"
              } md:flex md:justify-end md:flex-row`}
            >
              {routes.map(({ title, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 mt-2 text-sm font-semibold rounded-lg md:mt-0 md:ml-4 flex items-center gap-2
                    ${
                      pathname === href
                        ? "bg-gray-100 text-gray-900 shadow-sm"
                        : "bg-transparent hover:bg-gray-100 hover:text-gray-900 text-gray-500"
                    } focus:outline-none focus:shadow-outline transition-all duration-200`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{title}</span>
                </Link>
              ))}
            </nav>
            <Link
              href="/app"
              className="ml-24 p-6 py-2 bg-black text-white font-semibold hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:shadow-outline flex items-center gap-2"
            >
              Launch App
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
