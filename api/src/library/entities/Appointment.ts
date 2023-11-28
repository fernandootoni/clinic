import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { Patient } from './Patient';
import { User } from './User';

@Entity("appointments")
class Appointment {
  @PrimaryColumn()
  id?: string;

  @Column()
  patient_id?: string;

  @Column()
  psychologist_id?: string;

  @Column()
  supervisor_id?: string;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "patient_id" })
  patient?: Patient;

  @ManyToOne(() => User)
  @JoinColumn({ name: "psychologist_id" })
  psychologist?: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "supervisor_id" })
  supervisor?: User;

  @Column()
  patient_name?: string;

  @Column()
  psychologist_name?: string;

  @Column()
  supervisor_name?: string;

  @Column()
  day?: string;

  @Column()
  hour?: number;

  @Column()
  minute?: number;

  @Column()
  duration?: number;

  @Column()
  repeats?: boolean;

  @Column()
  enabled?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4()
    }
    if(!this.enabled) {
      this.enabled = true
    }
    if(!this.repeats) {
      this.repeats = true
    }
  }
}

export { Appointment }