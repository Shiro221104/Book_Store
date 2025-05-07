import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [CurrentUser, setCurrentUser] = useState(null); // Khởi tạo CurrentUser

  const login = (username) => {
    setCurrentUser({ username }); // Cập nhật CurrentUser
  };

  const logout = () => {
    setCurrentUser(null); // Xóa CurrentUser
  };

  return (
    <AuthContext.Provider value={{ CurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);