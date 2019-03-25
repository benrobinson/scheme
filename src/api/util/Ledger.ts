export interface Entry<A> {
  value: A;
  combine(b: Entry<A>): Entry<A>;
  map(fn: (A) => any): Entry<any>;
}

export interface Ledger<A> {
  computed: Entry<A>;
  add(entry: Entry<A>): Ledger<A>;
  compute(): Entry<A>;
  map<B>(fn: (A) => B): Ledger<B>;
}

export default function ledger<A>(entries: Entry<A>[] = [], computed: Entry<A> = null): Ledger<A> {

  function add(entry: Entry<A>): Ledger<A> {
    const c = (computed === null) ? entry : computed.combine(entry);
    console.log(c);
    return ledger([...entries, entry], c);
  }

  function compute(): Entry<A> {
    return entries.reduce((a, b) => a.combine(b));
  }

  function map<B>(fn: (A) => B): Ledger<B> {
    return ledger(entries.map(entry => entry.map(fn)), computed.map(fn));
  }

  return {
    add,
    compute,
    computed,
    map
  };
}
