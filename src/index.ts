#!/usr/bin/env node

import { text, isCancel, select, cancel } from '@clack/prompts'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'node:url'
import mri from 'mri'

const CURRENT_DIR = process.cwd()
const templatesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../templates')
const templates = fs.readdirSync(templatesDir)

const argv = mri<{
    template?: string
    help?: boolean
}>(process.argv.slice(2), {
    alias: { t: 'template', h: 'help' },
})

const HELP_MESSAGE = `Usage: create-project [target-dir] [options]
    
    Options:
        -t, --template <template>  Specify the project template to use
        -h, --help                 Show this help message
`

function isDirEmpty(projectDirectory: string): boolean {
    if (!fs.existsSync(projectDirectory)) {
        return true
    }

    const files = fs.readdirSync(projectDirectory)

    return files.length === 0
}

function copyTemplate(template: string, targetPath: string) {
    const templatePath = path.join(templatesDir, template)
    fs.copySync(templatePath, targetPath)
}

function getTemplateOptions() {
    return templates.map((template) => ({ name: template, value: template }))
}

function isValidTemplate(template: string) {
    return templates.includes(template)
}

function formatTargetDir(targetDir: string) {
    return targetDir
        .trim()
        .replace(/[<>:"\\|?*]/g, '')
        .replace(/\/+$/g, '')
}

async function main() {
    if (argv.help) {
        console.log(HELP_MESSAGE)
        return
    }

    const argTargetDir = argv._[0] ? formatTargetDir(String(argv._[0])) : undefined
    const argTemplate = argv.template

    const templateOptions = getTemplateOptions()

    let targetDir = argTargetDir
    if (!targetDir) {
        const projectName = await text({
            message: 'Project name:',
            validate: (value) => {
                return !value || formatTargetDir(value).length > 0 ? undefined : 'Invalid project name'
            },
        })

        if (isCancel(projectName)) {
            return cancel('Operation cancelled.')
        }

        targetDir = formatTargetDir(projectName)
    }

    const targetPath = path.join(CURRENT_DIR, targetDir)
    if (!isDirEmpty(targetPath)) {
        return cancel(
            `The target directory "${targetDir}" is not empty. Please choose an empty directory or a different project name.`
        )
    }

    let template: string | undefined = argTemplate
    if (!template) {
        const selectedTemplate = await select({
            message: 'Select a template:',
            options: templateOptions,
        })

        if (isCancel(selectedTemplate)) {
            return cancel('Operation cancelled.')
        }

        template = String(selectedTemplate)
    }

    if (!isValidTemplate(template)) {
        return cancel(`Invalid template "${template}". Available templates: ${templates.join(', ')}`)
    }

    copyTemplate(template, targetPath)

    console.log(`Project "${targetDir}" created successfully using template "${template}".`)
}

main()
