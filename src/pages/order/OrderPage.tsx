import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./styles.scss";
import { apiService } from '../../utils/api';
import { IOrder } from '@interfaces/IOrder';

export function OrderPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    const orderAPI = process.env.REACT_APP_ORDER_API + '/order';

    apiService.getAll(orderAPI)
      .then((data) => {
        console.log(data);
        setOrders(data.data);
      })
      .catch((error) => {
        //setError(error);
      })
      .finally(() => {
        //setLoading(false);
      });
  }

  function cancelOrder(orderNumber: string) {
    console.log("Cancel order");
  }

  return (
    <>
      <div className="esh-orders">
        <div className="container">
          <h1 className="mb-4 mt-5">Order List</h1>
          {/* <div className="esh-orders-alert alert" role="alert" [hidden]="!errorReceived">
                Error requesting order list, please try later on
            </div> */}

          <div className="esh-orders-wrapper">
            <article className="esh-orders-titles row">
              <section className="col-1"></section>
              <section className="col-3">Date</section>
              <section className="col-2">Total</section>
              <section className="col-2">Status</section>
              <section className="col-2"></section>
              <section className="col-2"></section>
            </article>

            {orders.length > 0 && orders.map((order, index) => (
              <article key={index} className="esh-orders-item divider row">
                <section className="col-1">{order.orderNumber}</section>
                <section className="col-3">{order.date.toDateString()}</section>
                <section className="col-2">${order.total}</section>
                <section className="col-2">{order.status}</section>
                <section className="col-2">
                  {
                    order.status.toLowerCase() === "submitted" &&
                    <a onClick={() => cancelOrder(order.orderNumber)} className="esh-orders-link u-cursor-pointer">
                      Cancel
                    </a>
                  }
                </section>
                <section className="col-2">
                  <Link
                    className="esh-orders-link"
                    to="/orders/{order.orderNumber}"
                  >
                    Details
                  </Link>
                </section>
              </article>
            ))}
            <aside className="d-flex justify-content-end mt-5 pr-5">
              <Link className="btn btn-secondary" to="/catalog">
                Continue Shopping
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

