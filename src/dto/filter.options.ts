import {Between} from "typeorm";
import {ApiModelProperty} from "swagger-express-ts";

export class FilterOptions {
    @ApiModelProperty()
    limit?: number;

    @ApiModelProperty()
    skip?: number;

    @ApiModelProperty()
    order?: string;

    @ApiModelProperty()
    sort?: string;

    @ApiModelProperty()
    dateTo?: Date;

    @ApiModelProperty()
    dateFrom?: Date;

    constructor(data: any) {
        this.limit = data.limit;
        this.skip = data.skip;
        this.order = data.order;
        this.sort = data.sort;
    }

    public static async getOptions(data: Partial<FilterOptions>) {
        return Object.assign({},
             data.limit && {take: data.limit},
                    data.skip && {skip: data.skip},
                    data.dateTo && data.dateFrom && {where: {date: Between(data.dateFrom, data.dateTo)}},
                    data.order && data.sort && {order: {[data.order]: data.order}}
            )
    }
}