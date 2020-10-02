"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
exports.catchError = (res) => res.type == 'Error' ? Promise.reject(res) : Promise.resolve(res);
//# sourceMappingURL=common.js.map