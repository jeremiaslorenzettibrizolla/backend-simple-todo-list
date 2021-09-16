import { badRequest, ok } from '../../../../core/presentation';
import { HttpRequest, HttpResponse } from '../../../../core/presentation';
import { RequireFieldsValidator } from '../../../../core/presentation';
import { ListScrap } from '../../domain';

export class ListScrapMiddleware {
    private fields = ['name', 'userUid'];

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const body: ListScrap = request.body;

        for (const field of this.fields) {
            const error = new RequireFieldsValidator(field).validate(body);

            if (error) {
                return badRequest(error);
            }
        }

        return ok({});
    }
}
