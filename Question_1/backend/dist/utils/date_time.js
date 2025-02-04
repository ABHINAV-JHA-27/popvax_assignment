"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDate = void 0;
const createDate = (dateStr) => {
    if (!dateStr)
        return null;
    const date = new Date(dateStr);
    // Set time to "00:00:00.000" (midnight) UTC
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString();
};
exports.createDate = createDate;
