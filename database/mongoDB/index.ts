import { MongoClient } from 'mongodb';
import { Service } from 'typedi';

import { MONGO_URL } from '../../settings';

@Service()
export class Mongo {
    public client: MongoClient;

    public constructor () {
        this.client = new MongoClient(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.initConnection();
    }

    private initConnection = (): void => {
        this.client.connect((err) => {
            if (err) {
                this.client.close();

                throw new Error(
                    'Mongo:::initConnection: Unable to establish a connection to database',
                );
            }

            console.log(
                'Mongo:::initConnection: Connection to database established',
            );
        });
    };
}
