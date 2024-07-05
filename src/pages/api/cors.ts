import Cors from "cors";

const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
    origin: '*',
});

const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if(result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default cors;
export {runMiddleware}