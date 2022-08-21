import express from 'express';
import cors from 'cors';
import * as http from 'http';
import {DataSource} from "typeorm";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import { Feedback } from './feedback.model';
import axios from "axios";
import cheerio from "cheerio"; 
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 5000;



const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "88776655",
    database: "testing",
    entities: [
        Feedback
    ],
    synchronize: true
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })





app.use(express.json());
app.use(cors());
app.get('/parser', async (req: express.Request, res: express.Response) => {
    const feedbackRepo = AppDataSource.getRepository(Feedback)
    
    const parse = async () => {
    const getHTML = async (url:string) => {
        const { data } = await axios.get(url)
        const load = await cheerio.load(data)
        return load
    }

        const $ = await getHTML('https://www.delivery-club.ru/srv/KFC_msk/feedbacks');
        //for( let i = 0; i < 1; i++ ) {
        const selector = await getHTML('https://www.delivery-club.ru/srv/KFC_msk/feedbacks')
        return selector('.vendor-reviews-item__container').each(async (i, element) => {
            const text = selector(element).find('div.vendor-reviews-item__text').text();
            const userName = selector(element).find('div.vendor-reviews-item__username').text();
            const date = selector(element).find('div.vendor-reviews-item__date').text();
            const order = selector(element).find('div.vendor-reviews-item__order').text();
            const answer = selector(element).find('div.vendor-reviews-item__block vendor-reviews-item__block--answer.vendor-reviews-item__text').text();
            //console.log(userName , '|' , order, '|', text,'|', date);
            const feedback =  await feedbackRepo.create({ text, userName, order, date, answer});
            //console.log(await feedbackRepo.save(feedback));
            var xui = feedbackRepo.save(feedback)
            console.log(xui);
            
            return await feedbackRepo.save(feedback);
            //await feedbackRepo.save(feedback);
        })

};
    const result = await parse();
    //console.log(result);
    res.status(StatusCodes.OK).send(
        result
    )
});
server.listen(port,()=> {
    console.log("Server started")
}) 