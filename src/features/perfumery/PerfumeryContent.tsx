import React from 'react';
import PerfumeryIntro from "./components/PerfumeryIntro";
import PerfumeryPerfumery from "./components/PerfumeryPerfumery";
import PerfumerDifferent from "./components/PerfumerDifferent";
import PerfumerBenefit from "./components/PerfumerBenefit";
import PerfumeryOrder from "./components/PerfumeryOrder";
import PerfumerInfo from "./components/PerfumerInfo";

const PerfumeryContent = () => {

  return (
    <>
      <PerfumeryIntro />
      <PerfumeryPerfumery />
      <PerfumerDifferent />
      <PerfumerBenefit/>
      <PerfumeryOrder/>
      <PerfumerInfo/>
    </>
  );
};

export default PerfumeryContent;
