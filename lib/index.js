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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyvCacheProvider = void 0;
const crypto_1 = require("crypto");
const keyv_1 = __importDefault(require("keyv"));
class KeyvCacheProvider {
    constructor(opts) {
        opts = typeof opts === 'object' ? opts : typeof opts === 'string' ? { uri: opts } : {};
        const namespace = opts.namespace || opts.keyPrefix || 'typeorm:cache';
        this.cache = new keyv_1.default(Object.assign(Object.assign({}, opts), { namespace }));
        this.keyPrefix = opts.uri ? '' : namespace + ':';
    }
    generateIdentifier(query) {
        return query && `${crypto_1.createHash('md5').update(query).digest('hex')}`;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    synchronize(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getFromCache(options, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identifier, query, duration } = options;
            const key = `${this.keyPrefix}${identifier || this.generateIdentifier(query)}`;
            const result = yield this.cache.get(key);
            return (result && {
                identifier: key,
                duration,
                query,
                result,
            });
        });
    }
    storeInCache(options, savedCache, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identifier, query, duration, result } = options;
            const key = `${this.keyPrefix}${identifier || this.generateIdentifier(query)}`;
            yield this.cache.set(key, result, duration);
        });
    }
    isExpired(savedCache) {
        return false;
    }
    clear(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cache.clear();
        });
    }
    remove(identifiers, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const key of identifiers) {
                yield this.cache.delete(key);
            }
        });
    }
}
exports.KeyvCacheProvider = KeyvCacheProvider;
//# sourceMappingURL=index.js.map