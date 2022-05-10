import type { NextPage } from "next";
import { Fragment } from "react";
import { useMoralis } from "react-moralis";

const Marketplace: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();

  return (
    <Fragment>
      <div>foo bar baz</div>
    </Fragment>
  );
};

export default Marketplace;
