import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { FavouritesService} from 'src/v1/favourites/favourites.service';

@Injectable()
export class ElasticSearchService {
    
    
    private readonly client: Client;
    private readonly favouritesService: FavouritesService

    constructor() {
        this.client = new Client({ node: 'http://localhost:9200' }); // Replace with your Elasticsearch server URL
    }

    async indexFavDocument(index: string, body: any): Promise<any> {

        const response = await this.client.index({
            index,
            id: body.id,
            body,
        });
        return response;
    }


    async searchDocuments(index: string, query: any, page: number = 1, size: number = 10): Promise<any> {
        console.log(query);
        const body= await this.client.search({
            index,
            from: (page - 1) * size,
            size,
            body: query,
        });

        return body;
    }

    async deleteDocument(index: string, id: string): Promise<any> {
        const body = await this.client.delete({
            index,
            id,
        });

        return body;
    }


}
