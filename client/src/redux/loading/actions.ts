import { createStandardAction } from "typesafe-actions";

export const loadingAdd = createStandardAction("LOADING_ADD")();

export const loadingRemove = createStandardAction("LOADING_REMOVE")();
