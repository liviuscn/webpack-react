import "./more-helpers"; // more-helpers is also 40kb in size

export default class B {
    constructor() {
        console.log('b')
    }
    fn() {
        import(/* webpackChunkName: "helpers" */ './helpers').then(module => {
            var print = module.default;

            print();
        });
    }
}