declare module "razorpay" {
  class Razorpay {
    constructor(options: { key_id: string; key_secret: string });
    orders: {
      create(options: {
        amount: number;
        currency: string;
        receipt?: string;
        notes?: Record<string, string>;
      }): Promise<{
        id: string;
        amount: number;
        currency: string;
        receipt?: string;
        status?: string;
      }>;
    };
  }
  export default Razorpay;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
      close: () => void;
    };
  }
}

export {};