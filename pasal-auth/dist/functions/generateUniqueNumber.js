"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueNumber = void 0;
function generateUniqueNumber() {
    const usedIds = new Set();
    while (true) {
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        const uniqueNumber = randomNumber.toString();
        if (!usedIds.has(uniqueNumber)) {
            usedIds.add(uniqueNumber);
            return uniqueNumber;
        }
    }
}
exports.generateUniqueNumber = generateUniqueNumber;
//# sourceMappingURL=generateUniqueNumber.js.map