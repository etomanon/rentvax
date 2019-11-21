import { createStandardAction } from "typesafe-actions";

import { Location } from "../../utils/types/location";

export const locationSet = createStandardAction("LOCATION_SET")<Location>();
