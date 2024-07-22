// app/layout.tsx
import React from 'react';
import './styles/globals.css' // Import global CSS

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
