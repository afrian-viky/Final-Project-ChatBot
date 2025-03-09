import * as React from "react";
import { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "#hero" },
  { name: "Features", href: "#features" },
  { name: "Tools", href: "#App" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [open, setOpen] = useState(false); // State untuk mengontrol menu mobile
  const [currentPage, setCurrentPage] = useState("Dashboard"); // Menyimpan halaman aktif

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen); // Berubah true/false saat tombol ditekan
  };

  const handleLinkClick = (name) => {
    setCurrentPage(name); // Mengubah nilai currentPage saat link diklik
    setOpen(false); // Menutup menu setelah klik
  };

  return (
    <Disclosure as="nav" className="bg-sky-500 fixed top-0 w-full z-50 shadow-md h-24">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-24 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            {/* Tombol menu mobile */}
            <DisclosureButton onClick={toggleMenu} className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="SmartData AI"
                src={require("../assets/d.png")}
                className="h-40 w-auto"
              />
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:block absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleLinkClick(item.name)} // Update current page on click
                  aria-current={currentPage === item.name ? "page" : undefined}
                  className={classNames(
                    currentPage === item.name
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel Navigasi Mobile */}
      <DisclosurePanel className={classNames(open ? "block" : "hidden", "sm:hidden")}>
        <div className="space-y-1 px-2 pb-3 pt-2 bg-sky-600 rounded-md">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              onClick={() => handleLinkClick(item.name)} // Update current page on click
              aria-current={currentPage === item.name ? "page" : undefined}
              className={classNames(
                currentPage === item.name
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
