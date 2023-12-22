export interface Props {
  title: string;
  desc: string;
}
export interface BannerItem {
  text: string;
  emojiSrc: string;
  collectionName: string;
}

export interface CardProps {
  image: string;
  name: string;
  price: string;
}

export interface FooterData {
  newsletter: {
    title: string;
    description: string;
  };
  subscriptionForm: {
    placeholder: string;
    buttonText: string;
  };
  links: {
    about: {
      text: string;
      url: string;
    };
    contact: {
      text: string;
      url: string;
    };
    storeLocator: {
      text: string;
      url: string;
    };
    faq: {
      text: string;
      url: string;
    };
    login: {
      text: string;
      url: string;
    };
  };
  socialMedia: {
    icon: string;
    link: string;
    desc: string;
  }[];
  companyInfo: string[];
}

export interface GiftCardButtonProps {
  id: string;
  price: number;
  addedToCart: boolean;
}
export interface Subcategory {
  name: string;
  link: string;
  title: string;
  titlelink: string;
  img: string;
}

export interface Category {
  name: string;
  link: string;
  subcategories?: Subcategory[];
}

export interface Section {
  title: string;
  content: string;
}

export interface MainContent {
  image: string;
  heading: string;
  paragraphs: string[];
}
export interface AboutData {
  title: string;
  icon: string;
  sections: Section[];
  mainContent: MainContent[];
}

export interface AddressInfo {
  title: string;
  description: string;
  street: string;
}

export interface ContactInfo {
  heading: string;
  image: string;
  address: AddressInfo;
  phoneNumber: string;
  workingHours: string;
  buttonText: string;
}

export interface ContactProps {
  contactInfo: ContactInfo | null;
}

export interface FAQItem {
  question: string;
  answer: string;
}
export interface FAQProps {
  title: string;
  icon: string;
  items: FAQItem[] | null;
}

//check this later
export interface GiftCard {
  id: string;
  price: number;
}
export interface GiftCardsData {
  giftCards: GiftCard[];
}
export interface BrandData {
  title: string;
  icon: string;
  content: BrandDataSection[];
}
export interface BrandDataSection {
  image?: string;
  questions?: string[];
  text?: string;
  heading?: string;
}
