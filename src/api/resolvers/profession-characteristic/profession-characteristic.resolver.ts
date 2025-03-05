import ApiResolverUtil from "../../../utils/ApiResolver.ts";

export class ProfessionCharacteristicResolver {
    apiResolver = new ApiResolverUtil('professions');

    public async getProfessionStatistics(id: number) {
        const response = await this.apiResolver.request("getProfessionStatistics", "GET", {
            "id": id
        })
        return response.data;
    }

}