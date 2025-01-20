"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds);
};
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=util.js.map