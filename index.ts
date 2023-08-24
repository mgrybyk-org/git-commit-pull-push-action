import * as core from '@actions/core'
import { isFileExist } from './src/isFileExists.js'
import { spawnProcess } from './src/spawnProcess.js'

try {
    // vars
    const repository = core.getInput('repository')
    const branch = core.getInput('branch')
    const commitMessage = core.getInput('commit_message')
    const pullArgs = core.getInput('pull_args')
    const addArgs = core.getInput('add_args')

    // log
    console.log({
        repository,
        branch,
        commitMessage,
        pullArgs,
        addArgs,
    })

    if (!(await isFileExist(repository))) {
        throw new Error("repository directory doesn't exist: " + repository)
    }

    if (branch.trim() === '') {
        throw new Error('branch is a required field')
    }

    await spawnProcess('git', ['config', '--global', 'user.name', '"github-actions[bot]"'], repository)
    await spawnProcess('git', ['config', '--global', 'user.email', '"41898282+github-actions[bot]@users.noreply.github.com"'], repository)

    await spawnProcess('git', ['add', ...addArgs.split(' ')], repository)
    const diff = await spawnProcess('git', ['diff', '--staged', '--name-only'], repository)
    if (diff.trim() === '') {
        console.log('Working tree is empty. Nothing to commit.')
    } else {
        await spawnProcess('git', ['fetch', '--depth=1'], repository)
        await spawnProcess('git', ['checkout', branch], repository)
        await spawnProcess(
            'git',
            [
                'commit',
                '-m',
                commitMessage,
                '--author="github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>"',
                '--no-verify',
            ],
            repository
        )
        await spawnProcess('git', ['pull', ...pullArgs.split(' ')], repository)
        console.log(await spawnProcess('git', ['push', '--no-verify'], repository))
    }
} catch (error) {
    core.setFailed(error.message)
}
