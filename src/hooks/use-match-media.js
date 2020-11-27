// © 2020 donaldpipowitch
// https://github.com/donaldpipowitch

import { useState, useEffect } from "react";

export function useMatchMedia(query) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = matchMedia(query);
    const onChange = (e) => setMatches(e.matches);

    mediaQueryList.addEventListener("change", onChange);
    return () => mediaQueryList.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
