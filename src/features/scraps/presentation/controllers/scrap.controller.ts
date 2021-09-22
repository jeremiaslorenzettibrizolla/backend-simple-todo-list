import {
    HttpRequest,
    HttpResponse,
    notFound,
    ok,
    serverError,
    MVCController,
} from '../../../../core/presentation';
import { ScrapRepository, CacheRepository } from '../../infra';

export class ScrapController implements MVCController {
    readonly #repository: ScrapRepository;
    readonly #cache: CacheRepository;

    constructor(repository: ScrapRepository, cache: CacheRepository) {
        this.#repository = repository;
        this.#cache = cache;
    }

    public async index(): Promise<HttpResponse> {
        try {
            const cache = await this.#cache.get('scrap:all');

            if (cache) {
                return ok(cache);
            }

            const scraps = await this.#repository.getAll();

            if (!scraps || scraps.length === 0) {
                return notFound();
            }

            await this.#cache.set('scrap:all', scraps);

            return ok(scraps);
        } catch (error) {
            return serverError();
        }
    }

    public async show(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            const cache = await this.#cache.get(`scrap:${uid}`);

            if (cache) {
                return ok(cache);
            }

            const scrap = await this.#repository.getOne(uid);

            if (!scrap) {
                return notFound();
            }

            await this.#cache.set(`scrap:${uid}`, scrap);

            return ok(scrap);
        } catch (error) {
            return serverError();
        }
    }

    public async store(request: HttpRequest): Promise<HttpResponse> {
        try {
            const scrap = await this.#repository.create(request.body);

            await this.#cache.set(`scrap:${scrap.uid}`, scrap);
            await this.#cache.del('scrap:all');

            return ok(scrap);
        } catch (error) {
            return serverError();
        }
    }

    public async update(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            const scrap = await this.#repository.update(uid, request.body);

            await this.#cache.set(`scrap:${uid}`, scrap);
            await this.#cache.del('scrap:all');

            return ok(scrap);
        } catch (error) {
            return serverError();
        }
    }

    public async delete(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            await this.#repository.delete(uid);

            await this.#cache.del(`scrap:${uid}`);
            await this.#cache.del('scrap:all');

            return ok({});
        } catch (error) {
            return serverError();
        }
    }
}
