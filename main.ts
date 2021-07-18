import { Construct } from 'constructs';
import { App, Chart, ChartProps } from 'cdk8s';
import {
  KubeDeployment,
  KubeService,
  IntOrString,
  KubeIngress,
} from './imports/k8s';

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    const label = { app: 'ddd-demo-cdk8s' };

    const service = new KubeService(this, 'service', {
      spec: {
        type: 'NodePort',
        ports: [{ port: 80, targetPort: IntOrString.fromNumber(8080) }],
        selector: label,
      },
    });

    new KubeIngress(this, 'ingress', {
      metadata: {
        annotations: {
          'kubernetes.io/ingress.class': 'alb',
          'alb.ingress.kubernetes.io/scheme': 'internet-facing',
          'alb.ingress.kubernetes.io/target-type': 'ip',
        },
      },
      spec: {
        rules: [
          {
            http: {
              paths: [
                {
                  path: '/',
                  pathType: 'Prefix',
                  backend: {
                    service: {
                      name: service.name,
                      port: {
                        number: 80,
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    });

    new KubeDeployment(this, 'deployment', {
      spec: {
        replicas: 2,
        selector: {
          matchLabels: label,
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: 'hello-kubernetes',
                image: 'paulbouwer/hello-kubernetes:1.9',
                ports: [{ containerPort: 8080 }],
                env: [
                  {
                    name: 'MESSAGE',
                    value: 'Hello DDD!',
                  },
                ],
              },
            ],
          },
        },
      },
    });
  }
}

const app = new App();
new MyChart(app, 'ddd-demo-cdk8s');
app.synth();
