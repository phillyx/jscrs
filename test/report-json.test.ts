import analysis from "../src/analysis"
import { getRegisteredReporters } from "../src/reporter";
import { JSONReporter } from "../src/reporter/json";

it('test comment rate', async () => {
  let o = new analysis();
  let rateReport = await o.statisticCommentRate()
  const r=getRegisteredReporters()['json']
  r.report(rateReport)
  expect(r instanceof JSONReporter).toBe(true)
})
