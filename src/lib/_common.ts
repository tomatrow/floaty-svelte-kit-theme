export async function delay(ms: number = 0) {
    if (!ms) return
    await new Promise<void>(resolve => setTimeout(resolve, ms))
}

export const flyLift = { y: 25, duration: 250 }

export function merge(...expressions: any[]) {
    return expressions.filter(Boolean).join(" ")
}
