import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz_questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  ngOnInit(): void {
    if (quiz_questions) {
      this.finished = false;
      this.title = quiz_questions.title;

      this.questions = quiz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }
  title: string = '';

  questions: any;
  questionSelected: any;

  answers: number[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  playerChoose(value: number) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected =
        quiz_questions.results[
          finalAnswer as keyof typeof quiz_questions.results
        ];
    }
  }

  async checkResult(anwsers: number[]) {
    const sumResult = anwsers.reduce((a, b) => a + b, 0);

    if (sumResult >= 91 && sumResult <= 100) {
      return 'Muito Alta';
    } else if (sumResult >= 81 && sumResult <= 90) {
      return 'Alta';
    } else if (sumResult >= 51 && sumResult <= 80) {
      return 'Média';
    } else if (sumResult >= 31 && sumResult <= 50) {
      return 'Baixa';
    } else if (sumResult >= 20 && sumResult <= 30) {
      return 'Muito Baixa';
    } else {
      return '';
    }
  }

  resetTest() {
    this.answers = [];
    this.finished = false;
    this.questionIndex = 0;
    this.questionSelected = this.questions[this.questionIndex];
  }
}
