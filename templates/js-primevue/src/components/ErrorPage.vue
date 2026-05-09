<script setup>
import { computed } from 'vue'

const props = defineProps({
    error: {
        type: Error,
        default: null,
    },
})

const stackLines = computed(() => {
    if (!props.error?.stack) return []
    return props.error.stack
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .slice(0, 8)
})

function reload() {
    window.location.reload()
}
</script>

<template>
    <section class="error-page">
        <div class="error-card">
            <div class="error-card__accent" />

            <div class="error-header">
                <div class="error-icon-wrap">
                    <i class="pi pi-wifi error-icon-wifi" />
                    <i class="pi pi-times error-icon-times" />
                </div>
                <div>
                    <p class="error-title">Initialization Failed</p>
                    <p class="error-description">
                        {{ error?.message || 'The CRM widget could not be initialized. This may happen if the CRM SDK is unavailable, the session expired, or the widget is opened outside of the supported CRM environment.' }}
                    </p>
                </div>
            </div>

            <div v-if="stackLines.length" class="error-log">
                <div class="error-log__bar">
                    <span class="dot" />
                    <span class="dot" />
                    <span class="dot" />
                    <span class="error-log__label">ERROR LOG</span>
                </div>
                <ul class="error-log__lines">
                    <li v-for="(line, i) in stackLines" :key="i">
                        <span class="chevron">›</span>{{ line }}
                    </li>
                </ul>
            </div>

            <div class="error-actions">
                <button class="btn btn--secondary" @click="reload">Reload</button>
                <button class="btn btn--primary" @click="reload">Retry</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #f5f5f5;
    padding: 2rem;
}

.error-card {
    position: relative;
    width: 100%;
    max-width: 420px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.error-card__accent {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ef4444, #f87171);
    border-radius: 12px 12px 0 0;
}

/* Header */
.error-header {
    display: flex;
    gap: 0.875rem;
    align-items: flex-start;
}

.error-icon-wrap {
    position: relative;
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    margin-top: 0.1rem;
}

.error-icon-wifi {
    position: absolute;
    inset: 0;
    font-size: 1.25rem;
    color: #ef4444;
    display: flex;
    align-items: center;
    justify-content: center;
}

.error-icon-times {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.65rem;
    font-weight: 900;
    color: #ef4444;
    background: #fff;
    border-radius: 50%;
    padding: 1px;
    line-height: 1;
}

.error-title {
    margin: 0 0 0.35rem;
    font-size: 0.95rem;
    font-weight: 700;
    color: #111827;
    line-height: 1.3;
}

.error-description {
    margin: 0;
    font-size: 0.8rem;
    color: #6b7280;
    line-height: 1.6;
}

/* Log block */
.error-log {
    border-radius: 8px;
    background: #18181b;
    overflow: hidden;
    font-family: 'Menlo', 'Consolas', monospace;
}

.error-log__bar {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid #27272a;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #3f3f46;
    flex-shrink: 0;
}

.error-log__label {
    margin-left: 0.25rem;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: #52525b;
    text-transform: uppercase;
}

.error-log__lines {
    margin: 0;
    padding: 0.625rem 0.75rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    max-height: 130px;
    overflow-y: auto;
}

.error-log__lines li {
    font-size: 0.72rem;
    color: #a1a1aa;
    white-space: pre-wrap;
    word-break: break-all;
    line-height: 1.5;
}

.chevron {
    color: #52525b;
    margin-right: 0.4rem;
    font-size: 0.8rem;
}

/* Actions */
.error-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

.btn {
    padding: 0.45rem 1.1rem;
    border-radius: 7px;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
    transition: opacity 0.15s;
    line-height: 1.5;
}

.btn:hover {
    opacity: 0.8;
}

.btn--secondary {
    background: #fff;
    border-color: #e5e7eb;
    color: #374151;
}

.btn--primary {
    background: #18181b;
    color: #fff;
}
</style>