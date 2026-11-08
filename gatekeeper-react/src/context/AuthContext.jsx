
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("gatekeeperUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(userData) {
    setUser(userData);

    sessionStorage.setItem(
      "gatekeeperUser",
      JSON.stringify(userData)
    );
  }

  function logout() {
    setUser(null);

    sessionStorage.removeItem("gatekeeperUser");
    sessionStorage.removeItem("gatekeeperToken");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
