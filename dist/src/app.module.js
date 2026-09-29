"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./infrastructure/prisma/prisma.module");
const leagues_module_1 = require("./application/use-cases/leagues/leagues.module");
const teams_module_1 = require("./application/use-cases/teams/teams.module");
const custom_wheels_module_1 = require("./application/use-cases/custom-wheels/custom-wheels.module");
const game_sessions_module_1 = require("./application/use-cases/game-sessions/game-sessions.module");
const leagues_controller_1 = require("./interface/controllers/leagues.controller");
const teams_controller_1 = require("./interface/controllers/teams.controller");
const custom_wheels_controller_1 = require("./interface/controllers/custom-wheels.controller");
const game_sessions_controller_1 = require("./interface/controllers/game-sessions.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            leagues_module_1.LeaguesModule,
            teams_module_1.TeamsModule,
            custom_wheels_module_1.CustomWheelsModule,
            game_sessions_module_1.GameSessionsModule,
        ],
        controllers: [
            leagues_controller_1.LeaguesController,
            teams_controller_1.TeamsController,
            custom_wheels_controller_1.CustomWheelsController,
            game_sessions_controller_1.GameSessionsController,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map