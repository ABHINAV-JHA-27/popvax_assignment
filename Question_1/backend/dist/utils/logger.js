"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Logger;
function Logger(message, type) {
    let prefix = "";
    switch (type) {
        case "info":
            prefix = "[server]";
            break;
        case "database":
            prefix = "[database]";
            break;
        case "auth":
            prefix = "[auth]";
            break;
        case "error":
            prefix = "[error]";
            break;
        default:
            prefix = "[server]";
            break;
    }
    console.log(`${prefix}: ${message}`);
}
