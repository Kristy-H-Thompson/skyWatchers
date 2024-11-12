import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
  /* 
------------------------------------------------------------------------------------------------------------

GET ROUTE
// TODO: Define route to serve index.html


------------------------------------------------------------------------------------------------------------ 
*/ 
// TODO: Define route to serve index.html
router.get('/', (_, res) => {  // Using underscore to indicate unused parameter
    res.sendFile(path.join(__dirname, '../../../client/index.html'));
  });

export default router;
