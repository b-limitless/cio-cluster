export const febricModel = {
  title: "New Title",
  warmth: "Thermal_Conductivity",
  characters: ["Anti-Microbial", "Stain-Resistant"],
  price: "4",
  deliveryTime: "340",
  excellence: 1,
  weight: "34",
  febricSeasons: "spring",
  febricTypes: "denim",
  threadTypes: "polyester",
  brightness: "luminance",
  superShiny: false,
  threadCounts: "400-600",
  opacity: 50,
  waterproof: "water_resistant",
  originalImageUrl:
    "https://res.cloudinary.com/dun5p8e5d/image/upload/v1697459039/images/ABC/deg0wohwxdurzst5t2tz.jpg",
  thumbnailImageUrl:
    "https://res.cloudinary.com/dun5p8e5d/image/upload/v1697459042/thumbnails/ABC/oflbmyrgxxnmn2vyz620.jpg",
  compositions: [{ name: "Denim", code: "denim", persantage: "100" }],
  threadStyle: "none",
  tone: "blue",
  stretchy: true,
  stretchyText: "Stretchy fabric",
  type: "shirt",
  withCredentials: true,
};

type febricType = typeof febricModel;

export interface ProductInterface {
  febrics: febricType[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
}
