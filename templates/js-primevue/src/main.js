import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import ErrorPage from '@/components/ErrorPage.vue'
import { registerAppPlugins } from '@/plugins'

const app = createApp(App)

// const pinia = createPinia()
// app.use(pinia)

registerAppPlugins(app)

function mountError(error) {
    createApp(ErrorPage, { error }).mount('#app')
}

async function main() {
    try {
        ZOHO.embeddedApp.on('PageLoad', (data) => {
            console.log('[ZohoCrm] PageLoad event received:', data)
        })

        await ZOHO.embeddedApp.init()

        // app.use(router)
        app.mount('#app')
    } catch (error) {
        console.error('[ZohoCrm] Failed to initialize widget:', error)
        mountError(error)
    }
}

void main()
