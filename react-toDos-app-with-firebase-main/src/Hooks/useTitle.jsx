import { useEffect, useState } from "react";

const useTitle = (getTitle) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    setTitle(getTitle);
    document.title = `${title} - ToDos Application`;
  }, [getTitle, title]);
  return [title];
};

export default useTitle;
