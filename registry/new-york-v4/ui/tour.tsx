"use client"

import type { Content } from "@radix-ui/react-popover"
import { XIcon } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
    Popover,
    PopoverAnchor,
    PopoverContent,
} from "@/registry/new-york-v4/ui/popover"

const TourContext = React.createContext<{
    start: () => void
    close: () => void
} | null>(null)

function useTour() {
    const context = React.useContext(TourContext)
    if (!context) {
        throw new Error("useTour must be used within a TourProvider")
    }
    return context
}

interface Step {
    id: string
    title: React.ReactNode
    content: React.ReactNode
    nextRoute?: string
    previousRoute?: string
    nextLabel?: React.ReactNode
    previousLabel?: React.ReactNode
    side?: React.ComponentProps<typeof Content>["side"]
    sideOffset?: React.ComponentProps<typeof Content>["sideOffset"]
    align?: React.ComponentProps<typeof Content>["align"]
    alignOffset?: React.ComponentProps<typeof Content>["alignOffset"]
    className?: string
}

function Tour({
    steps,
    children,
}: {
    steps: Step[]
    children: React.ReactNode
}) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [currentStepIndex, setCurrentStepIndex] = React.useState(0)

    function next() {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1)
        } else {
            setIsOpen(false)
            setCurrentStepIndex(0)
        }
    }

    function previous() {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1)
        }
    }

    function close() {
        setIsOpen(false)
        setCurrentStepIndex(0)
    }

    function start() {
        setIsOpen(true)
        setCurrentStepIndex(0)
    }

    return (
        <TourContext.Provider
            value={{
                start,
                close,
            }}>
            {children}
            {isOpen && (
                <TourOverlay
                    step={steps[currentStepIndex]}
                    currentStepIndex={currentStepIndex}
                    totalSteps={steps.length}
                    onNext={next}
                    onPrevious={previous}
                    onClose={close}
                />
            )}
        </TourContext.Provider>
    )
}

function TourOverlay({
    step,
    currentStepIndex,
    totalSteps,
    onNext,
    onPrevious,
    onClose,
}: {
    step: Step
    currentStepIndex: number
    totalSteps: number
    onNext: () => void
    onPrevious: () => void
    onClose: () => void
}) {
    const [targets, setTargets] = React.useState<
        { rect: DOMRect; radius: number }[]
    >([])

    React.useEffect(() => {
        function updatePosition(shouldScroll = false) {
            const elements = document.querySelectorAll(
                `[data-tour-step-id='${step.id}']`
            )

            if (elements.length > 0) {
                const newTargets = Array.from(elements).map((element) => {
                    const rect = element.getBoundingClientRect()
                    const style = window.getComputedStyle(element)
                    const radius = Number(style.borderRadius) || 4

                    return {
                        rect: {
                            width: rect.width,
                            height: rect.height,
                            x: rect.left,
                            y: rect.top,
                            left: rect.left,
                            top: rect.top,
                            right: rect.right,
                            bottom: rect.bottom,
                            toJSON: () => {},
                        },
                        radius,
                    }
                })
                setTargets(newTargets)

                if (shouldScroll) {
                    elements[0].scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    })
                }
            } else {
                setTargets([])
            }
        }

        updatePosition(true)
        const handleResizeOrScroll = () => updatePosition(false)

        window.addEventListener("resize", handleResizeOrScroll)
        window.addEventListener("scroll", handleResizeOrScroll, true)

        const observer = new MutationObserver(() => updatePosition(false))
        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true,
        })

        const resizeObserver = new ResizeObserver(() => updatePosition(false))
        resizeObserver.observe(document.body)

        return () => {
            window.removeEventListener("resize", handleResizeOrScroll)
            window.removeEventListener("scroll", handleResizeOrScroll, true)
            observer.disconnect()
            resizeObserver.disconnect()
        }
    }, [step])

    React.useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = ""
        }
    }, [])

    if (!document) return null

    return createPortal(
        <div className="fixed inset-0 z-50">
            <svg className="absolute inset-0 size-full">
                <defs>
                    <mask id="tour-mask">
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="white"
                        />
                        {targets.map((target, i) => (
                            <rect
                                key={i}
                                x={target.rect.left}
                                y={target.rect.top}
                                width={target.rect.width}
                                height={target.rect.height}
                                rx={target.radius}
                                fill="black"
                            />
                        ))}
                    </mask>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    mask="url(#tour-mask)"
                    className="fill-black opacity-20"
                />
                {targets.map((target, i) => {
                    return (
                        <rect
                            key={i}
                            x={target.rect.left}
                            y={target.rect.top}
                            width={target.rect.width}
                            height={target.rect.height}
                            rx={target.radius}
                            className="stroke-primary fill-none stroke-2"
                        />
                    )
                })}
            </svg>
            {targets.length > 0 && (
                <Popover key={step.id} open={true}>
                    <PopoverAnchor
                        virtualRef={{
                            current: {
                                getBoundingClientRect: () =>
                                    targets[0]?.rect || {
                                        top: 0,
                                        left: 0,
                                        width: 0,
                                        height: 0,
                                        bottom: 0,
                                        right: 0,
                                        x: 0,
                                        y: 0,
                                        toJSON: () => {},
                                    },
                            },
                        }}
                    />
                    <PopoverContent
                        className={cn("px-0", step.className)}
                        side={step.side}
                        sideOffset={step.sideOffset}
                        align={step.align}
                        alignOffset={step.alignOffset}
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        onCloseAutoFocus={(e) => e.preventDefault()}
                        asChild>
                        <Card>
                            <CardHeader>
                                <CardTitle>{step.title}</CardTitle>
                                <CardDescription>
                                    Step {currentStepIndex + 1} of {totalSteps}
                                </CardDescription>
                                <CardAction>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={onClose}>
                                        <XIcon />
                                    </Button>
                                </CardAction>
                            </CardHeader>
                            <CardContent>{step.content}</CardContent>
                            <CardFooter className="justify-between">
                                {currentStepIndex > 0 &&
                                    (step.previousRoute ? (
                                        <Button
                                            variant="outline"
                                            onClick={onPrevious}
                                            asChild>
                                            <Link href={step.previousRoute}>
                                                {step.previousLabel ??
                                                    "Previous"}
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            onClick={onPrevious}>
                                            {step.previousLabel ?? "Previous"}
                                        </Button>
                                    ))}
                                {step.nextRoute ? (
                                    <Button
                                        className="ml-auto"
                                        onClick={onNext}
                                        asChild>
                                        <Link href={step.nextRoute}>
                                            {step.nextLabel ??
                                                (currentStepIndex ===
                                                totalSteps - 1
                                                    ? "Finish"
                                                    : "Next")}
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button
                                        className="ml-auto"
                                        onClick={onNext}>
                                        {step.nextLabel ??
                                            (currentStepIndex === totalSteps - 1
                                                ? "Finish"
                                                : "Next")}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </PopoverContent>
                </Popover>
            )}
        </div>,
        document.body
    )
}

export { Tour, useTour, type Step }
