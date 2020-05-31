import analysis from "../src/analysis"
import { getRegisteredReporters } from "../src/reporter";
import { HTMLReporter } from "../src/reporter/html";

it('test comment rate', async () => {
  let o = new analysis();
  let rateReport = await o.statisticCommentRate()
  const htmlReporter=getRegisteredReporters()['html']
  htmlReporter.report(rateReport)
  expect(htmlReporter instanceof HTMLReporter).toBe(true)
})
