import {
    Entity,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    JoinColumn,
    ManyToOne,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ListScrapEntity } from './list-scrap.entity';

@Entity({ name: 'scraps' })
export class ScrapEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uid!: string;

    @Column({ name: 'list_scraps_uid' })
    listScrapsUID!: string;

    @Column()
    description!: string;

    @Column({ name: 'finish_date' })
    finishDate?: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => ListScrapEntity, (listScrap) => listScrap.scraps)
    @JoinColumn({ name: 'list_scraps_uid', referencedColumnName: 'uid' })
    listScrap?: ListScrapEntity;

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
