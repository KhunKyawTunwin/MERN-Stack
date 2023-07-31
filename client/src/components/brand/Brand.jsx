import React from "react";
import { google, slack, atlassian, dropbox, shopify } from "./imports";
import "./brand.css";

const Brand = () => (
  <div className="gpt3__brand section__padding">
    <div>
      <a href="https://www.myanfobase.com/" target="_blank">
        <img src={google} />
      </a>
    </div>
    <div>
      <a href="https://slack.com/" target="_blank">
        <img src={slack} />
      </a>
    </div>
    <div>
      <img src={atlassian} />
    </div>
    <div>
      <img src={dropbox} />
    </div>
    <div>
      <img src={shopify} />
    </div>
  </div>
);

export default Brand;
