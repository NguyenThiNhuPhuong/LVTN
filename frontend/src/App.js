import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PUBLICROUTES from "./routes/publicRoutes";
import PRIVATEROUTES from "./routes/privateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {PUBLICROUTES.map((route, index) => {
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
        {PRIVATEROUTES.map((route, index) => {
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
      </Routes>
    </Router>
  );
}

export default App;
