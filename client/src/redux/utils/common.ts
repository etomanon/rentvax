export interface StateCommon {
  pending: boolean;
  error: boolean;
}

export const pending = <T>(state: T) => {
  return {
    ...state,
    pending: true,
    error: false
  };
};

export const rejected = <T>(state: T) => {
  return {
    ...state,
    error: true,
    pending: false
  };
};
