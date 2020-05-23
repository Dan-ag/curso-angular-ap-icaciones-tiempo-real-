export class Quiz {

  private option: string[] = [ 'Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4' ];
  private values: number[] = [ 0, 0, 0, 0 ];

  constructor() { }

  getQuiz() {
    return [
      { data: this.values, label: 'Preguntas' }
    ];
  }

  increaseVotes( option: number, value: number ) {
    this.values[ option ] += value;
    return this.getQuiz();
  }
}