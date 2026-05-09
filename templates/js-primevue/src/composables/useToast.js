import { useToast as usePrimeToast } from 'primevue/usetoast'
import { toValue } from 'vue'

/** @typedef {import('vue').MaybeRefOrGetter<number>} LifeInput */
/** @typedef {import('primevue/toast').ToastMessageOptions} ToastMessageOptions */
/** @typedef {string | ToastMessageOptions} ToastInput */
/**
 * @typedef {object} UseToastApi
 * @property {(input: ToastInput) => void} add
 * @property {(input: ToastInput) => void} success
 * @property {(input: ToastInput) => void} error
 * @property {(input: ToastInput) => void} warn
 * @property {(input: ToastInput) => void} info
 * @property {(group: string) => void} removeGroup
 * @property {() => void} removeAll
 */

/**
 * Small wrapper around PrimeVue toast service with handy presets.
 * @param {LifeInput} [defaultLife=3000]
 * @returns {UseToastApi}
 */
export function useToast(defaultLife = 3000) {
    const toast = usePrimeToast()

    /**
     * @param {ToastInput} input
     * @returns {ToastMessageOptions}
     */
    function normalizeOptions(input) {
        if (typeof input === 'string') {
            return { detail: input }
        }

        return input
    }

    /** @param {ToastInput} input */
    function add(input) {
        toast.add({
            life: toValue(defaultLife),
            ...normalizeOptions(input),
        })
    }

    /** @param {ToastInput} input */
    function success(input) {
        add({
            severity: 'success',
            summary: 'Success',
            ...normalizeOptions(input),
        })
    }

    /** @param {ToastInput} input */
    function error(input) {
        add({
            severity: 'error',
            summary: 'Error',
            ...normalizeOptions(input),
        })
    }

    /** @param {ToastInput} input */
    function warn(input) {
        add({
            severity: 'warn',
            summary: 'Warning',
            ...normalizeOptions(input),
        })
    }

    /** @param {ToastInput} input */
    function info(input) {
        add({
            severity: 'info',
            summary: 'Info',
            ...normalizeOptions(input),
        })
    }

    /** @param {string} group */
    function removeGroup(group) {
        toast.removeGroup(group)
    }

    function removeAll() {
        toast.removeAllGroups()
    }

    return {
        add,
        success,
        error,
        warn,
        info,
        removeGroup,
        removeAll,
    }
}
