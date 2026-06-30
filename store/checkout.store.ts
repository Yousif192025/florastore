import { create } from "zustand";
import type { CheckoutData, CheckoutStep, PaymentMethod } from "@/types";

interface CheckoutState extends CheckoutData {
  setStep: (step: CheckoutStep) => void;
  setCustomerInfo: (info: CheckoutData["customerInfo"]) => void;
  setShippingAddress: (address: CheckoutData["shippingAddress"]) => void;
  setShippingMethod: (method: CheckoutData["shippingMethod"]) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setInstallmentProvider: (provider: "tabby" | "tamara" | null) => void;
  setNotes: (notes: string) => void;
  reset: () => void;
}

const initialState: CheckoutData = {
  step: "customer",
  customerInfo: { full_name: "", email: "", phone: "" },
  shippingAddress: {
    full_name: "",
    phone: "",
    country_code: "SA",
    city: "",
    district: null,
    street: "",
    building: null,
    postal_code: null,
    notes: null,
  },
  shippingMethod: null,
  paymentMethod: null,
  installmentProvider: null,
  notes: "",
};

export const useCheckoutStore = create<CheckoutState>()((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  setCustomerInfo: (customerInfo) => set({ customerInfo }),
  setShippingAddress: (shippingAddress) => set({ shippingAddress }),
  setShippingMethod: (shippingMethod) => set({ shippingMethod }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setInstallmentProvider: (installmentProvider) => set({ installmentProvider }),
  setNotes: (notes) => set({ notes }),
  reset: () => set(initialState),
}));
