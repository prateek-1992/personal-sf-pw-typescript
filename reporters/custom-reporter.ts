import {
  type FullConfig,
  type Reporter,
  type Suite,
  type TestCase,
  type TestResult,
} from '@playwright/test/reporter';

export default class CustomReporter implements Reporter {
  testCaseStatusMapping = new Map<string, string>();

  testCaseSummaryObject = {
    passed: 0,
    failed: 0,
    skipped: 0,
  };

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    this.testCaseStatusMapping.set(test.id, result.status);
  }

  onEnd() {
    //iterating over the map and collecting the summary
    this.testCaseStatusMapping.forEach((testStatus) => {
      if (testStatus === 'passed') {
        this.testCaseSummaryObject.passed++;
      } else if (testStatus === 'failed') {
        this.testCaseSummaryObject.failed++;
      } else if (testStatus === 'skipped') {
        this.testCaseSummaryObject.skipped++;
      }
    });

    console.log(
      `At end the summary of execution is : ${JSON.stringify(this.testCaseSummaryObject)} `,
    );
  }
}
