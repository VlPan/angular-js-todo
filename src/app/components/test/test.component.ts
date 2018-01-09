/**
 * Import the Component styles
 */
import './test.component.scss';

class TestController {
    name: string = 'Jane';
}

export class Test implements angular.IComponentOptions {
    static selector = 'test';
    static controller = TestController;
    static template = require('./test.component.html');
}
