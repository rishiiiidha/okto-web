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
var ts_sdk_1 = require("@aptos-labs/ts-sdk");
function mintToken(aptos, to) {
    return __awaiter(this, void 0, void 0, function () {
        var pk, privateKey, wallet, txn, committedTxn, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pk = "0xe463268579cfabc2bafc6a1e8b13c65ac23baa6fd50c6adf2d3f9bd8b99dccf9";
                    privateKey = new ts_sdk_1.Ed25519PrivateKey(pk);
                    wallet = ts_sdk_1.Account.fromPrivateKey({ privateKey: privateKey });
                    return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: wallet.accountAddress,
                            data: {
                                function: "5b3eff8ec600a819a94ab5ae27c2d8cfd1dbc0f58aca6e31c9d5455d3ec6c090::todolist::create_list",
                                functionArguments: [to]
                            },
                        })];
                case 1:
                    txn = _a.sent();
                    return [4 /*yield*/, aptos.signAndSubmitTransaction({
                            signer: wallet,
                            transaction: txn,
                        })];
                case 2:
                    committedTxn = _a.sent();
                    return [4 /*yield*/, aptos.waitForTransaction({
                            transactionHash: committedTxn.hash,
                        })];
                case 3:
                    res = _a.sent();
                    return [2 /*return*/, res.success];
            }
        });
    });
}
var config = new ts_sdk_1.AptosConfig({ network: ts_sdk_1.Network.TESTNET });
var aptos = new ts_sdk_1.Aptos(config);
mintToken(aptos, "0x5b3eff8ec600a819a94ab5ae27c2d8cfd1dbc0f58aca6e31c9d5455d3ec6c090");
