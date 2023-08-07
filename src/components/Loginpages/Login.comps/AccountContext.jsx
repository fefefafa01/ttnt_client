import { Link } from "react-router-dom";
import { backlocale } from "constants/constindex";

const { createContext, useState, useEffect } = require("react");
var loc;

export const AccountContext = createContext({
    user:null,
    setUser: () => {}
});

const UserContext = ({ children }) => {
    const [user, setUser] = useState({ loggedIn: null });
    useEffect(() => {
        loc = backlocale + "auth/login";
        fetch(loc, {
            credentials: "include",
        })
        .catch(err => {
            setUser({ loggedIn: false });
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