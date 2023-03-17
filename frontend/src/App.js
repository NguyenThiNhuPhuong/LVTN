import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./layouts/component/pageNotFound/PageNotFound";
import DefaultLayout from "./layouts/defaultLayout";
import PUBLICROUTES from "./routes/publicRoutes";

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
      </Routes>
    </Router>
  );
}

export default App;
