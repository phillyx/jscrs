import analysis from "../src/analysis"
import { getRegisteredReporters } from "../src/reporter";
import { ConsoleReporter } from "../src/reporter/console";

it('test comment rate', async () => {
  let o = new analysis();
  let rateReport = await o.statisticCommentRate()
  const consoleReporter=getRegisteredReporters()['console']
  consoleReporter.report(rateReport)
  expect(consoleReporter instanceof ConsoleReporter).toBe(true)
})
