import { Router } from 'express';

import {
    EMVC,
    middlewareAdapter,
    routerMvcAdapter,
    MVCController,
} from '../../../../core/presentation';
import { ListScrapController } from '../controllers';
import { ListScrapMiddleware } from '../middlewares';
import { ListScrapRepository, CacheRepository } from '../../infra';

const makeController = (): MVCController => {
    const repository = new ListScrapRepository();
    const cache = new CacheRepository();
    return new ListScrapController(repository, cache);
};

export default class ListScrapRoutes {
    public init(routes: Router) {
        routes.get(
            '/listScraps',
            routerMvcAdapter(makeController(), EMVC.INDEX),
        );

        routes.get(
            '/listScraps/:listScrapsUID',
            routerMvcAdapter(makeController(), EMVC.SHOW),
        );

        routes.post(
            '/listScraps',
            middlewareAdapter(new ListScrapMiddleware()),
            routerMvcAdapter(makeController(), EMVC.STORE),
        );

        routes.put(
            '/listScraps/:listScrapsUID',
            middlewareAdapter(new ListScrapMiddleware()),
            routerMvcAdapter(makeController(), EMVC.UPDATE),
        );

        routes.delete(
            '/listScraps/:listScrapsUID',
            routerMvcAdapter(makeController(), EMVC.DELETE),
        );
    }
}
