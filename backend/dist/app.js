"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const create_router_1 = require("./routes/create.router");
const confirmation_router_1 = require("./routes/confirmation.router");
const get_router_1 = require("./routes/get.router");
const deleteId_router_1 = require("./routes/deleteId.router");
class App {
    constructor() {
        this.app = (0, express_1.default)();
    }
    ;
    listen() {
        const PORT = 3333;
        this.app.listen(PORT, () => {
            console.log(`Server running in the port ${PORT}!!`);
        });
    }
    ;
    register() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(create_router_1.createRouter);
        this.app.use(confirmation_router_1.confirmationRouter);
        this.app.use(get_router_1.getRouter);
        this.app.use(deleteId_router_1.deletIdRouter);
    }
}
exports.App = App;
