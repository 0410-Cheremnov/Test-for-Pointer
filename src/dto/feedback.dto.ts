import {Feedback} from "../model/feedback.model";
import {ApiModel} from "swagger-express-ts";

export class FeedbackDto {
    orderHash?:string;

    author?: string;

    answers?: object[];

    body?: string;

    icon?: string;

    products?: object[];

    rated?: Date;


    constructor(data: any){
        this.orderHash = data.orderHash;
        this.answers = data.answers;
        this.body = data.body;
        this.icon = data.icon;
        this.author = data.author;
        this.products = data.products;
        this.rated = data.rated;
    }

    async toEntity() {
        const entity = new Feedback();
        entity.id = this.orderHash;
        entity.date = this.rated;
        entity.order = this.products;
        entity.userName = this.author;
        entity.text = this.body;
        entity.answer = this.answers;

        return entity;
    }
}