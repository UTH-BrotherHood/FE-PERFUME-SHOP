import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './Routes';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import BlankLayout from './layouts/BlankLayout';
import { isAuthenticated } from './utils/authUntil';

function App() {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    let timer : any;
    if (showLoginPrompt) {
      timer = setTimeout(() => {
        setShowLoginPrompt(false);
      }, 5000); 
    }

    return () => clearTimeout(timer); // Hủy bỏ timer nếu component bị unmount hoặc state thay đổi
  }, [showLoginPrompt]);

  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout || MainLayout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout || MainLayout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                isAuthenticated() ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Navigate
                    to="/"
                    replace={true}
                    state={{ showLoginPrompt: true }} // Truyền state để hiển thị thông báo
                  />
                )
              }
            />
          );
        })}
        {showLoginPrompt && (
          <Route
            path="/"
            element={
              <BlankLayout>
                <div>Bạn cần đăng nhập để truy cập trang này.</div>
              </BlankLayout>
            }
          />
        )}
        <Route
          path="*"
          element={
            <BlankLayout>
              <NotFound />
            </BlankLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
