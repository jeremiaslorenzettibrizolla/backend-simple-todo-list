import { ScrapEntity } from '../../../../core/infra';
import { Scrap } from '../../domain';

export class ScrapRepository {
    async create(params: Scrap): Promise<Scrap> {
        const { description, status, listScrapsUID } = params;

        const scrap = await ScrapEntity.create({
            description,
            status,
            listScrapsUID,
        }).save();

        return Object.assign({}, params, scrap);
    }

    async getAll(): Promise<Scrap[]> {
        const scraps = await ScrapEntity.find();

        return scraps.map((scrap) => ({
            uid: scrap.uid,
            description: scrap.description,
            status: scrap.status,
            listScrapsUID: scrap.listScrapsUID,
        }));
    }

    async getOne(uid: string): Promise<Scrap | null> {
        const scrap = await ScrapEntity.findOne(uid);

        if (!scrap) {
            return null;
        }

        return {
            uid: scrap.uid,
            description: scrap.description,
            status: scrap.status,
            listScrapsUID: scrap.listScrapsUID,
        };
    }

    async update(uid: string, params: Scrap): Promise<Scrap | null> {
        const scrap = await ScrapEntity.findOne(uid);

        if (!scrap) {
            return null;
        }

        scrap.description = params.description;
        scrap.status = params.status;
        scrap.listScrapsUID = params.listScrapsUID;
        scrap.save();

        return {
            uid: scrap.uid,
            description: scrap.description,
            status: scrap.status,
            listScrapsUID: scrap.listScrapsUID,
        };
    }

    async delete(uid: string): Promise<void> {
        const scrap = await ScrapEntity.findOne(uid);

        if (scrap) {
            scrap.remove();
        }
    }
}
