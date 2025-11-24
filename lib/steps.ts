import { type Step } from "@/registry/new-york-v4/ui/tour"

export const steps = [
    {
        id: "tour-header",
        title: "Welcome",
        content:
            "Tour is a component for building onboarding tours. Designed to integrate with shadcn/ui.",
        nextRoute: "/docs",
    },
    {
        id: "tour-docs-nav",
        title: "Customization",
        content: "Easily adjust the popup’s position and appearance.",
        previousRoute: "/",
        nextRoute: "/",
        side: "right",
        align: "start",
    },
    {
        id: "tour-github",
        title: "Multiple Elements",
        content:
            "You can highlight several elements in a single step—just assign them the same ID.",
        previousRoute: "/docs",
        align: "end",
    },
    {
        id: "tour-end",
        title: "Multipage Tour",
        content:
            "As you’ve already seen, multipage tours are supported and easy to implement.",
        nextRoute: "/docs",
    },
] satisfies Step[]
