import { ListScrap } from './list-scrap.model';

export interface Scrap {
    uid?: string;
    description: string;
    status?: string;
    listScrapsUID: string;
    listScraps?: ListScrap;
}
