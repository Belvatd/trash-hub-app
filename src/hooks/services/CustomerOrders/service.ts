import { collection, addDoc } from "firebase/firestore";
import { createMutation } from "react-query-kit";
import { CreateOrderType } from ".";
import { database } from "@/firebase/config";

export const useCreateOrder = createMutation({
  mutationFn: async ({
    customerId,
    addressNotes,
    orderNotes,
    trashPicture,
    pinpoint,
    status,
  }: CreateOrderType) => {

    await addDoc(collection(database, "customer-orders"), {
      customerId,
      addressNotes,
      orderNotes,
      trashPicture,
      pinpoint,
      status,
    });
    return { status: "success" }
  }
})