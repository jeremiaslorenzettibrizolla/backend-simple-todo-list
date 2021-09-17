import {
    Entity,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ScrapEntity } from './scrap.entity';

@Entity({ name: 'list_scraps' })
export class ListScrapEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uid!: string;

    @Column()
    title!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(() => ScrapEntity, (scrap) => scrap.listScraps)
    scraps?: ScrapEntity[];

    @BeforeInsert()
    private beforeInsert() {
        this.uid = uuid();
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }
}
