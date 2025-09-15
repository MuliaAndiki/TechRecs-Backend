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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const AiSchema = new mongoose_1.Schema({
    prompt: {
        text: { type: String, required: true },
        category: {
            deviceType: {
                type: String,
                enum: ["laptop", "phone", "tablet"],
                default: null,
            },
            brand: { type: String },
            releaseYear: { type: Number },
            budget: {
                min: { type: Number },
                max: { type: Number },
            },
            laptop: {
                processor: {
                    brand: {
                        type: String,
                        enum: ["Intel", "AMD", "Apple"],
                        default: null,
                    },
                    model: { type: String },
                    cores: { type: Number },
                    generation: { type: String },
                },
                ram: {
                    size: { type: String },
                    type: {
                        type: String,
                        enum: ["DDR4", "DDR5", "LPDDR5"],
                        default: null,
                    },
                    upgradable: { type: Boolean },
                },
                storage: {
                    type: {
                        type: String,
                        enum: ["SSD", "HDD", "Hybrid"],
                        default: null,
                    },
                    capacity: { type: String },
                    expandable: { type: Boolean },
                },
                gpu: {
                    brand: {
                        type: String,
                        enum: ["NVIDIA", "AMD", "Intel"],
                        default: null,
                    },
                    model: { type: String },
                    vram: { type: String },
                },
                display: {
                    size: { type: String },
                    resolution: {
                        type: String,
                        enum: ["1080p", "1440p", "4K"],
                        default: null,
                    },
                    refreshRate: { type: Number },
                    panelType: {
                        type: String,
                        enum: ["IPS", "OLED", "MiniLED"],
                        default: null,
                    },
                },
                battery: {
                    capacityWh: { type: Number },
                    lifeHours: { type: Number },
                },
                weight: { type: Number },
                os: {
                    type: String,
                    enum: ["Windows", "macOS", "Linux"],
                    default: null,
                },
                connectivity: [{ type: String }],
                purpose: {
                    type: String,
                    enum: ["gaming", "work", "student", "creator", "general"],
                    default: null,
                },
            },
            phone: {
                processor: {
                    brand: {
                        type: String,
                        enum: ["Qualcomm", "MediaTek", "Apple", "Exynos"],
                        default: null,
                    },
                    model: { type: String },
                },
                ram: { type: String },
                storage: { type: String },
                expandableStorage: { type: Boolean },
                camera: {
                    rear: {
                        count: { type: Number },
                        resolution: { type: String },
                        features: [{ type: String }],
                    },
                    front: {
                        resolution: { type: String },
                        features: [{ type: String }],
                    },
                },
                display: {
                    size: { type: String },
                    resolution: {
                        type: String,
                        enum: ["1080p", "1440p", "4K"],
                        default: null,
                    },
                    refreshRate: { type: Number },
                    panelType: {
                        type: String,
                        enum: ["AMOLED", "OLED", "IPS"],
                        default: null,
                    },
                },
                battery: {
                    capacityMah: { type: Number },
                    fastCharge: { type: String },
                    wirelessCharge: { type: Boolean },
                },
                os: { type: String, enum: ["Android", "iOS"], default: null },
                connectivity: [{ type: String }],
                durability: {
                    waterproof: { type: Boolean },
                    dustproof: { type: Boolean },
                    rating: { type: String },
                },
                purpose: {
                    type: String,
                    enum: ["gaming", "photography", "business", "budget"],
                    default: null,
                },
            },
        },
    },
    response: { type: String },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Ai", AiSchema);
