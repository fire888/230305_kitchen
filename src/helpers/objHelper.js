export const lerpObjFromTo = (current, target, onUpdate, onComplete) => {
    let phase = 0
    const spd = 0.005
    let savedParams = { ...current }
    let currentParams = { ...savedParams }
    let targetParams = { ...target }

    return {
        update: () => {
            phase += spd
            if (phase > 1) {
                phase = 1
            }
            for (let key in targetParams) {
                currentParams[key] = savedParams[key] + phase * (targetParams[key] - savedParams[key])
            }
            onUpdate(currentParams)
            if (phase === 1) {
                onComplete()
            }
        }
    }
}
