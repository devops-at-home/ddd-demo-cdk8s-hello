import { MyChart } from './main';
import { Testing } from 'cdk8s';

describe('DDD demo', () => {
  test('Snapshot', () => {
    const app = Testing.app();
    const chart = new MyChart(app, 'test-chart');
    const results = Testing.synth(chart);
    expect(results).toMatchSnapshot();
  });
});
