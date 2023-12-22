export interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  description: string;
  quantity: number;
  advice: string;
  size: string[]; // Assuming an array of size options
  color: string;
  material: string[]; // Assuming an array of material options
  condition: string;
  maintenance: string;
  tags: string[]; // Assuming an array of tags
  link: string;
  type: string;
  date: string;
  isInCart: boolean;
  isFavorite: boolean;
}
