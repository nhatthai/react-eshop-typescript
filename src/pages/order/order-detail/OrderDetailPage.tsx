import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { apiService } from '../../../utils/api';
import { IOrderDetail } from '@interfaces/IOrderDetail';
import { useParams } from "react-router-dom";
import "./styles.scss";

export function OrderDetailPage() {
  const [orderDetail, setOrderDetail] = useState<IOrderDetail>();

  // Get ID from URL
  const params = useParams();

  useEffect(() => {
    if (params != null && params.id !== undefined) {
      getOrder(params.id);
    }
  }, [params, params.id]);

  function getOrder(orderId: string) {
    const orderAPI = process.env.REACT_APP_ORDER_API + '/order/' + orderId;

    apiService.getAll(orderAPI)
      .then((data) => {
        console.log(data);
        setOrderDetail(data.data);
      })
      .catch((error) => {
        //setError(error);
      })
      .finally(() => {
        //setLoading(false);
      });
  }

  return (
    <div className="esh-orders_detail">
      <div className="container">
          <h1 className="mb-4 mt-5">Order List Detail</h1>
          <div className="u-background-brightest p-5">
              <article className="esh-orders_detail-titles row">
                <section className="col-3">Order number</section>
                <section className="col-3">Date</section>
                <section className="col-3">Total</section>
                <section className="col-3">Status</section>
              </article>

              <article className="esh-orders_detail-items row">
                <section className="col-3">{orderDetail?.orderNumber}</section>
                <section className="col-3">{orderDetail?.date.toDateString()}</section>
                <section className="col-3">$ {orderDetail?.total}</section>
                <section className="col-3">{orderDetail?.status}</section>
              </article>

              <h2 className="esh-orders_detail-title mt-5">Shipping address</h2>
              <div className="u-mb-5">{orderDetail?.street} {orderDetail?.city} {orderDetail?.country}</div>

              { orderDetail != null && orderDetail.orderItems.length > 0 && orderDetail.orderItems.map((item, index) => (
                <article key={index} className="esh-orders_detail-items divider divider--bottom d-flex align-items-center pb-3 mt-3 u-text-sm">
                  <div className="esh-orders_detail-thumbnail-container">
                      <div className="esh-orders_detail-thumbnail-wrapper">
                          <img className="esh-orders_detail-thumbnail" src="" alt="item"/>
                      </div>
                  </div>
                  <div className="row w-100 ml-3">
                      <div className="col-6">{item.productName}</div>
                      <div className="col-2">$ {item.unitPrice}</div>
                      <div className="col-2">{item.units}</div>
                      <div className="col-2 text-right">${(item.units * item.unitPrice)}</div>
                  </div>
                </article>
              ))}

              <div className="d-flex align-items-center justify-content-end mt-4 mb-4 text-uppercase u-text-xl">
                  <div>Total</div>
                  <div className="ml-3">${orderDetail?.total}</div>
              </div>

              <aside className="d-flex justify-content-end mt-5">
                  <Link className="btn btn-secondary" to="/orders">Back to list</Link>
              </aside>
          </div>
      </div>
    </div>
  );

}