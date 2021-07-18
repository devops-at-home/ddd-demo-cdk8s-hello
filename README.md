# ddd-demo-cdk8s-hello

AWS CDK8s for generating 'Hello World' workload manifests - demo for DDD Perth 2021

## Requirements

- NodeJS 14, NPM, and Yarn installed
- Kubectl installed with `.kube/config` configured to connect to cluster

## Commands

### Build and run tests

```
yarn install
yarn build
```

### Update tests

```
yarn test -u
```

### Deploy stack

```
kubectl apply -f dist/ddd-demo-cdk8s.k8s.yaml -n demo
```

### Upgrades

```
yarn run import
yarn run upgrade
```
