import analysis from "../src/analysis"

it('test comment rate', async () => {
  let o = new analysis();
  let rateReport = await o.generateReports()
  expect(rateReport.size > 0).toBe(true)
})
