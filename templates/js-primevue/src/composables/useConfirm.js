import { useConfirm as useBaseConfirm } from 'primevue'

/** @typedef {Record<string, unknown>} ConfirmOptionsBase */
/**
 * @typedef {ConfirmOptionsBase & {
 *   header?: string,
 *   accept?: () => void,
 *   reject?: () => void
 * }} ConfirmOptions
 */
/**
 * @typedef {Omit<ConfirmOptions, 'accept' | 'reject'>} ConfirmAsyncOptions
 */
/**
 * @typedef {object} UseConfirmApi
 * @property {(options: ConfirmOptions) => void} require
 * @property {() => void} close
 * @property {(options: ConfirmAsyncOptions) => Promise<boolean>} requireAsync
 */

/**
 * Small wrapper around PrimeVue confirm service.
 * @returns {UseConfirmApi}
 */
export function useConfirm() {
    const baseConfirm = useBaseConfirm()

    /**
     * Shows confirm dialog and resolves by user choice.
     * @param {ConfirmAsyncOptions} options
     * @returns {Promise<boolean>}
     */
    async function requireAsync(options) {
        return new Promise((resolve) => {
            baseConfirm.require({
                header: 'Confirmation',
                ...options,
                accept: () => resolve(true),
                reject: () => resolve(false),
            })
        })
    }

    return {
        require: baseConfirm.require,
        close: baseConfirm.close,
        requireAsync,
    }
}
