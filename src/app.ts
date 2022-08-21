import express from 'express';
import cors from 'cors';
import * as http from 'http';
import {DataSource} from "typeorm";
import {StatusCodes} from "http-status-codes";
import { Feedback } from './model/feedback.model';
import axios from "axios";
import {FeedbackDto} from "./dto/feedback.dto";
import {FilterOptions} from "./dto/filter.options";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;

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
    synchronize: true,
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
    let limit = 2500;
    let offset = 0;
    let count = 1;

    while (true) {
        console.log("iteration #",count);
        const axiosResponse = await axios.get(`https://api.delivery-club.ru/api1.2/reviews?chainId=48274&limit=${limit}&offset=${offset}&cacheBreaker=1660307294`);
        const items = axiosResponse.data.reviews;
        for (const item of items) {
            const dto = new FeedbackDto(item);
            const feedback = await dto.toEntity();
            await feedbackRepo.save(feedback)
        }

        if(items.length < limit) {
            break;
        }
        limit+= 50;
        offset+= limit;
        count++;
    }
res.status(StatusCodes.OK).send(
    {message: 'All data is parsed!'}
)
})

app.get('/reviews', async (req: express.Request, res: express.Response) => {
    const condition = await FilterOptions.getOptions(req.query);
    const feedbackRepo = AppDataSource.getRepository(Feedback)
    const data = await feedbackRepo.find(condition);
    res.status(StatusCodes.OK).send(
        data
    )
})
server.listen(port,()=> {
    console.log("Server started")
})