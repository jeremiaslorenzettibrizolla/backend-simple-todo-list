import { Router } from 'express';
import { EMVC } from '../../../../core/presentation';
import {
    middlewareAdapter,
    routerMvcAdapter,
} from '../../../../core/presentation';
import { ListScrapController } from '../controllers';
import { ListScrapMiddleware } from '../middlewares';
import { MVCController } from '../../../../core/presentation';
import { ListScrapRepository } from '../../infra';
import { CacheRepository } from '../../infra';

const makeController = (): MVCController => {
    const repository = new ListScrapRepository();
    const cache = new CacheRepository();
    return new ListScrapController(repository, cache);
};

export default class ListScrapRoutes {
    public init(routes: Router) {
        routes.get('/scraps', routerMvcAdapter(makeController(), EMVC.INDEX));

        routes.get(
            '/scraps/:uid',
            routerMvcAdapter(makeController(), EMVC.SHOW),
        );

        routes.post(
            '/scraps',
            middlewareAdapter(new ListScrapMiddleware()),
            routerMvcAdapter(makeController(), EMVC.STORE),
        );

        routes.put(
            '/scraps/:uid',
            middlewareAdapter(new ListScrapMiddleware()),
            routerMvcAdapter(makeController(), EMVC.UPDATE),
        );

        routes.delete(
            '/scraps/:uid',
            routerMvcAdapter(makeController(), EMVC.DELETE),
        );
    }
}
