export type InquiryField =
  | "name"
  | "email"
  | "company"
  | "phone"
  | "sector"
  | "service"
  | "budget"
  | "message"
  | "consent";

export type InquiryState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<InquiryField, string>>;
};

export type InquiryRecord = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  sector: string;
  service: string;
  budget: string;
  message: string;
  diagnostic: string;
};
