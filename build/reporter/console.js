"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleReporter {
    constructor(options) {
        this.options = options;
    }
    report(reporter) {
        console.table([...reporter.values()]);
    }
}
exports.ConsoleReporter = ConsoleReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBvcnRlci9jb25zb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsTUFBYSxlQUFlO0lBQzFCLFlBQXNCLE9BQWlCO1FBQWpCLFlBQU8sR0FBUCxPQUFPLENBQVU7SUFDdkMsQ0FBQztJQUNELE1BQU0sQ0FBQyxRQUE2QjtRQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FDRjtBQU5ELDBDQU1DIn0=