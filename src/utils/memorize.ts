import { getGlobal } from "../utils/utils"

export type MemorizeInstanceType = {
    set: Function
    get: Function
    has: Function
    size: Function
}

export class Memorize {
    instance: Map<any, any> & [any, any][]
    hasES6Map: boolean

    constructor() {
        this.hasES6Map = getGlobal().Map !== undefined
        this.instance = this.hasES6Map ? new Map() : []
    }

    set(key: any, value: any) {
        if (this.hasES6Map) {
            this.instance.set(key, value)
        } else {
            this.instance.push([key, value])
        }
    }

    get(key: any): any {
        if (this.hasES6Map) {
            return this.instance.get(key)
        }
        for (let i = 0, l = this.instance.length; i < l; i++)
            if (this.instance[i][0] === key) return this.instance[i][1]
    }

    has(key: any): boolean {
        if (this.hasES6Map) {
            return this.instance.has(key)
        }

        for (let i = 0, l = this.instance.length; i < l; i++)
            if (this.instance[i][0] === key) return true

        return false
    }

    size(): number {
        if (this.hasES6Map) {
            return this.instance.size
        }
        return this.instance.length
    }
}
