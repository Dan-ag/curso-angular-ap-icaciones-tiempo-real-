export class GraphData {

  private months: string[] = [ 'january', 'february', 'march', 'april' ];
  private values: number[] = [ 0, 0, 0, 0 ];

  constructor() { }

  getDataGraph() {
    return [
      { data: this.values, label: 'Ventas' }
    ];
  }

  increaseValue( month: string, value: number ) {

    month = month.toLowerCase().trim();

    for ( let i in this.months ) {
      if ( this.months[ i ] === month ) {
        this.values[i] += value;
      }
    }

    return this.getDataGraph();
  }
}