import { Router } from 'express';

import {
    EMVC,
    middlewareAdapter,
    routerMvcAdapter,
    MVCController,
} from '../../../../core/presentation';
import { ScrapRepository, CacheRepository } from '../../infra';
import { ScrapController } from '../controllers';
import { ScrapMiddleware } from '../middlewares';

const makeController = (): MVCController => {
    const repository = new ScrapRepository();
    const cache = new CacheRepository();
    return new ScrapController(repository, cache);
};

export default class ScrapRoutes {
    public init(routes: Router) {
        routes.get(
            '/listScraps/:listScrapsUID/scraps',
            routerMvcAdapter(makeController(), EMVC.INDEX),
        );

        routes.get(
            '/listScraps/:listScrapsUID/scraps/:scrapUID',
            routerMvcAdapter(makeController(), EMVC.SHOW),
        );

        routes.post(
            '/listScraps/:listScrapsUID/scraps',
            middlewareAdapter(new ScrapMiddleware()),
            routerMvcAdapter(makeController(), EMVC.STORE),
        );

        routes.put(
            '/listScraps/:listScrapsUID/scraps/:scrapUID',
            middlewareAdapter(new ScrapMiddleware()),
            routerMvcAdapter(makeController(), EMVC.UPDATE),
        );

        routes.delete(
            '/listScraps/:listScrapsUID/scraps/:scrapUID',
            routerMvcAdapter(makeController(), EMVC.DELETE),
        );
    }
}
