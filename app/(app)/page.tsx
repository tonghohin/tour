import { StartTourButton } from "@/components/start-tour-button"
import { siteConfig } from "@/lib/config"
import { Metadata } from "next"

const title = siteConfig.title
const description = siteConfig.description

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        images: [
            {
                url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: [
            {
                url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
            },
        ],
    },
}

export default function IndexPage() {
    return (
        <div className="flex flex-1 flex-col">
            <section className="container-wrapper flex flex-col">
                <div
                    data-tour-step-id="tour-header"
                    className="container flex w-fit flex-col items-center gap-2 text-center xl:gap-4">
                    <h1 className="text-primary leading-tighter max-w-4xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
                        {title}
                    </h1>
                    <p className="text-foreground max-w-3xl text-base text-balance sm:text-lg">
                        {description}
                    </p>
                </div>
            </section>
            <div className="flex flex-1 flex-col items-center justify-center">
                <StartTourButton />
            </div>
        </div>
    )
}
