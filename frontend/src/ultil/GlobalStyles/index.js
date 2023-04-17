import "./GlobalStyles.scss";
function GlobalStyles({ children }) {
  return <div key={children}>{children}</div>;
}

export default GlobalStyles;
