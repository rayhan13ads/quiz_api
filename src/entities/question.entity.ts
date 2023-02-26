import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import Model from "./model.entity";
import { Option } from "./options.entity";
import { Quiz } from "./quiz.entity";

@Entity("questions")
export class Question extends Model {
  @Column({ type: "text" })
  text_question: string;

  @Column({ type: "bool" })
  is_mandatory: boolean;

  @OneToOne(() => Quiz, (quiz) => quiz.questions, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "quiz_id" })
  quiz: Quiz;

  @OneToMany(() => Option, (options) => options.question)
  options: Option[];
}
