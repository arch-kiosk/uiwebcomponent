import { DateTime } from "luxon";
import { UIInputData } from "./uischema";
export declare function replaceData(template: string | null | undefined, data: UIInputData): any;
export declare function getLatinDate(dt: DateTime, withTime?: boolean): string;
