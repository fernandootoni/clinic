import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity("patients")
class Patient {
  @PrimaryColumn()
  id?: string;

  @Column()
  name?: string;

  @Column()
  responsible?: string;

  @Column()
  enabled?: boolean;

  @Column()
  phone?: string;

  @CreateDateColumn()
  created_at?: Date;

  @Column()
  disable_date?: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4()
    }
    if(!this.enabled) {
      this.enabled = true
    }
  }
}

export { Patient }