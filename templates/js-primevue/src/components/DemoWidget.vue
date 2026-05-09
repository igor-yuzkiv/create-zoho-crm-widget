<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import { useToast } from '@/composables/useToast.js'
import { useConfirm } from '@/composables/useConfirm.js'

const toast = useToast()
const confirm = useConfirm()

const inputValue = ref('')

async function handleOpenConfirm() {
    const confirmed = await confirm.requireAsync({
        message: 'Are you sure you want to perform this action? This cannot be undone.',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
        acceptProps: { label: 'Ok', severity: 'danger' },
    })

    if (confirmed) {
        toast.success('Record deleted successfully.')
    } else {
        toast.info('Action cancelled.')
    }
}

function handleSave() {
    if (!inputValue.value.trim()) {
        toast.warn('Please enter a value before saving.')
        return
    }
    toast.success({ summary: 'Saved', detail: `Value "${inputValue.value}" saved.` })
    inputValue.value = ''
}

function handleError() {
    toast.error({ summary: 'Request Failed', detail: 'Could not connect to the server.' })
}
</script>

<template>
    <div class="demo-widget">
        <Card>
            <template #header>
                <div class="widget-header">
                    <span class="widget-title">Zoho CRM Widget</span>
                    <Tag value="PrimeVue" severity="secondary" />
                </div>
            </template>

            <template #content>
                <section>
                    <p class="section-label">Toast notifications</p>
                    <div class="button-row">
                        <Button
                            label="Success"
                            severity="success"
                            size="small"
                            v-tooltip.top="'Show success toast'"
                            @click="toast.success('Operation completed!')"
                        />
                        <Button
                            label="Warning"
                            severity="warn"
                            size="small"
                            v-tooltip.top="'Show warning toast'"
                            @click="toast.warn('Check your input data.')"
                        />
                        <Button
                            label="Error"
                            severity="danger"
                            size="small"
                            v-tooltip.top="'Show error toast'"
                            @click="handleError"
                        />
                        <Button
                            label="Info"
                            severity="info"
                            size="small"
                            v-tooltip.top="'Show info toast'"
                            @click="toast.info('Widget is running in sandbox mode.')"
                        />
                    </div>
                </section>

                <Divider />

                <section>
                    <p class="section-label">Confirm dialog</p>
                    <Button
                        label="Open confirm"
                        severity="danger"
                        outlined
                        size="small"
                        icon="pi pi-trash"
                        v-tooltip.top="'Opens async confirm dialog'"
                        @click="handleOpenConfirm"
                    />
                </section>

                <Divider />

                <section>
                    <p class="section-label">Input + save</p>
                    <div class="input-row">
                        <InputText v-model="inputValue" placeholder="Enter value..." size="small" />
                        <Button
                            label="Save"
                            size="small"
                            icon="pi pi-check"
                            v-tooltip.top="'Save the value'"
                            @click="handleSave"
                        />
                    </div>
                </section>
            </template>
        </Card>
    </div>
</template>

<style scoped>
.demo-widget {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem;
    min-height: 100vh;
    background: var(--p-surface-ground);
}

.demo-widget :deep(.p-card) {
    width: 480px;
}

.widget-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem 0;
}

.widget-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--p-text-color);
}

.section-label {
    margin: 0 0 0.75rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--p-text-muted-color);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.input-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.input-row .p-inputtext {
    flex: 1;
}
</style>
