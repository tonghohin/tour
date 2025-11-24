import { registryItemSchema, type Registry } from "shadcn/schema"
import { z } from "zod"

import { ui } from "@/registry/registry-ui"
import { examples } from "./registry-examples"

export const registry = {
    name: "tour",
    homepage: "https://onboarding-tour.vercel.app",
    items: z.array(registryItemSchema).parse([...ui, ...examples]),
} satisfies Registry
