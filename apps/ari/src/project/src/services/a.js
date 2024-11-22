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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
// SingleChatService.ts
var fs_1 = require("fs");
var llm_factory_ts_1 = require("./LLM/llm-factory.ts");
var prompts_1 = require("@langchain/core/prompts");
var runnables_1 = require("@langchain/core/runnables");
var output_parsers_1 = require("@langchain/core/output_parsers");
var SingleChatService = /** @class */ (function () {
    function SingleChatService() {
        this.LLM = llm_factory_ts_1.default.createLLM(llm_factory_ts_1.LLMType.OPENAI);
        this.promptTemplate = new prompts_1.PromptTemplate({
            template: "\n      \uB2F9\uC2E0\uC740 \uCF54\uB4DC\uB97C \uBD84\uC11D\uD558\uACE0 \uD3C9\uAC00\uD558\uB294 AI \uCF54\uB4DC \uB9AC\uBDF0\uC5B4\uC785\uB2C8\uB2E4. \uB2F9\uC2E0\uC758 \uC784\uBB34\uB294 \uC8FC\uC5B4\uC9C4 \uCF54\uB4DC\uC640 \uD3C9\uAC00 \uAE30\uC900\uC744 \uBC14\uD0D5\uC73C\uB85C \uCF54\uB4DC\uB97C \uD3C9\uAC00\uD558\uACE0 \uAC1C\uC120\uC810\uC744 \uC81C\uC548\uD558\uB294 \uAC83\uC785\uB2C8\uB2E4.\n      \uB300\uC0C1\uC790\uC758 \uC131\uC7A5\uC744 \uC704\uD558\uC5EC \uCD5C\uB300\uD55C \uBE44\uD310\uC801\uC778 \uC2DC\uC120\uC5D0\uC11C \uD3C9\uAC00\uD558\uB294 \uAC83\uC774 \uC911\uC694\uD569\uB2C8\uB2E4.\n\n      \uC544\uB798\uC758 \uCF54\uB4DC\uB294 ./pagination.ts \uD30C\uC77C\uC5D0\uC11C \uAC00\uC838\uC628 \uAC83\uC785\uB2C8\uB2E4:\n\n      #Code:\n      {code}\n\n      \uC544\uB798\uB294 \uD3C9\uAC00 \uAE30\uC900\uC785\uB2C8\uB2E4:\n      1. \uCF54\uB4DC\uC758 \uAC00\uB3C5\uC131\uACFC \uC720\uC9C0\uBCF4\uC218\uC131\n      2. ts\uC758 \uCCA0\uD559\uC5D0 \uC77C\uCE58\uD558\uB294\uC9C0\uC5D0 \uB300\uD558\uC5EC\n      3. \uC77C\uAD00\uB41C \uB124\uC774\uBC0D \uCEE8\uBCA4\uC158 \uC0AC\uC6A9\uC5EC\uBD80\n      4. \uD0C0\uC785 \uAD6C\uC870 \uD65C\uC6A9 \uB2A5\uB825\n      5. \uCF54\uB4DC \uAC1C\uC120 \uAC00\uB2A5\uC131\n\n      \uC8FC\uC5B4\uC9C4 \uCF54\uB4DC\uC5D0 \uB300\uD574 \uD3C9\uAC00\uD558\uACE0 \uAC1C\uC120\uC810\uC744 \uC81C\uC548\uD558\uC138\uC694.\n\n      #Evaluation:\n    ",
            inputVariables: ["code"],
        });
        this.outputParser = new output_parsers_1.StringOutputParser();
    }
    SingleChatService.prototype.askQuery = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var code, chatChain, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        code = fs_1.default.readFileSync(filePath, "utf-8");
                        chatChain = runnables_1.RunnableSequence.from([
                            new runnables_1.RunnablePassthrough(),
                            this.promptTemplate,
                            this.LLM,
                            this.outputParser,
                        ]);
                        return [4 /*yield*/, chatChain.invoke({
                                code: code,
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return SingleChatService;
}());
// Example usage
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var chatService, filePath, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatService = new SingleChatService();
                filePath = "./code.js";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, chatService.askQuery(filePath)];
            case 2:
                response = _a.sent();
                console.log("Response:", response);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error during query:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })();
