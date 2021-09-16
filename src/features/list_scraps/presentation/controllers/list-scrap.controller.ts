import { HttpRequest, HttpResponse } from '../../../../core/presentation';
import { notFound, ok, serverError } from '../../../../core/presentation';
import { MVCController } from '../../../../core/presentation';
import { ListScrapRepository } from '../../infra';
import { CacheRepository } from '../../infra';

export class ListScrapController implements MVCController {
    readonly #repository: ListScrapRepository;
    readonly #cache: CacheRepository;

    constructor(repository: ListScrapRepository, cache: CacheRepository) {
        this.#repository = repository;
        this.#cache = cache;
    }

    public async index(): Promise<HttpResponse> {
        try {
            const cache = await this.#cache.get('listScrap:all');

            if (cache) {
                return ok(cache);
            }

            const listScraps = await this.#repository.getAll();

            if (!listScraps || listScraps.length === 0) {
                return notFound();
            }

            await this.#cache.set('listScrap:all', listScraps);

            return ok(listScraps);
        } catch (error) {
            return serverError();
        }
    }

    public async show(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            const cache = await this.#cache.get(`listScrap:${uid}`);

            if (cache) {
                return ok(cache);
            }

            const listScrap = await this.#repository.getOne(uid);

            if (!listScrap) {
                return notFound();
            }

            await this.#cache.set(`listScrap:${uid}`, listScrap);

            return ok(listScrap);
        } catch (error) {
            return serverError();
        }
    }

    public async store(request: HttpRequest): Promise<HttpResponse> {
        try {
            const listScrap = await this.#repository.create(request.body);

            await this.#cache.set(`listScrap:${listScrap.uid}`, listScrap);
            await this.#cache.del('listScrap:all');

            return ok(listScrap);
        } catch (error) {
            return serverError();
        }
    }

    public async update(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            const listScrap = await this.#repository.update(uid, request.body);

            await this.#cache.set(`listScrap:${uid}`, listScrap);

            return ok(listScrap);
        } catch (error) {
            return serverError();
        }
    }

    public async delete(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            await this.#repository.delete(uid);

            await this.#cache.del(`listScrap:${uid}`);

            return ok({});
        } catch (error) {
            return serverError();
        }
    }
}
