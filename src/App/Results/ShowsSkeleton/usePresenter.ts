import { PAGE_SIZE } from "../../constants";

const placeholders = Array.from({ length: PAGE_SIZE }, (_, index) => index);

export function usePresenter() {
  return { placeholders };
}
