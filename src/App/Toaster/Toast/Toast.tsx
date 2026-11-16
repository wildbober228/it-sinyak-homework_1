import { observer } from "mobx-react-lite";

import type { ToastProps } from "./logic/usePresenter";
import { usePresenter } from "./logic/usePresenter";

export const Toast = observer(function Toast(props: ToastProps) {
  const { className, text } = usePresenter(props);

  return <li className={className}>{text}</li>;
});
