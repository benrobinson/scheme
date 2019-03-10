export interface LazyComponent<C, P> {
  get: () => C;
  mapComponent: (f: (C) => C) => LazyComponent<C, P>;
  mapProps: (f: (P) => P) => LazyComponent<C, P>;
}

interface Component {
  (p: any): any;
}

export default function lazyComponent<P>(component: Component, props: P): LazyComponent<Component, P> {

  function get(): any {
    return component(props);
  }

  function mapComponent(f: (Component) => Component): LazyComponent<Component> {
    return lazyComponent<Component>(f(component), props);
  }

  function mapProps(f: (P) => P): LazyComponent<Component> {
    return lazyComponent<Component>(component, f(props));
  }

  return {
    get,
    mapComponent,
    mapProps
  }
}
