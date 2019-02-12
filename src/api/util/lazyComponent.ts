export interface LazyComponent {
  render: () => any;
  withProps: (props: {}) => LazyComponent;
  withProp: (key: string, value: any) => LazyComponent;
}

interface Props {
  [key: string]: any;
}

interface FunctionComponent {
  (props: {}): any;
}

export default function lazyComponent<Component extends FunctionComponent>(component: Component, props: Props): LazyComponent {

  /**
   * render
   *
   * @public
   */
  function render() {
    return component(props);
  }

  /**
   * withProp
   *
   * @public
   * @param key
   * @param value
   */
  function withProp(key: string, value: any) {
    return lazyComponent<Component>(component, {...props, [key]: value});
  }

  /**
   * withProps
   *
   * @public
   * @param ps
   */
  function withProps(ps: Props) {
    return lazyComponent<Component>(component, ps);
  }

  return {
    render,
    withProp,
    withProps
  }
}
