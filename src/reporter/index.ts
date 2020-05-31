import { IOptions } from '../interfaces/options.i'
import { ILogReporter } from '../interfaces/log.i'
import { ConsoleReporter } from './console'
import { HTMLReporter } from './html'
import { useReporter } from '../lib/use'
import { JSONReporter } from './json'
const EXISTING_REPORTERS: {
  [key: string]: new (options: IOptions) => ILogReporter
} = {
  console: ConsoleReporter,
  html: HTMLReporter,
  json: JSONReporter,
}

const Reporters: { [key: string]: ILogReporter } = {}

export function registerReporter(name: string, reporter: ILogReporter): void {
  Reporters[name] = reporter
}
export function getRegisteredReporters() {
  return Reporters
}

export function registerReporterByName(options: IOptions) {
  const { reports = [] } = options
  // 不利于拓展
  // let keys = Object.keys(EXSITING_REPORTERS)
  // reports.forEach(x => {
  //   if (keys.includes(x)) {
  //     const reporter = EXSITING_REPORTERS[x]
  //     registerReporter(x, new reporter(options))
  //   }
  // })

  reports.forEach((rep) => {
    const reporter: new (options: IOptions) => ILogReporter =
      EXISTING_REPORTERS[rep] || useReporter(rep)
    registerReporter(rep, new reporter(options))
  })
}
