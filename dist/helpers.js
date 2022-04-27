"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHash = exports.hash = void 0;
const crypto_1 = require("crypto");
function hash(data) {
    return (0, crypto_1.createHash)('sha256').update(data).digest('hex');
}
exports.hash = hash;
function checkHash({ hash, difficulty = 4, prefix = '0' }) {
    const check = prefix.repeat(difficulty);
    return hash.startsWith(check);
}
exports.checkHash = checkHash;
//# sourceMappingURL=helpers.js.map