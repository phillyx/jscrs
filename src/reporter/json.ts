import { IOptions } from "../interfaces/options.i";
import { ILogReporter } from "../interfaces/log.i";
import { IReport } from "../interfaces/report.i";
import { ensureDirSync, writeFileSync } from "fs-extra";
import { green } from "colors/safe";
import { join } from "path";

export class JSONReporter implements ILogReporter {
  constructor(protected options: IOptions) {
  }
  report(reporter: Map<string,IReport>) {
    if (this.options.output) {
      ensureDirSync(this.options.output)
      writeFileSync(join(this.options.output, 'jscrs-report.json'), JSON.stringify([...reporter.values()]))
      console.log(green(`json report saved to ${join(this.options.output, 'jscrs-report.html')}`))
    }
  }
}