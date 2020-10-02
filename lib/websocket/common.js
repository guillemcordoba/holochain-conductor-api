export const catchError = (res) => res.type == 'Error' ? Promise.reject(res) : Promise.resolve(res);
//# sourceMappingURL=common.js.map