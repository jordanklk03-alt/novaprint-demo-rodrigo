// NOVAprint / Creative Commerce Studio: catálogo y reglas demo compartidas por storefront y administración.

export const assetUrls = {
  logo: "/manus-storage/novaprint-logo_8a25b38e.png",
  hero: "/manus-storage/novaprint-hero-reference_b82a134e.png",
  products: "/manus-storage/novaprint-products_23747152.png",
  inspiration: "/manus-storage/novaprint-inspiration_27dcab71.png",
  adminBanner: "/manus-storage/novaprint-admin-banner_170df2d3.png",
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  previousPrice?: number;
  stock: number;
  description: string;
  customizable: boolean;
  image: string;
  colors: { name: string; hex: string }[];
  sizes?: string[];
};

export const products: Product[] = [
  {
    id: "thermo",
    name: "Termo Nova 500ml",
    category: "Termos",
    price: 19.95,
    previousPrice: 24.95,
    stock: 100,
    description: "Acero de doble pared para llevar tus ideas a todas partes.",
    customizable: true,
    image: assetUrls.products,
    colors: [
      { name: "Blanco", hex: "#F8FAFC" },
      { name: "Negro", hex: "#111111" },
      { name: "Azul", hex: "#2563EB" },
      { name: "Rosa", hex: "#E5A9B6" },
      { name: "Verde", hex: "#6A9679" },
      { name: "Rojo", hex: "#C7444B" },
    ],
  },
  {
    id: "shirt",
    name: "Camiseta Nova Classic",
    category: "Camisetas",
    price: 24.95,
    stock: 150,
    description: "Algodón suave, corte limpio y un lienzo listo para tu diseño.",
    customizable: true,
    image: assetUrls.products,
    colors: [
      { name: "Blanco", hex: "#F8FAFC" },
      { name: "Negro", hex: "#111111" },
      { name: "Gris", hex: "#9CA3AF" },
      { name: "Azul", hex: "#2563EB" },
      { name: "Rojo", hex: "#C7444B" },
      { name: "Verde", hex: "#6A9679" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "hoodie",
    name: "Sudadera Nova Premium",
    category: "Sudaderas",
    price: 39.95,
    stock: 100,
    description: "Felpa cálida y estructura premium para diseños con presencia.",
    customizable: true,
    image: assetUrls.products,
    colors: [
      { name: "Negro", hex: "#111111" },
      { name: "Blanco", hex: "#F8FAFC" },
      { name: "Gris", hex: "#9CA3AF" },
      { name: "Beige", hex: "#D9C6AA" },
      { name: "Azul marino", hex: "#1D3557" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
];

export const designs = [
  { id: "flora", name: "Flora", category: "Flores", price: 4.95, mark: "✳", tone: "#2563EB" },
  { id: "love", name: "Amor", category: "Amor", price: 4.95, mark: "♥", tone: "#C7444B" },
  { id: "spark", name: "Chispa", category: "Minimalista", price: 4.95, mark: "✦", tone: "#111111" },
  { id: "paw", name: "Compañero", category: "Animales", price: 4.95, mark: "◒", tone: "#6A9679" },
  { id: "play", name: "Play", category: "Gaming", price: 4.95, mark: "⌁", tone: "#1746A2" },
  { id: "sun", name: "Día grande", category: "Frases", price: 4.95, mark: "☼", tone: "#E9A23B" },
];

export const priceRules = [
  { label: "Personalización con imagen", value: 3, code: "image" },
  { label: "Texto personalizado", value: 1.5, code: "text" },
  { label: "Diseño premium", value: 4.95, code: "design" },
];

export const recentOrders = [
  { id: "#NP-1048", customer: "Clara Martín", product: "Termo Nova 500ml", total: "29,40 €", status: "Personalización", date: "Hoy, 10:32" },
  { id: "#NP-1047", customer: "Leo García", product: "Camiseta Nova Classic", total: "30,95 €", status: "Pagado", date: "Hoy, 09:18" },
  { id: "#NP-1046", customer: "Marta Soler", product: "Sudadera Nova Premium", total: "44,90 €", status: "En preparación", date: "Ayer, 18:06" },
  { id: "#NP-1045", customer: "Júlia Costa", product: "Termo Nova 500ml", total: "24,45 €", status: "Enviado", date: "Ayer, 16:42" },
];

export const navItems = [
  { label: "Dashboard", icon: "grid" },
  { label: "Productos", icon: "box" },
  { label: "Personalización", icon: "wand" },
  { label: "IA Designer", icon: "sparkles" },
  { label: "Diseños", icon: "sparkles" },
  { label: "Pedidos", icon: "shopping-bag" },
  { label: "Clientes", icon: "users" },
  { label: "Categorías", icon: "layers" },
  { label: "Precios", icon: "tag" },
  { label: "Promociones", icon: "percent" },
  { label: "Banners", icon: "image" },
  { label: "Biblioteca multimedia", icon: "folder" },
];
