"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMFactory = exports.LLMType = void 0;
var openai_1 = require("@langchain/openai");
var anthropic_1 = require("@langchain/anthropic");
var api_key_config_ts_1 = require("../../global/config/api-key.config.ts");
exports.LLMType = {
    OPENAI: "openai",
    ANTHROPIC: "anthropic",
};
var LLMFactory = /** @class */ (function () {
    function LLMFactory() {
    }
    LLMFactory.createLLM = function (type) {
        switch (type) {
            case exports.LLMType.OPENAI:
                return new openai_1.ChatOpenAI({
                    model: "gpt-4o-mini",
                    openAIApiKey: api_key_config_ts_1.default.OPENAI_API_KEY,
                    temperature: 0.3,
                });
            case exports.LLMType.ANTHROPIC:
                return new anthropic_1.ChatAnthropic({
                    model: "claude-3-5-sonnet-20240620",
                    anthropicApiKey: api_key_config_ts_1.default.ANTHROPIC_API_KEY,
                    temperature: 0.3,
                });
            default:
                var _exhaustiveCheck = type;
                throw new Error("Unsupported LLM type: ".concat(_exhaustiveCheck));
        }
    };
    return LLMFactory;
}());
exports.LLMFactory = LLMFactory;
exports.default = LLMFactory;
