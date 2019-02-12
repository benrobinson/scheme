export interface LazyComponent<Component extends FunctionComponent> {
  get: () => any;
  mapComponent: (f: (Component) => Component) => LazyComponent<Component>;
  mapProps: (f: (Props) => Props) => LazyComponent<Component>;
}

interface Props {
  [key: string]: any;
}

interface FunctionComponent {
  (props: {}): any;
}

export default function lazyComponent<Component extends FunctionComponent>(component: Component, props: Props): LazyComponent<Component> {

  /**
   * render
   *
   * @public
   */
  function get(): any {
    return component(props);
  }

  /**
   * mapComponent
   *
   * @public
   * @param f
   */
  function mapComponent(f: (Component) => Component): LazyComponent<Component> {
    return lazyComponent<Component>(f(component), props);
  }

  /**
   * mapProps
   *
   * @public
   * @param f
   */
  function mapProps(f: (Props) => Props): LazyComponent<Component> {
    return lazyComponent<Component>(component, f(props));
  }

  return {
    get,
    mapComponent,
    mapProps
  }
}
