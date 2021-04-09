"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerReporterByName = exports.getRegisteredReporters = exports.registerReporter = void 0;
const console_1 = require("./console");
const html_1 = require("./html");
const use_1 = require("../lib/use");
const json_1 = require("./json");
const EXISTING_REPORTERS = {
    console: console_1.ConsoleReporter,
    html: html_1.HTMLReporter,
    json: json_1.JSONReporter,
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
    reports.forEach((rep) => {
        const reporter = EXISTING_REPORTERS[rep] || use_1.useReporter(rep);
        registerReporter(rep, new reporter(options));
    });
}
exports.registerReporterByName = registerReporterByName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVwb3J0ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsdUNBQTJDO0FBQzNDLGlDQUFxQztBQUNyQyxvQ0FBd0M7QUFDeEMsaUNBQXFDO0FBQ3JDLE1BQU0sa0JBQWtCLEdBRXBCO0lBQ0YsT0FBTyxFQUFFLHlCQUFlO0lBQ3hCLElBQUksRUFBRSxtQkFBWTtJQUNsQixJQUFJLEVBQUUsbUJBQVk7Q0FDbkIsQ0FBQTtBQUVELE1BQU0sU0FBUyxHQUFvQyxFQUFFLENBQUE7QUFFckQsU0FBZ0IsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLFFBQXNCO0lBQ25FLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUE7QUFDNUIsQ0FBQztBQUZELDRDQUVDO0FBQ0QsU0FBZ0Isc0JBQXNCO0lBQ3BDLE9BQU8sU0FBUyxDQUFBO0FBQ2xCLENBQUM7QUFGRCx3REFFQztBQUVELFNBQWdCLHNCQUFzQixDQUFDLE9BQWlCO0lBQ3RELE1BQU0sRUFBRSxPQUFPLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBQ2hDLFFBQVE7SUFDUiw2Q0FBNkM7SUFDN0MseUJBQXlCO0lBQ3pCLDRCQUE0QjtJQUM1Qiw2Q0FBNkM7SUFDN0MsaURBQWlEO0lBQ2pELE1BQU07SUFDTixLQUFLO0lBRUwsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3RCLE1BQU0sUUFBUSxHQUNaLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLGlCQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDN0MsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDOUMsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBaEJELHdEQWdCQyJ9