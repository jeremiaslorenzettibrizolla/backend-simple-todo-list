import {
    badRequest,
    ok,
    HttpRequest,
    HttpResponse,
    RequireFieldsValidator,
} from '../../../../core/presentation';
import { Scrap } from '../../domain';

export class ScrapMiddleware {
    private fields = ['description', 'listScrapsUID'];

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { body } = request;

        for (const field of this.fields) {
            const error = new RequireFieldsValidator(field).validate(body);

            if (error) {
                return badRequest(error);
            }
        }

        return ok({});
    }
}
