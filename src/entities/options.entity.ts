import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import Model from "./model";
import { Question } from "./question.entity";


@Entity("options")
export class Option extends Model {
  @Column({ type: "text" })
  text_option: string;

  @Column({ type: "bool" })
  is_answer: boolean;

  @OneToOne(() => Question, (question) => question.options, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "question_id" })
  question: Question;
}
