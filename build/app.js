"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var http = __importStar(require("http"));
var typeorm_1 = require("typeorm");
var http_status_codes_1 = require("http-status-codes");
var feedback_model_1 = require("./feedback.model");
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
var app = (0, express_1.default)();
var server = http.createServer(app);
var port = 5000;
var AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "88776655",
    database: "testing",
    entities: [
        feedback_model_1.Feedback
    ],
    synchronize: true
});
AppDataSource.initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization", err);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/parser', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var feedbackRepo, parse, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedbackRepo = AppDataSource.getRepository(feedback_model_1.Feedback);
                parse = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var getHTML, $, selector;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                getHTML = function (url) { return __awaiter(void 0, void 0, void 0, function () {
                                    var data, load;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, axios_1.default.get(url)];
                                            case 1:
                                                data = (_a.sent()).data;
                                                return [4 /*yield*/, cheerio_1.default.load(data)];
                                            case 2:
                                                load = _a.sent();
                                                return [2 /*return*/, load];
                                        }
                                    });
                                }); };
                                return [4 /*yield*/, getHTML('https://www.delivery-club.ru/srv/KFC_msk/feedbacks')];
                            case 1:
                                $ = _a.sent();
                                return [4 /*yield*/, getHTML('https://www.delivery-club.ru/srv/KFC_msk/feedbacks')];
                            case 2:
                                selector = _a.sent();
                                return [2 /*return*/, selector('.vendor-reviews-item__container').each(function (i, element) { return __awaiter(void 0, void 0, void 0, function () {
                                        var text, userName, date, order, answer, feedback, xui;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    text = selector(element).find('div.vendor-reviews-item__text').text();
                                                    userName = selector(element).find('div.vendor-reviews-item__username').text();
                                                    date = selector(element).find('div.vendor-reviews-item__date').text();
                                                    order = selector(element).find('div.vendor-reviews-item__order').text();
                                                    answer = selector(element).find('div.vendor-reviews-item__block vendor-reviews-item__block--answer.vendor-reviews-item__text').text();
                                                    return [4 /*yield*/, feedbackRepo.create({ text: text, userName: userName, order: order, date: date, answer: answer })];
                                                case 1:
                                                    feedback = _a.sent();
                                                    xui = feedbackRepo.save(feedback);
                                                    console.log(xui);
                                                    return [4 /*yield*/, feedbackRepo.save(feedback)];
                                                case 2: return [2 /*return*/, _a.sent()];
                                            }
                                        });
                                    }); })];
                        }
                    });
                }); };
                return [4 /*yield*/, parse()];
            case 1:
                result = _a.sent();
                //console.log(result);
                res.status(http_status_codes_1.StatusCodes.OK).send(result);
                return [2 /*return*/];
        }
    });
}); });
server.listen(port, function () {
    console.log("Server started");
});
//# sourceMappingURL=app.js.map