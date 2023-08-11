"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileUpdatedPublisher = void 0;
const common_1 = require("@pasal/common");
class UserProfileUpdatedPublisher extends common_1.Publisher {
    constructor() {
        super(...arguments);
        this.subject = common_1.Subjects.ProfileUpdated;
    }
}
exports.UserProfileUpdatedPublisher = UserProfileUpdatedPublisher;
//# sourceMappingURL=profile-updated-publisher.js.map