import { Column, Entity, OneToMany } from "typeorm";
import Model from "./model";
import { Question } from "./question.entity";

@Entity("quizs")
export class Quiz extends Model {
  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "bool" })
  is_publish: boolean;

  @OneToMany(() => Question, (questions) => questions.quiz)
  questions: Question[];
}
