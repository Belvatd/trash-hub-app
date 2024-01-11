import { z } from "zod";

export const CreateOrderSchema = z.object({
    addressNotes: z.string().optional(),
    orderNotes: z.string().optional(),
    trashPicture: z.string().optional(),
    pinpoint: z.object({
        _lat: z.number(),
        _long: z.number(),
    }),
})

export type CreateOrderType = z.infer<typeof CreateOrderSchema>