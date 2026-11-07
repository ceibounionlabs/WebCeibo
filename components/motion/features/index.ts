import type { Feature } from "../types";
import { revealFeature } from "./reveal";
import { focusTitlesFeature } from "./focus-titles";
import { flashlightFeature } from "./flashlight";
import { stagesFeature } from "./stages";
import { footerLeavesFeature } from "./closing";

/** Efectos del motor, en orden de aparición en la página. */
export const features: Feature[] = [flashlightFeature, stagesFeature, footerLeavesFeature, revealFeature, focusTitlesFeature];
