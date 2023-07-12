import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="flex-grow-1">{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;