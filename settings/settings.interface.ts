export interface IEnvironment {
    test: string;
    development: string;
    production: string;

    [key: string]: string;
};
