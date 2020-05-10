import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ServiceReg {

  @PrimaryColumn()
  name: string;

  @Column()
  hostname: string;

  @Column()
  port: number;

  @CreateDateColumn()
  created_time: Date;

}