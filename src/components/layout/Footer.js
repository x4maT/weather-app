import React from 'react';
import { format } from 'date-fns';

const Footer = () => {
  const currentYear = format(new Date(), 'yyyy');

  return (
    <footer className="text-gray-600 body-font">
      <div className="bg-gray-100">
        <div
          className="
            container
            mx-2
            py-4
            px-5
            flex flex-wrap flex-col
            sm:flex-row
          "
        >
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {currentYear} Copyright:
            <a
              href="https://www.linkedin.com/in/maksym-sudakov-60b565193/"
              className="text-gray-600 ml-1"
              target="_blank"
              rel="noreferrer"
            >
              Maksym Sudakov 😎
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
