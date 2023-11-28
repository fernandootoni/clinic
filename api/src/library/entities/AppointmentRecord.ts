import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { Patient } from './Patient';
import { User } from './User';
import { Appointment } from './Appointment';

@Entity("appointment_records")
class AppointmentRecord {
  @PrimaryColumn()
  id?: string;

  @Column()
  appointment_id?: string;

  @Column()
  patient_id?: string;

  @Column()
  psychologist_id?: string;

  @Column()
  supervisor_id?: string;

  @ManyToOne(() => Appointment)
  @JoinColumn({ name: "appointment_id" })
  appointment?: Appointment;

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
  appointment_date?: Date;

  @Column()
  duration?: number;

  @Column()
  done?: boolean;

  @Column()
  psychologist_done?: boolean;

  @Column()
  supervisor_done?: boolean;

  @Column()
  done_description?: string;

  @Column()
  done_date?: Date;

  @Column()
  verified?: boolean;

  @Column()
  verified_by?: string;

  @Column()
  verified_date?: Date;

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
    if(!this.psychologist_done) {
      this.psychologist_done = false
    }
    if(!this.supervisor_done) {
      this.supervisor_done = false
    }
    if(!this.verified) {
      this.verified = false
    }
  }
}

export { AppointmentRecord }