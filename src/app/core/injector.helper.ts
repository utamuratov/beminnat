import { Injector } from '@angular/core';

/**
 * Helper to resolve services (conside as IoC container).
 * Before using this make sure it is initialized on your root module
 */
export class InjectorHelper {
    /**
     * Static instance of injector.
     * Initialize in root modules before using
     * @see https://angular.io/api/core/INJECTOR
     */
    static injector: Injector;
}
