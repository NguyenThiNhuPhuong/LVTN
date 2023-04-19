import { useSelector } from "react-redux";
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./customer/modules/Auth/page/login/Login";
import PRIVATE_ROUTES from "./routes/privateRoutes";
import PUBLIC_ROUTES from "./routes/publicRoutes";
import SHIPPER_ROUTES from "./routes/shipperRoutes";

function App() {
  const role = useSelector((state) => state.auth.userInfo?.type);
  const token = useSelector((state) => state.auth.token);
  //   if (token === undefined) {
  //     return navigate("/login");
  //   }
  console.log(token);
  return (
    <Router>
      <Routes>
        {PUBLIC_ROUTES.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout;
          return (
            <>
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            </>
          );
        })}
        {PRIVATE_ROUTES.map((route, index) => {
          const Page = route.component;
          const Layout = route.layoutOne;
          return (
            <>
              <Route
                key={index}
                path={route.path}
                element={
                  token && role === 1 ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Login />
                  )
                }
              />
            </>
          );
        })}
        {SHIPPER_ROUTES.map((route, index) => {
          const Page = route.component;
          const Layout = route.layoutOne;
          return (
            <>
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            </>
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
