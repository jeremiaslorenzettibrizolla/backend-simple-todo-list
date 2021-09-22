import {
    badRequest,
    ok,
    HttpRequest,
    HttpResponse,
    RequireFieldsValidator,
} from '../../../../core/presentation';

export class ListScrapMiddleware {
    private fields = ['title'];

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
