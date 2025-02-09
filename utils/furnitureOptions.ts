import { ColorOption, SizeOption } from "../types/furniture";

export const colorOptions: ColorOption[] = [
  { label: "Sage", color: "bg-[#8A9A5B]", value: "#8A9A5B", name: "Herbal Sage" },
  { label: "Taupe", color: "bg-[#8B7E66]", value: "#8B7E66", name: "Earthy Taupe" },
  { label: "Slate", color: "bg-[#708090]", value: "#708090", name: "Stormy Slate" },
];

export const sizeOptions: SizeOption[] = [
  { label: "Small", measurement: "160 cm", value: "small" },
  { label: "Medium", measurement: "200 cm", value: "medium" },
  { label: "Large", measurement: "240 cm", value: "large" },
  { label: "XL", measurement: "280 cm", value: "xl" },
];

export const sizeToLength: Record<string, number> = {
  small: 2.4,
  medium: 3,
  large: 3.6,
  xl: 4.2
};

