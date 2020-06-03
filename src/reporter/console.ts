import { IOptions } from "../interfaces/options.i";
import { ILogReporter } from "../interfaces/log.i";
import { IReport } from "../interfaces/report.i";

export class ConsoleReporter implements ILogReporter {
  constructor(protected options: IOptions) {
  }
  report(reporter: Map<string,IReport>) {
    console.table([...reporter.values()])
  }
}