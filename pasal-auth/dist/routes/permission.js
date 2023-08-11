"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const permissions_1 = require("../models/permissions");
const common_1 = require("@pasal/common");
const router = express_1.default.Router();
exports.permissionRouter = router;
router.get("/api/users/permission/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "all is good" });
}));
router.post("/api/users/permission/create", [
    express_validator_1.body("name")
        .isLength({ min: 2, max: 20 })
        .withMessage("Permission name is required"),
    express_validator_1.body("cat")
        .isLength({ min: 2, max: 20 })
        .withMessage("Permission category is required"),
    express_validator_1.body("guard_name")
        .isLength({ min: 2, max: 20 })
        .withMessage("Permission guard name is required"),
    express_validator_1.body("role")
        .isLength({ min: 2, max: 20 })
        .withMessage("Permission role is required"),
], common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cat, guard_name, role } = req.body;
    const existingPermission = yield permissions_1.Permission.findOne({ name, cat });
    if (existingPermission) {
        throw new common_1.BadRequestError(`Permission ${name} already exists with category ${cat}`);
    }
    const permission = permissions_1.Permission.build({
        name,
        cat,
        guard_name,
        role,
    });
    yield permission.save();
    res.status(200).json({ permission });
}));
//# sourceMappingURL=permission.js.map