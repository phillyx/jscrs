"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleReporter = void 0;
class ConsoleReporter {
    constructor(options) {
        this.options = options;
    }
    report(reporter) {
        console.table([...reporter.values()]);
    }
}
exports.ConsoleReporter = ConsoleReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBvcnRlci9jb25zb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLE1BQWEsZUFBZTtJQUMxQixZQUFzQixPQUFpQjtRQUFqQixZQUFPLEdBQVAsT0FBTyxDQUFVO0lBQ3ZDLENBQUM7SUFDRCxNQUFNLENBQUMsUUFBNkI7UUFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBQ0Y7QUFORCwwQ0FNQyJ9