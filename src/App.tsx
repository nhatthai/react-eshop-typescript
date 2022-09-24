import React from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogPage } from './pages/';

function App() {
  return (
    <div>
        <Header />
          <CatalogPage />
        <Footer />
    </div>
  );
}

export default App;
