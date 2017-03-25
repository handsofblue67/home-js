// Type definitions for Feathers
// Project: http://feathersjs.com/
// Definitions by: Jack Guy <http://thatguyjackguy.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { Application, Handler, ErrorRequestHandler } from 'express';
type HandlerArgument = Handler | Handler[];

export = Feathers;

declare function Feathers(): Feathers.FeathersApp;

declare namespace Feathers {

  // The app object returned from the feathers() constructor. Based on an Express app.
  export interface FeathersApp extends Application {
    // The version of Feathers from package.json
    version: string;

    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'];
    services: any;
    providers: any[];

    // Since configure was removed from Express
    configure(Function): this;
    service(location: string): service.FeathersServiceInstance<any>;

    // Mixture of Express and Feathers - we have to duplicate these because there's no way
    // in TypeScript to "override" an extends. So we rewrite them all, express included.
    use(location: string, service: service.FeathersServiceConfig): this; // Feathers
    use(...handlers: HandlerArgument[]): this; // Express
    use(mountPoint: string | RegExp | (string | RegExp)[], ...handlers: HandlerArgument[]): this; // Express
    use(errorHandler: ErrorRequestHandler);

    setup(app: FeathersApp);
  }


  // Expose these to users for typings their hook creations
  export type Hooks = hooks.FeathersHooks;
  export type Hook<Resource> = hooks.FeathersHook<Resource>;
}

// Contains the typings for service-related features
declare namespace service {

    // The Events that can be subscribed to
    type FeathersEvent = 'create' | 'update' | 'patch' | 'remove';

    // Shared methods between a FeathersService and it's instance
    interface FeathersServiceMethods<Resource> {
        find?(params: FeathersParams, callback?: Function): PromiseLike<FeathersPage<Resource>>;
        get?(id: any, params: FeathersParams, callback?: Function): PromiseLike<Resource>;
        create?(data: Resource, params: FeathersParams, callback?: Function): PromiseLike<Resource>;
        update?(id: any, data: Resource, params: FeathersParams, callback?: Function): PromiseLike<Resource>;
        patch?(id: any, data: Resource, params: FeathersParams, callback?: Function): PromiseLike<Resource>;
        remove?(id: any, params: FeathersParams, callback?: Function): PromiseLike<Resource>;
    }

    // The returned / retrievable feathers.service (e.g. app.service('/users'))
    interface FeathersServiceInstance<Resource> extends FeathersServiceMethods<Resource> {
        before(hooks: hooks.FeathersHooks);
        after(hooks: hooks.FeathersHooks);
        on(event: FeathersEvent, callback: { (Resource): any });
    }

    // The interface that a new service object would implement
    interface FeathersService<Resource> extends FeathersServiceMethods<Resource>  {
        (FeathersServiceConfig): FeathersServiceInstance<Resource>;
        setup?(app: Feathers.FeathersApp, path?: string)
    }

    // Change pagination for a 'find' service call
    interface FeathersFindConfig {
        paginate?: {
            default?: number;
            max?: number;
        } | boolean;
    }

    // Customize the creation of a feathers service
    interface FeathersServiceConfig extends FeathersFindConfig {
        before?: hooks.FeathersHooks;
        after?: hooks.FeathersHooks;
    }

    // The parameters used by feathers services
    interface FeathersParams {
        query: any;
        data: any;
        result: any;
    }

    // Paginated resources returned by find
    interface FeathersPage<Resource> {
        total: number;
        limit: number;
        skip: number;
        data: Resource[];
    }

}

// Contains the typings for hook-related features
declare namespace hooks {

    // The typings for the "hook" parameter in hook functions
    interface FeathersHookInputBase {
        method: string;
        type: 'before' | 'after';
        callback: Function;
        params: any;
        data: any;
        app: Feathers.FeathersApp;
    }

    // We have an individual parameter typing for each hook type
    interface FeathersHookInputGet extends FeathersHookInputBase { id: any; }
    interface FeathersHookInputFind extends FeathersHookInputBase { }
    interface FeathersHookInputCreate extends FeathersHookInputBase { data: any; }
    interface FeathersHookInputUpdate extends FeathersHookInputBase { data: any; id: any; }
    interface FeathersHookInputPatch extends FeathersHookInputBase { data: any; id: any; }
    interface FeathersHookInputRemove extends FeathersHookInputBase { data: any; id: any; }
    type FeathersHookInputAll =
        FeathersHookInputGet | FeathersHookInputFind | FeathersHookInputCreate |
        FeathersHookInputUpdate | FeathersHookInputPatch | FeathersHookInputRemove;

    // The type of an actual hook function
    interface FeathersHook<Input> {
        (hook: Input): PromiseLike<any> | void
    }

    // Either an array of hooks or a single hook -
    // so we don't have to rewrite a super complicated type each time
    type FeatherHookArrayOrHook<Input> = Array<FeathersHook<Input>> | FeathersHook<Input>;
    interface FeathersHooks {
        all?: FeatherHookArrayOrHook<FeathersHookInputAll>;
        find?: FeatherHookArrayOrHook<FeathersHookInputFind>;
        get?: FeatherHookArrayOrHook<FeathersHookInputGet>;
        create?: FeatherHookArrayOrHook<FeathersHookInputCreate>;
        update?: FeatherHookArrayOrHook<FeathersHookInputUpdate>;
        patch?: FeatherHookArrayOrHook<FeathersHookInputPatch>;
        remove?: FeatherHookArrayOrHook<FeathersHookInputRemove>;
    }
}