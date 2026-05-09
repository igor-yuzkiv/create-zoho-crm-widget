import { text, isCancel } from '@clack/prompts'

async function main() {
    const name = await text({
        message: 'What is your name?',
    })

    if (isCancel(name)) {
        console.log('Operation cancelled.')
        return
    }

    console.log(`Hello, ${name}!`)
}

main()
