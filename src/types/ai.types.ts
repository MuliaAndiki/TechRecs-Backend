import { Document, Types } from "mongoose";

export interface IIA extends Document {
  _id: any;
  prompt: {
    text: string;
    category: {
      deviceType?: "laptop" | "phone" | "tablet";
      brand?: string;
      releaseYear?: number;
      budget?: {
        min?: number;
        max?: number;
      };

      laptop?: {
        processor?: {
          brand?: "Intel" | "AMD" | "Apple";
          cores?: number;
          generation?: string;
        };
        ram?: {
          size?: string;
          type?: "DDR4" | "DDR5" | "LPDDR5";
          upgradable?: boolean;
        };
        storage?: {
          type?: "SSD" | "HDD" | "Hybrid";
          capacity?: string;
          expandable?: boolean;
        };
        gpu?: {
          brand?: "NVIDIA" | "AMD" | "Intel";
          vram?: string;
        };
        display?: {
          size?: string;
          resolution?: "1080p" | "1440p" | "4K";
          refreshRate?: number;
          panelType?: "IPS" | "OLED" | "MiniLED";
        };
        battery?: {
          capacityWh?: number;
          lifeHours?: number;
        };
        weight?: number;
        os?: "Windows" | "macOS" | "Linux";
        connectivity?: string[];
        purpose?: "gaming" | "work" | "student" | "creator" | "general";
      };

      phone?: {
        processor?: {
          brand?: "Qualcomm" | "MediaTek" | "Apple" | "Exynos";
        };
        ram?: string;
        storage?: string;
        expandableStorage?: boolean;
        camera?: {
          rear?: {
            count?: number;
            resolution?: string;
            features?: string[];
          };
          front?: {
            resolution?: string;
            features?: string[];
          };
        };
        display?: {
          size?: string;
          resolution?: "1080p" | "1440p" | "4K";
          refreshRate?: number;
          panelType?: "AMOLED" | "OLED" | "IPS";
        };
        battery?: {
          capacityMah?: number;
          fastCharge?: string;
          wirelessCharge?: boolean;
        };
        os?: "Android" | "iOS";
        connectivity?: string[];
        durability?: {
          waterproof?: boolean;
          dustproof?: boolean;
          rating?: string;
        };
        purpose?: "gaming" | "photography" | "business" | "budget";
      };

      [key: string]: any;
    };
  };
  response?: string;
  user: Types.ObjectId;
}

export type PayloadAi = Pick<IIA, "prompt" | "_id">;
export type PickGenerate = Pick<IIA, "prompt">;
export type PickId = Pick<IIA, "_id">;
export type PickDeleteById = Pick<IIA, "_id" | "user">;
