import Footer from "components/Footer";
import Paper from "components/Paper";
import Toasts from "components/Toasts";
import Header from "components/common/Header";
import { ServerNavMobileProvider } from "helpers/serverNavMobile";
import { CookieNotice } from "react-cookienotice";
import { Outlet, useLocation } from "react-router-dom";
import Container, { ServerDashboardOutlet } from "styles/App";

export const App = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isServerDashboard = /^\/dashboard\/[^/]+/.test(location.pathname);

  return (
    <ServerNavMobileProvider>
      <Container>
        <Header />
        <Paper elevation={24} className="content">
          {isHome ? (
            <Outlet />
          ) : isServerDashboard ? (
            <ServerDashboardOutlet>
              <Outlet />
            </ServerDashboardOutlet>
          ) : (
            <div className="container">
              <Outlet />
            </div>
          )}
        </Paper>
        <Footer />
        <CookieNotice />
        <Toasts />
      </Container>
    </ServerNavMobileProvider>
  );
};

export default App;
