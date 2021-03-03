exports.Conflict = class extends Error {
    constructor(message) {
        super(message);
        this.status = 409;
    }
};
exports.Unauthorized = class extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
};
exports.NotFound = class extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
};