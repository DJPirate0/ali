export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'fixed' | 'monthly' | 'per_unit';
  unitLabel?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  options: ServiceOption[];
}

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string; // references lucide-react icon names
  imageRef?: string; // high-quality visual placeholder
  categories: ServiceCategory[];
}

export interface SelectedOption {
  serviceId: string;
  categoryId: string;
  optionId: string;
  quantity?: number;
}

export interface Inquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceId: string;
  serviceName: string;
  selectedOptions: {
    optionId: string;
    optionName: string;
    categoryName: string;
    price: number;
    type: 'fixed' | 'monthly' | 'per_unit';
  }[];
  notes?: string;
  totalEstimate: number;
  createdAt: string;
}
