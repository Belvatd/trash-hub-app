import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
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
    createdDate,
    trashId,
    fullAddress
  }: CreateOrderType) => {
    const docRef = await addDoc(collection(database, "customer-orders"), {
      customerId,
      addressNotes,
      orderNotes,
      trashPicture,
      pinpoint,
      status,
      createdDate,
      trashId,
      fullAddress
    });

    const docSnap = await getDoc(docRef);
    return { id: docSnap?.id, status: true };
  }
})

export const useEditOrder = createMutation({
  mutationFn: async ({
    id,
    updatedData,
  }: {
    id: string
    updatedData: any
  }) => {
    const docRef = doc(database, "customer-orders", id)
    const docSnapshot = await getDoc(docRef)

    if (docSnapshot.exists()) {
      await updateDoc(docRef, updatedData)
      return { status: true }
    }
    throw new Error("Order not found")
  },
})