import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-center py-4">
      <div className="container">
        <p className="mb-0 text-white">
          &copy; {new Date().getFullYear()} - Built by Software Engineering Students (Cohort-8) @ alx-Africa - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;