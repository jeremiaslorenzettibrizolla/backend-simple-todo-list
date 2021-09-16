import { Scrap } from './scrap.model';

export interface ListScrap {
    uid?: string;
    title: string;
    scraps?: Scrap[];
}
