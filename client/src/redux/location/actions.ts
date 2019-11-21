import { createStandardAction } from "typesafe-actions";

import { Location } from "../../types/location";

export const locationSet = createStandardAction("LOCATION_SET")<Location>();
