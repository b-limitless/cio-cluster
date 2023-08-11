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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissionsExists = exports.checkPermissionAllSet = void 0;
const permissions_1 = require("../../models/permissions");
const checkPermissionAllSet = (permissions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const perm = yield permissions_1.Permission.find({ name: { $in: permissions } }, { _id: true, name: true });
        if (perm.length === 0) {
            return {
                status: false,
                permissions: `Unable to find the permission ${permissions.join(", ")}`,
            };
        }
        if (Object.entries(perm).length > 0) {
            const names = perm.map((item) => item.name);
            const ifAllPermissionsExists = exports.checkPermissionsExists(permissions, names);
            if (ifAllPermissionsExists.length !== 0) {
                return {
                    status: false,
                    permissions: `Could not create user. Unable to find the permission ${ifAllPermissionsExists.join(", ")}`,
                };
            }
            else {
            }
        }
        const ids = perm.map((item) => item._id);
        return { status: true, permissions: ids };
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.checkPermissionAllSet = checkPermissionAllSet;
const checkPermissionsExists = (userPermission, serverPermission) => {
    let different = [];
    userPermission.sort();
    serverPermission.sort();
    different = userPermission.filter(function (item) {
        return serverPermission.indexOf(item) == -1;
    });
    return different;
};
exports.checkPermissionsExists = checkPermissionsExists;
//# sourceMappingURL=index.js.map