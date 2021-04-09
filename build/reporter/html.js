"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLReporter = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBvcnRlci9odG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVDQUF5QztBQUN6QywyQkFBaUQ7QUFDakQsK0JBQTRCO0FBQzVCLHNDQUFvQztBQUVwQyxNQUFhLFlBQVk7SUFDdkIsWUFBc0IsT0FBaUI7UUFBakIsWUFBTyxHQUFQLE9BQU8sQ0FBVTtJQUN2QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLFFBQThCO1FBQ25DLE1BQU0sSUFBSSxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQUN6RCxJQUFJLElBQUksR0FBRyxpQkFBWSxDQUFDLElBQUksRUFBRTtZQUM1QixRQUFRLEVBQUUsT0FBTztTQUNsQixDQUFDLENBQUM7UUFDSCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDN0IsUUFBUSxJQUFJO2NBQ0osS0FBSztjQUNMLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRTtjQUNqQixJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUU7Y0FDcEIsSUFBSSxDQUFDLE1BQU07Y0FDWCxJQUFJLENBQUMsYUFBYTtjQUNsQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO1lBQ2pDLENBQUE7UUFDUixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM3QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLHdCQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNsQyxrQkFBYSxDQUFDLFdBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBSyxDQUFDLHdCQUF3QixXQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUM3RjtJQUVILENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxNQUFlO1FBQ2xDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDeEQsSUFBSSxLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDN0IsT0FBTywyQkFBMkIsTUFBTSxDQUFDLFdBQVcsU0FBUyxDQUFBO1NBQzlEO1FBQ0QsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFBO0lBQzNCLENBQUM7Q0FDRjtBQXBDRCxvQ0FvQ0MifQ==