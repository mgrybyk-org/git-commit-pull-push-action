import * as child_process from 'child_process'

const logError = (err: unknown, output: string[]) => {
    console.log(output.join(''))
    return err
}

export const spawnProcess = async (command: string, args: string[], cwd: string) => {
    const childProcess = child_process.spawn(command, args, { stdio: 'inherit', cwd })
    return new Promise<string>((resolve, reject) => {
        const output: string[] = []
        childProcess.stdout?.on('data', (d) => output.push(d.toString()))
        childProcess.stderr?.on('data', (d) => output.push(d.toString()))

        childProcess.once('error', (err) => reject(logError(err, output)))
        childProcess.once('exit', (code: unknown) => (code === 0 ? resolve(output.join('')) : reject(logError(code, output))))
    })
}
