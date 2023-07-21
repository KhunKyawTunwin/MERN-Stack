import { google, slack, atlassian, dropbox, shopify } from "./import";
import "./trustedBy.scss";

const TrustedBy = () => {
  return (
    <div className="trustedBy">
      <div className="container">
        <span>Tursted by :</span>
        <img src={google} alt="" />
        <img src={slack} alt="" />
        <img src={atlassian} alt="" />
        <img src={dropbox} alt="" />
        <img src={shopify} alt="" />
      </div>
    </div>
  );
};
export default TrustedBy;
