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
        // res.status(200).json(orderResponse);
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

        // 시스템에서 주문 상태 업데이트
        // await updateOrderStatus(orderId, 'COMPLETED');

        // 사용자의 계정에 포인트 추가
        const addPointData = await storeService.addPoint(user_id, point);

        console.log("addPointData: ", addPointData);

        const successMessage = `${point} 포인트 결제가 완료되었습니다. Quizmy로 돌아가주세요`;

        // return res.send(response(status.SUCCESS, addPointData, '결제가 완료되었습니다. Quizmy로 돌아가주세요'));
        return res.send(response(status.SUCCESS, successMessage));
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
