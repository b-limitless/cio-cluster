"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedPublisher = void 0;
const common_1 = require("@pasal/common");
class UserCreatedPublisher extends common_1.Publisher {
    constructor() {
        super(...arguments);
        this.subject = common_1.Subjects.UserCreated;
    }
}
exports.UserCreatedPublisher = UserCreatedPublisher;
//# sourceMappingURL=user-created-publisher.js.map