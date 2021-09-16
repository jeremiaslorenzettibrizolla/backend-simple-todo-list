import { ListScrap } from './list-scrap.model';

export interface Scrap {
    uid?: string;
    description: string;
    finishDate?: Date;
    listScrapsUID: string;
    listScraps?: ListScrap;
}
