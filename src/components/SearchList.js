//Link with SearchingHandler.js in ./server
import { PartList } from "./PartList";
import { DownloadFile } from "./DownloadFile";
import { PartGroup } from "./PartGroup";
import Profile from "components/Profile";

function ResultList() {
  return (
    <div class="wrappers">
      <div class="tabs">
        <div class="tab">
          <input type="radio" name="css-tabs" checked className="tab-switch" />
          <label for="tab-1" className="tab-label">
            Search Result
          </label>
          <div className="tabcontent">
            <h3> Welcome! </h3>
            <div className="Scroll" id="scroll-style">
              <div className="contents">
                <h1>Please Enter Search Criteria</h1>
                <h2>to see your result!</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ResultList };
