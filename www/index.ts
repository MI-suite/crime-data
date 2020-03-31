import { PORT, NODE_ENV } from '../env';

import { app } from './loaders';

app.listen(PORT, () => {
    console.log(`
CRIMES_SUITE:::::Bootstrap: App running in ${NODE_ENV.toUpperCase()} mode
AND Listening on port ${PORT}::::::http://localhost:${PORT}
    `);
});
