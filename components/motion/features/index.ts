import type { Feature } from "../types";
import { revealFeature } from "./reveal";
import { focusTitlesFeature } from "./focus-titles";
import { statementsFeature } from "./statements";
import { flashlightFeature } from "./flashlight";
import { treeFeature } from "./tree";
import { marqueeFeature, redOpenFeature } from "./red-open";

/**
 * Efectos del motor, en orden de aparición en la página (importa para los
 * pins: ScrollTrigger calcula posiciones de arriba hacia abajo).
 */
export const features: Feature[] = [statementsFeature, flashlightFeature, treeFeature, redOpenFeature, marqueeFeature, revealFeature, focusTitlesFeature];
