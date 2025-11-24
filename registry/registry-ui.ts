import { type Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
    {
        name: "tour",
        title: "Tour",
        description: "A tour component.",
        author: "Hin",
        type: "registry:ui",
        registryDependencies: ["button", "card", "popover"],
        files: [
            {
                path: "ui/tour.tsx",
                type: "registry:ui",
            },
        ],
    },
]
