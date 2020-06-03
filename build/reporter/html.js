"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
const path_1 = require("path");
const safe_1 = require("colors/safe");
class HTMLReporter {
    constructor(options) {
        this.options = options;
    }
    report(reporter) {
        const path = path_1.join(__dirname, '/../../views/report.html');
        let html = fs_1.readFileSync(path, {
            encoding: 'utf-8'
        });
        let template = '';
        const values = [...reporter.values()];
        values.forEach((item, index) => {
            template += `<tr>
        <td>${index}</td>
        <td>${item.extname || ''}</td>
        <td>${item.filePath || ''}</td>
        <td>${item.length}</td>
        <td>${item.commentLength}</td>
        <td>${this.statisticCommentRate(item)}</td>
      </tr>`;
        });
        html = html.replace('{{template}}', template);
        if (this.options.output) {
            fs_extra_1.ensureDirSync(this.options.output);
            fs_1.writeFileSync(path_1.join(this.options.output, 'jscrs-report.html'), html);
            console.log(safe_1.green(`HTML report saved to ${path_1.join(this.options.output, 'jscrs-report.html')}`));
        }
    }
    statisticCommentRate(report) {
        const score = report.commentLength / report.length * 100;
        if (score >= 50 || score <= 5) {
            return `<span style="color:red">${report.commentRate}</span>`;
        }
        return report.commentRate;
    }
}
exports.HTMLReporter = HTMLReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBvcnRlci9odG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsdUNBQXlDO0FBQ3pDLDJCQUFpRDtBQUNqRCwrQkFBNEI7QUFDNUIsc0NBQW9DO0FBRXBDLE1BQWEsWUFBWTtJQUN2QixZQUFzQixPQUFpQjtRQUFqQixZQUFPLEdBQVAsT0FBTyxDQUFVO0lBQ3ZDLENBQUM7SUFDRCxNQUFNLENBQUMsUUFBOEI7UUFDbkMsTUFBTSxJQUFJLEdBQUcsV0FBSSxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBQ3pELElBQUksSUFBSSxHQUFHLGlCQUFZLENBQUMsSUFBSSxFQUFFO1lBQzVCLFFBQVEsRUFBRSxPQUFPO1NBQ2xCLENBQUMsQ0FBQztRQUNILElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUNqQixNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM3QixRQUFRLElBQUk7Y0FDSixLQUFLO2NBQ0wsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFO2NBQ2pCLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTtjQUNwQixJQUFJLENBQUMsTUFBTTtjQUNYLElBQUksQ0FBQyxhQUFhO2NBQ2xCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7WUFDakMsQ0FBQTtRQUNSLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzdDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsd0JBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2xDLGtCQUFhLENBQUMsV0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFLLENBQUMsd0JBQXdCLFdBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1NBQzdGO0lBRUgsQ0FBQztJQUVELG9CQUFvQixDQUFDLE1BQWU7UUFDbEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtRQUN4RCxJQUFJLEtBQUssSUFBSSxFQUFFLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUM3QixPQUFPLDJCQUEyQixNQUFNLENBQUMsV0FBVyxTQUFTLENBQUE7U0FDOUQ7UUFDRCxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUE7SUFDM0IsQ0FBQztDQUNGO0FBcENELG9DQW9DQyJ9