"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const safe_1 = require("colors/safe");
const path_1 = require("path");
class JSONReporter {
    constructor(options) {
        this.options = options;
    }
    report(reporter) {
        if (this.options.output) {
            fs_extra_1.ensureDirSync(this.options.output);
            fs_extra_1.writeFileSync(path_1.join(this.options.output, 'jscrs-report.json'), JSON.stringify([...reporter.values()]));
            console.log(safe_1.green(`json report saved to ${path_1.join(this.options.output, 'jscrs-report.html')}`));
        }
    }
}
exports.JSONReporter = JSONReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBvcnRlci9qc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsdUNBQXdEO0FBQ3hELHNDQUFvQztBQUNwQywrQkFBNEI7QUFFNUIsTUFBYSxZQUFZO0lBQ3ZCLFlBQXNCLE9BQWlCO1FBQWpCLFlBQU8sR0FBUCxPQUFPLENBQVU7SUFDdkMsQ0FBQztJQUNELE1BQU0sQ0FBQyxRQUE2QjtRQUNsQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLHdCQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNsQyx3QkFBYSxDQUFDLFdBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNyRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQUssQ0FBQyx3QkFBd0IsV0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDN0Y7SUFDSCxDQUFDO0NBQ0Y7QUFWRCxvQ0FVQyJ9