import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class serviceDefinition {

  @PrimaryColumn()
  name: string;

  @Column()
  category: string;

  @Column()
  configuration: string;

  @Column()
  schedule_info: string;

  @Column({ default: true })
  isActive: boolean;

}