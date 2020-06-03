import { IReport } from "../interfaces/report.i";
import { ILogReporter } from "../interfaces/log.i";
import { IOptions } from "../interfaces/options.i";
import { ensureDirSync } from "fs-extra";
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { green } from "colors/safe";

export class HTMLReporter implements ILogReporter {
  constructor(protected options: IOptions) {
  }
  report(reporter: Map<string, IReport>) {
    const path = join(__dirname, '/../../views/report.html');
    let html = readFileSync(path, {
      encoding: 'utf-8'
    });
    let template = ''
    const values = [...reporter.values()];
    values.forEach((item, index) => {
      template += `<tr>
        <td>${index}</td>
        <td>${item.extname || ''}</td>
        <td>${ item.filePath || ''}</td>
        <td>${item.length}</td>
        <td>${item.commentLength}</td>
        <td>${this.statisticCommentRate(item)}</td>
      </tr>`
    })
    html = html.replace('{{template}}', template)
    if (this.options.output) {
      ensureDirSync(this.options.output)
      writeFileSync(join(this.options.output, 'jscrs-report.html'), html)
      console.log(green(`HTML report saved to ${join(this.options.output, 'jscrs-report.html')}`))
    }

  }

  statisticCommentRate(report: IReport): string {
    const score = report.commentLength / report.length * 100
    if (score >= 50 || score <= 5) {
      return `<span style="color:red">${report.commentRate}</span>`
    }
    return report.commentRate
  }
}