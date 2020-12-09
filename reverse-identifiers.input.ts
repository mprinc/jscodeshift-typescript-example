type NameOrNameArray = string | string[];
// import {IAImport} from './aExport';

// exportKind: 'value',
export {IBExport} from './bExport';

// exportKind: 'type',
// export type {ICType} from './cExport';

// export function createName(name: NameOrNameArray) {
//     if (typeof name === "string") {
//         return name;
//     }
//     else {
//         return name.join(" ");
//     }
// }

var greetingMessage = `Greetings, ${ createName(["Sam", "Smith"]) }`;
alert(greetingMessage);