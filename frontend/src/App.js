import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PUBLIC_ROUTES from "./routes/publicRoutes";
import PRIVATE_ROUTES from "./routes/privateRoutes";

function App() {
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
