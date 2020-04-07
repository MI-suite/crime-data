import { Service } from 'typedi';

import { BaseRepository } from '../repository';

interface IGetCrimeData {
    model: string;
    limit: number;
    caseType: string;
    lastSN: number;
}

@Service()
export class CrimesService {
    private repository: BaseRepository;

    public constructor (repository: BaseRepository) {
        this.repository = repository;
    }

    public async getCrimeDataByType (config: IGetCrimeData): Promise<any> {
        const { model, limit, caseType, lastSN } = config;

        const query = `
            select "${model}".*
            FROM "${model}"
            WHERE "${model}"."Primary Type" = '${caseType.trim().toUpperCase()}'
                AND "${model}"."SN" > ${lastSN}
            ORDER BY "${model}"."SN" ASC
            FETCH FIRST ${limit} ROWS ONLY;
        `;
        const data = await this.repository.find({
            text: query,
        });

        return data;
    }
}
