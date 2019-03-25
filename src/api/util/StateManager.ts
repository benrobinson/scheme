interface Listener<T> {
  (v: T): any;
}

export interface StateManager<T> {
  subscribe(listener: Listener<T>): StateManager<T>;
  unsubscribe(listener: Listener<T>): StateManager<T>;
  publish(modify: <B>(v: T) => B): StateManager<T>;
  getValue(): T;
}

export default function StateManager<T>(initialValue: T): StateManager<T> {

  let value: T = initialValue;
  let listeners: Listener<T>[] = [];

  function state(doDispatch = false): StateManager<T> {

    // private
    function dispatch() {
      listeners.map(listener => listener(value));
    }

    // public
    function subscribe(listener: Listener<T>) {
      listeners = [...listeners, listener];
      return state(false);
    }

    function unsubscribe(listener: Listener<T>) {
      listeners = listeners.filter(l => l !== listener);
      return state(false);
    }

    function publish(modify: <B>(v: T) => B): StateManager<T> {
      value = modify(value);
      return state(true);
    }

    function getValue(): T {
      return value;
    }

    if (doDispatch) dispatch();

    return {
      subscribe,
      unsubscribe,
      publish,
      getValue
    };
  }

  return state();
}
