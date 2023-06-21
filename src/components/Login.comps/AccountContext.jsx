import { Link } from "react-router-dom";

const { createContext, useState, useEffect } = require("react");

export const AccountContext = createContext({
  user:null,
  setUser: () => {}
});

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  useEffect(() => {
    fetch("http://192.168.11.143:5005/auth/login", {
      credentials: "include",
    })
      .catch(err => {
        setUser({ loggedIn: false });
        console.log(err)
        return;
      })
      .then(r => {
        if (!r || !r.ok || r.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        return r.json();
      })
      .then(data => {
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...data });
        <Link to = '/homepage' />
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;