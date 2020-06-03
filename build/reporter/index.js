"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("./console");
const html_1 = require("./html");
const use_1 = require("../lib/use");
const json_1 = require("./json");
const EXISTING_REPORTERS = {
    console: console_1.ConsoleReporter,
    html: html_1.HTMLReporter,
    json: json_1.JSONReporter
};
const Reporters = {};
function registerReporter(name, reporter) {
    Reporters[name] = reporter;
}
exports.registerReporter = registerReporter;
function getRegisteredReporters() {
    return Reporters;
}
exports.getRegisteredReporters = getRegisteredReporters;
function registerReporterByName(options) {
    const { reports = [] } = options;
    // 不利于拓展
    // let keys = Object.keys(EXSITING_REPORTERS)
    // reports.forEach(x => {
    //   if (keys.includes(x)) {
    //     const reporter = EXSITING_REPORTERS[x]
    //     registerReporter(x, new reporter(options))
    //   }
    // })
    reports.forEach(rep => {
        const reporter = EXISTING_REPORTERS[rep] || use_1.useReporter(rep);
        registerReporter(rep, new reporter(options));
    });
}
exports.registerReporterByName = registerReporterByName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVwb3J0ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSx1Q0FBNEM7QUFDNUMsaUNBQXNDO0FBQ3RDLG9DQUF5QztBQUN6QyxpQ0FBc0M7QUFDdEMsTUFBTSxrQkFBa0IsR0FFcEI7SUFDRixPQUFPLEVBQUUseUJBQWU7SUFDeEIsSUFBSSxFQUFFLG1CQUFZO0lBQ2xCLElBQUksRUFBQyxtQkFBWTtDQUNsQixDQUFBO0FBRUQsTUFBTSxTQUFTLEdBQW9DLEVBQUUsQ0FBQTtBQUVyRCxTQUFnQixnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsUUFBc0I7SUFDbkUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQTtBQUM1QixDQUFDO0FBRkQsNENBRUM7QUFDRCxTQUFnQixzQkFBc0I7SUFDcEMsT0FBTyxTQUFTLENBQUE7QUFDbEIsQ0FBQztBQUZELHdEQUVDO0FBRUQsU0FBZ0Isc0JBQXNCLENBQUMsT0FBaUI7SUFDdEQsTUFBTSxFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUE7SUFDaEMsUUFBUTtJQUNSLDZDQUE2QztJQUM3Qyx5QkFBeUI7SUFDekIsNEJBQTRCO0lBQzVCLDZDQUE2QztJQUM3QyxpREFBaUQ7SUFDakQsTUFBTTtJQUNOLEtBQUs7SUFFTCxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3BCLE1BQU0sUUFBUSxHQUE0QyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxpQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RHLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWZELHdEQWVDIn0=