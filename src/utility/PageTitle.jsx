import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | D Flow</title>
    </Helmet>
  );
};

export default PageTitle;
