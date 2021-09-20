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
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { ListScrapEntity } from './list-scrap.entity';

@Entity({ name: 'scraps' })
export class ScrapEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uid!: string;

    @Column()
    description!: string;

    @Column()
    status?: string;

    @Column({ name: 'list_scraps_uid' })
    listScrapsUID!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => ListScrapEntity, (listScraps) => listScraps.scraps)
    @JoinColumn({ name: 'list_scraps_uid', referencedColumnName: 'uid' })
    listScraps?: ListScrapEntity[];

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
