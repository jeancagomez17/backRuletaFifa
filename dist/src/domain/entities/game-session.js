"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetType = exports.GameStatus = exports.GameMode = void 0;
var GameMode;
(function (GameMode) {
    GameMode["LEAGUE"] = "league";
    GameMode["CUSTOM"] = "custom";
})(GameMode || (exports.GameMode = GameMode = {}));
var GameStatus;
(function (GameStatus) {
    GameStatus["ACTIVE"] = "active";
    GameStatus["FINISHED"] = "finished";
})(GameStatus || (exports.GameStatus = GameStatus = {}));
var BetType;
(function (BetType) {
    BetType["MONEY"] = "money";
    BetType["ITEM"] = "item";
})(BetType || (exports.BetType = BetType = {}));
//# sourceMappingURL=game-session.js.map