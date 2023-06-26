import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./customer/modules/Auth/page/login/Login";

import PRIVATE_ROUTES from "./routes/privateRoutes";
import PUBLIC_ROUTES from "./routes/publicRoutes";
import SHIPPER_ROUTES from "./routes/shipperRoutes";

function App() {
  const role = useSelector((state) => state.user.userProfile.type);
  console.log(role);
  return (
    <Router>
      <Routes>
        {PUBLIC_ROUTES.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout;
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

        {PRIVATE_ROUTES.map((route, index) => {
          const Page = route.component;
          const Layout = route.layoutOne;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                role === 1 ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Login />
                )
              }
            />
          );
        })}

        {SHIPPER_ROUTES.map((route, index) => {
          const Page = route.component;
          const Layout = route.layoutOne;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                role === 3 ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Login />
                )
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
