"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONReporter = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBvcnRlci9qc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVDQUF3RDtBQUN4RCxzQ0FBb0M7QUFDcEMsK0JBQTRCO0FBRTVCLE1BQWEsWUFBWTtJQUN2QixZQUFzQixPQUFpQjtRQUFqQixZQUFPLEdBQVAsT0FBTyxDQUFVO0lBQ3ZDLENBQUM7SUFDRCxNQUFNLENBQUMsUUFBNkI7UUFDbEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN2Qix3QkFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbEMsd0JBQWEsQ0FBQyxXQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFLLENBQUMsd0JBQXdCLFdBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1NBQzdGO0lBQ0gsQ0FBQztDQUNGO0FBVkQsb0NBVUMifQ==