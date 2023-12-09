//This Hooks scrolls on top of the route page loaded (Used When changing routes)

import { useEffect } from "react";

const useScrollTop = (pagenumber) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagenumber]);
};

export default useScrollTop;
