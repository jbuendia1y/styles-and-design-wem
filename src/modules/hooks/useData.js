import { useState, useEffect } from "react";

export default function useData(property) {
  const [jsonData, setData] = useState(null);

  useEffect(() => {
    import("../../../dist/assets/data.json").then((res) => {
      if (typeof property === "string") {
        const keys = property.split("/");
        let cache = res;
        for (const key of keys) {
          cache = cache[key];
        }
        setData(cache);
      } else setData(res[property]);
      import("../../js/lazy-images");
    });
  }, []);

  return { jsonData };
}
