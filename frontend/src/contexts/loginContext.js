import React, { createContext, useState } from "react";

const LoginContext = createContext("");

function LoginProvider({ children }) {
  const [login, setLogin] = useState({
    isLogged: false,
    user: ""
  });
  
  const obj = { login: login, setLogin: setLogin };
  console.log(obj)
  
  return (
    <LoginContext.Provider value={obj}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
export { LoginContext };