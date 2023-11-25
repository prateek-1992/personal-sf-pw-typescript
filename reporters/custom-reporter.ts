import {
  type FullConfig,
  type FullResult,
  type Reporter,
  type Suite,
  type TestCase,
  type TestResult,
} from '@playwright/test/reporter';

export default class CustomReporter implements Reporter {
  testCaseSummary = {
    passed: 0,
    failed: 0,
    slow: 0,
  };

  list_of_cases: string[] = [];

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`);
    const teseExecutionTime = result.duration;
    console.log(`test case took : ${teseExecutionTime}`);
    if (teseExecutionTime > 100) {
      test.title = `@slow ${test.title}`;
      this.testCaseSummary['slow'] = this.testCaseSummary['slow'] + 1;
    }

    //collect all failed test cases
    if (result.status === 'passed') {
      console.log(`test title path`);
      test.titlePath().forEach((v) => {
        console.log(v);
      });
      const { file, line } = test.location;
      const relativeFile = file.split('/tests/')[1];
      console.log(`${relativeFile}:${line}`);
    }
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
    //here you can run the function you want to do at end
    console.log(`Total slow test cases are ${this.testCaseSummary.slow}`);
    console.log(process.env['base_url']);
  }
}
