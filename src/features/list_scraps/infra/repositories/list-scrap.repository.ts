import { ListScrapEntity } from '../../../../core/infra/data/database/entities/list-scrap.entity';
import { ListScrap } from '../../domain';

export class ListScrapRepository {
    async create(params: ListScrap): Promise<ListScrap> {
        const { title } = params;

        const listScrap = await ListScrapEntity.create({
            title,
        }).save();

        return Object.assign({}, params, listScrap);
    }

    async getAll(): Promise<ListScrap[]> {
        const scraps = await ListScrapEntity.find();

        return scraps.map((scrap) => ({
            uid: scrap.uid,
            title: scrap.title,
        }));
    }

    async getOne(uid: string): Promise<ListScrap | null> {
        const scrap = await ListScrapEntity.findOne(uid);

        if (!scrap) {
            return null;
        }

        return {
            uid: scrap.uid,
            title: scrap.title,
        };
    }

    async update(uid: string, params: ListScrap): Promise<ListScrap | null> {
        const scrap = await ListScrapEntity.findOne(uid);

        if (!scrap) {
            return null;
        }

        scrap.title = params.title;
        scrap.save();

        return {
            uid: scrap.uid,
            title: scrap.title,
        };
    }

    async delete(uid: string): Promise<void> {
        const scrap = await ListScrapEntity.findOne(uid);

        if (scrap) {
            scrap.remove();
        }
    }
}
