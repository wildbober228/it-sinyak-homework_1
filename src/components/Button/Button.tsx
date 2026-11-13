import { observer } from "mobx-react-lite";

import type { ButtonProps } from "./usePresenter";
import { usePresenter } from "./usePresenter";

export const Button = observer(function Button(props: ButtonProps) {
  const { className, buttonProps } = usePresenter(props);

  return <button type="button" {...buttonProps} className={className} />;
});
