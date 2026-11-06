"use client";

import { useSyncExternalStore } from "react";

const BUILD_YEAR = new Date().getFullYear();
const noop = () => () => {};

/** The page is built once, so show the browser's current year in case the build is old. */
export default function Year() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => BUILD_YEAR);
  return <>{year}</>;
}
