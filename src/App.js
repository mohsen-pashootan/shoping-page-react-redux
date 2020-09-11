import React, { useEffect } from "react";
import ShopItems from "./component/index";
import { getInitData } from "./stateManager/actionCreator";
import { useDispatch } from "react-redux";
import Layout from "./sharedComponent/layout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitData());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <ShopItems />
      </Layout>
    </>
  );
}

export default App;
