import type { ReactNode } from "react";

import { observer } from "mobx-react-lite";

import styles from "./Rack.module.css";

type RackProps = {
  children: ReactNode;
};

export const Rack = observer(function Rack(props: RackProps) {
  return <div className={styles.rack}>{props.children}</div>;
});
