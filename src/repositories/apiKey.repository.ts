import { appDataSource } from "../config/app.datasource";
import APIKey from "../models/apiKey/model";

const apiKeyRepository = appDataSource.getRepository(APIKey).extend({});
export default apiKeyRepository;
