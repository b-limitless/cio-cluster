"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerifiedPublisher = void 0;
const common_1 = require("@pasal/common");
class UserVerifiedPublisher extends common_1.Publisher {
    constructor() {
        super(...arguments);
        this.subject = common_1.Subjects.UserVerified;
    }
}
exports.UserVerifiedPublisher = UserVerifiedPublisher;
//# sourceMappingURL=user-verified-publisher.js.map