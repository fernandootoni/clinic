import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column()
  access_level?: number;

  @Column()
  hourlywage?: number;

  @Column()
  supervisorhourlywage?: number;

  @Column()
  enable?: boolean

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
    if(!this.access_level) {
      this.access_level = 0
    }
    if(!this.enable) {
      this.enable = true
    }
  }
}

export { User }