import { type Step } from "@/registry/new-york-v4/ui/tour"
import { ArrowUpRightIcon } from "lucide-react"

export const steps = [
    {
        id: "tour-header",
        title: "Welcome",
        content:
            "Tour is a component for building onboarding tours. Designed to integrate with shadcn/ui.",
        nextRoute: "/docs",
    },
    {
        id: "tour-nav",
        title: "Customization",
        content: "Easily adjust the popup’s position and appearance.",
        side: "bottom",
        align: "start",
        className: "rounded-none",
        previousRoute: "/",
        nextRoute: "/",
    },
    {
        id: "tour-github",
        title: "Multiple Elements",
        content:
            "You can highlight several elements in a single step—just assign them the same ID.",
        align: "end",
        previousRoute: "/docs",
    },
    {
        id: "tour-end",
        title: "Multipage Tour",
        content:
            "As you’ve already seen, multipage tours are supported and easy to implement.",
        nextRoute: "/docs",
        nextLabel: (
            <>
                View Docs <ArrowUpRightIcon />
            </>
        ),
    },
] satisfies Step[]
