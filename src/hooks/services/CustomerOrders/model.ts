import { z } from "zod";

export const CreateOrderSchema = z.object({
    customerId : z.string(),
    addressNotes: z.string().optional(),
    orderNotes: z.string().optional(),
    trashPicture: z.string().optional(),
    pinpoint: z.object({
        _lat: z.number(),
        _long: z.number(),
    }),
    status: z.string(),
    createdDate: z.string(),
    trashId: z.string(),
    fullAddress: z.string(),
})

export type CreateOrderType = z.infer<typeof CreateOrderSchema>