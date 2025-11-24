"use client"

import { Button } from "@/registry/new-york-v4/ui/button"
import { useTour } from "@/registry/new-york-v4/ui/tour"

export function StartTourButton() {
    const tour = useTour()

    return (
        <Button size="lg" onClick={() => tour.start()}>
            Start Tour
        </Button>
    )
}
