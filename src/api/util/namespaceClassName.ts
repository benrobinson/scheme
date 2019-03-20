export default function namespaceClassName(namespace: string) {
  return function(...args: string[]) {
    return `${namespace}--${args.join('--')}`;
  }
}
