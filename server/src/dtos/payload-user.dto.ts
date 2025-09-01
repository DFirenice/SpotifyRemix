import { z } from "zod";

const RequestUserPayloadObject = z.object({
    userId: z.string(),
    email: z.string()
})

export type RequestUserPayloadDto = z.infer<typeof RequestUserPayloadObject>