import { toast } from "react-toastify";

import { store } from "./../../App";
import { loadingAdd, loadingRemove } from "../../redux/loading/actions";

export const callAsyncAction = async <T>(action: () => Promise<T>) => {
  const { dispatch } = store;
  try {
    dispatch(loadingAdd());
    const result = await action();
    dispatch(loadingRemove());
    return result;
  } catch (e) {
    dispatch(loadingRemove());
    toast.error(e.message);
    return null;
  }
};
