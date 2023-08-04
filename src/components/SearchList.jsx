import "./comp.styles/SearchList.scss";
import { Changer } from "./Languages/LanguageChange";

function SearchResult() {
    return (
        <div className="tabcontent">
            <h3><Changer inp="Welcome!" /></h3>
            <div className="Scrolll">
                <div className="contents">
                    <h1><Changer inp="Please Enter Search Criteria" /></h1>
                    <h2><Changer inp="to see your result!" /></h2>
                </div>
            </div>
        </div>
    );
}

export { SearchResult };
