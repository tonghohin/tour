import { siteConfig } from "@/lib/config"

export function SiteFooter() {
    return (
        <footer className="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent group-has-[.docs-nav]/body:pb-20 group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent">
            <div className="container-wrapper px-4 xl:px-6">
                <div className="flex h-(--footer-height) items-center justify-center">
                    <div
                        data-tour-step-id="tour-end"
                        className="text-muted-foreground px-1 text-center text-xs leading-loose sm:text-sm">
                        Built by{" "}
                        <a
                            href={siteConfig.links.website}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4">
                            Hin
                        </a>
                        . The source code is available on{" "}
                        <a
                            data-tour-step-id="tour-github"
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4">
                            GitHub
                        </a>
                        .
                    </div>
                </div>
            </div>
        </footer>
    )
}
