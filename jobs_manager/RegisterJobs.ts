import { Service } from 'typedi';

@Service()
export class RegisterJobs {
    private jobTypes: string[];

    public constructor () {
        this.jobTypes = [
            'theft',
        ];

        this.initJobs();
    }

    private initJobs = (): void => {
        if (!this.jobTypes.length) {
            return;
        }

        this.jobTypes.forEach(async (type) => {
            require(`./jobs_list/${type}`);
        });
    };
}
