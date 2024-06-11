import { response } from "../../src/config/response.js";
import { status } from "../../src/config/response.status.js";
import { getOrderDetails, saveOrder, updateOrderStatus } from "../models/paypal.dao.js";
import { createOrder } from "../middleware/paypal.js";
import * as storeService from "../services/store.service.js";

const QUIZMY_BASE_URL = process.env.QUIZMY_BASE_URL;

// 체크아웃
export const paypalCheckout = async (req, res) => {
    try {
        const orderDto = req.body;
        const user_id = req.user_id;
        console.log("checkout");
        orderDto.application_context = {
            return_url: `${QUIZMY_BASE_URL}/paypal/checkout/success?user_id=${user_id}&points=${req.body.point}`,
            brand_name: 'Quizmy',
            landing_page: 'BILLING'
        };
        const orderResponse = await createOrder(orderDto);
        await saveOrder(orderResponse.id, user_id, orderResponse.status);
        console.log('orderResponse: ', orderResponse.links[1]);
        return res.send(response(status.SUCCESS, orderResponse.links[1]));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST));
    }
}


export const paypalCheckoutSuccess = async (req, res) => {
    try {
        const orderId = req.query.token;
        console.log("orderId: ", orderId);
        const user_id = req.query.user_id; // user_id가 query나 session에서 사용 가능하다고 가정
        let point = req.query.points; // points가 query parameter로 전송된다고 가정
        point = parseInt(point, 10); // point 값을 정수로 변환 // points가 query parameter로 전송된다고 가정
        console.log("id: ", user_id, "point: ", point);

        await updateOrderStatus(orderId, 'APPROVED');

        // 주문 상태를 확인
        const orderDetails = await getOrderDetails(orderId);
        console.log('orderDetails: ', orderDetails);
        if (orderDetails.order_status !== 'APPROVED') {
            return res.send(response(status.BAD_REQUEST, '결제가 승인되지 않았습니다.'));
        }

        // 사용자의 계정에 포인트 추가
        const addPointData = await storeService.addPoint(user_id, point);

        console.log("addPointData: ", addPointData);

        const successMessage = `${point} 포인트 결제가 완료되었습니다. Quizmy로 돌아가주세요.`;

        const htmlResponse = `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>결제 성공</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        padding: 50px;
                        background-color: #f4f4f4;
                        margin: 0;
                    }
                    .container {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        max-width: 90%;
                        margin: auto;
                    }
                    h1 {
                        color: #1294F2;
                        font-size: 2em;
                        margin-bottom: 20px;
                    }
                    p {
                        font-size: 1.2em;
                        color: #333;
                    }
                    img {
                        max-width: 100px; 
                        margin-top: 20px;
                    }
                    @media (max-width: 600px) {
                        body {
                            padding: 20px;
                        }
                        h1 {
                            font-size: 1.5em;
                        }
                        p {
                            font-size: 1em;
                        }
                        img {
                            max-width: 75px; 
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>결제 성공!</h1>
                    <p>${successMessage}</p>
                    <img src="https://private-user-images.githubusercontent.com/127286924/338135397-a7811650-df4a-49ba-be4e-913353b53c2b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTgwMTMzNjcsIm5iZiI6MTcxODAxMzA2NywicGF0aCI6Ii8xMjcyODY5MjQvMzM4MTM1Mzk3LWE3ODExNjUwLWRmNGEtNDliYS1iZTRlLTkxMzM1M2I1M2MyYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNjEwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDYxMFQwOTUxMDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hOWYwYzY4YmFjZTc4NWVkYWFlNmQzZTAxMWQ2N2Q1OWZjM2E3MTkzZGIwNzNhOWYwYjA5MDJhMGM3YTJhYzRmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.ZkbJyXnn7Z_YIxDsPizdLAcprBsxTGuUuGCEEpSxCj4" alt="서비스 로고">
                </div>
            </body>
            </html>
        `;


        // HTML 응답을 클라이언트에게 전송
        return res.send(htmlResponse);
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST, error));
    }
}

/*
export const paypalCheckoutSuccess = async (req, res) => {
    try {
        console.log('checkout/success');
        const orderId = req.query.token;
        console.log("orderId: ", orderId);
        await updateOrderStatus(orderId, 'APPROVED');
        return res.send(response(status.SUCCESS, '결제가 완료되었습니다. Quizmy로 돌아가주세요'));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST));
    }
}
*/
